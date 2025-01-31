import axios from "axios";
import { downloadConvertedFile } from "../downloadFile";
import type { errors as _ } from "../content";
import { type RefObject } from "react";
import {
  resetErrorMessage,
  setField
} from "../store";
import type { Action, Dispatch } from "@reduxjs/toolkit/react";

export const handleUpload = async (
  e: React.FormEvent<HTMLFormElement>,
  downloadBtn: RefObject<HTMLAnchorElement>,
  dispatch: Dispatch<Action>,
  state: {
    path: string;
    errorMessage: string;
    prompt: string;
    isScanned: boolean;
    pageCount: number
  },
  files: File[],
  errors: _,
  filesOnSubmit: string[],
  setFilesOnSubmit: (value: string[]) => void
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));

  if (!files) return;
  // Extract file names from the File[] array
  const fileNames = files.map((file) => file.name);

  // Check if every file name in files is present in filesOnSubmit
  const allFilesPresent = fileNames.every((fileName) =>
    filesOnSubmit.includes(fileName)
  );

  if (allFilesPresent && files.length === filesOnSubmit.length) {
    dispatch(setField({ showDownloadBtn: true }));
    dispatch(resetErrorMessage());
    return;
  }

  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  formData.append("prompt", state.prompt);
  formData.append("isScanned", String(state.isScanned));
  formData.append("pageCount", String(state.pageCount));
  let url: string;
  // @ts-ignore
  if (process.env.NODE_ENV === "development") {
    url = `https://www.pdfequips.com/api/pdf-assistant`;
    // url = `https://5000-planetcreat-pdfequipsap-te4zoi6qkr3.ws-eu102.gitpod.io/${state.path}`;
  } else {
    url = `/api/${state.path}`;
  }
  if (state.errorMessage) {
    return;
  }
  // formData.append("compress_amount", String(state.compressPdf));
  const originalFileName = files[0]?.name?.split(".").slice(0, -1).join(".");

  const mimeTypeLookupTable: {
    [key: string]: { outputFileMimeType: string; outputFileName: string };
  } = {
    "application/zip": {
      outputFileMimeType: "application/zip",
      outputFileName: `PDFEquips-${state.path}.zip`,
    },
    "application/pdf": {
      outputFileMimeType: "application/pdf",
      outputFileName: `${originalFileName}.pdf`,
    },
    "application/msword": {
      outputFileMimeType: "application/msword",
      outputFileName: `${originalFileName}.docx`,
    },
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
      outputFileMimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      outputFileName: `${originalFileName}.docx`,
    },
    "application/vnd.ms-excel": {
      outputFileMimeType: "application/vnd.ms-excel",
      outputFileName: `${originalFileName}.xlsx`,
    },
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
      outputFileMimeType:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      outputFileName: `${originalFileName}.xlsx`,
    },
    "application/vnd.ms-powerpoint": {
      outputFileMimeType: "application/vnd.ms-powerpoint",
      outputFileName: `${originalFileName}.pptx`,
    },
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    {
      outputFileMimeType:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      outputFileName: `${originalFileName}.pptx`,
    },
    "text/plain": {
      outputFileMimeType: "text/plain",
      outputFileName: `${originalFileName}.txt`,
    },
  };

  try {
    const response = await axios.post(url, formData, {
      responseType: "arraybuffer",
    });
    // Check if response is Markdown
    const textResponse = response.data?.response;
    if (textResponse) {
      dispatch(setField({ mdResponse: textResponse, showDownloadBtn: true }));
      return;
    }
    // const originalFileName = files[0]?.name?.split(".").slice(0, -1).join(".");
    const mimeType = response.data.type || response.headers["content-type"];
    const mimeTypeData = mimeTypeLookupTable[mimeType] || {
      outputFileMimeType: mimeType,
      outputFileName: "",
    };
    const { outputFileMimeType, outputFileName } = mimeTypeData;

    dispatch(setField({ showDownloadBtn: true }));
    downloadConvertedFile(
      response,
      outputFileMimeType,
      outputFileName,
      downloadBtn
    );
    setFilesOnSubmit(files.map(f => f.name));

    if (response.status !== 200) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      dispatch(resetErrorMessage());
      dispatch(setField({ isSubmitted: false }));
    }
  } catch (error) {
    if ((error as { code: string }).code === "ERR_NETWORK") {
      dispatch(setField({ errorMessage: errors.ERR_NETWORK.message }));
      return;
    }
    dispatch(setField({ isSubmitted: false }));
  } finally {
    dispatch(setField({ isSubmitted: false }));
  }
};
