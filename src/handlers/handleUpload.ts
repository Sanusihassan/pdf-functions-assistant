import axios from "axios";
import { downloadConvertedFile } from "../downloadFile";
import type { errors as _ } from "../content";
import { type RefObject } from "react";
import { resetErrorMessage, setField } from "../store";
import type { Action, Dispatch } from "@reduxjs/toolkit/react";

/**
 * Complete implementation for handling the file upload response.
 * This implementation expects the server to sometimes respond with JSON (as an arraybuffer)
 * containing a "response" property, and in that case, it sets the mdResponse state variable.
 * Otherwise, it assumes the response is binary (a file) and triggers a download.
 */
export const handleUpload = async (
  e: React.FormEvent<HTMLFormElement>,
  downloadBtn: RefObject<HTMLAnchorElement>,
  dispatch: Dispatch<Action>,
  state: {
    path: string;
    errorMessage: string;
    prompt: string;
    isScanned: boolean;
    pageCount: number;
    strategy: "script" | "content" | "generate"
  },
  files: File[],
  errors: _,
  filesOnSubmit: string[],
  setFilesOnSubmit: (value: string[]) => void
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));

  if (!files || files.length === 0) return;
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
  formData.append("strategy", String(state.strategy));

  let url: string;
  if (process.env.NODE_ENV === "development") {
    url = `https://www.pdfequips.com/api/pdf-assistant`;
  } else {
    url = `/api/${state.path}`;
  }

  if (state.errorMessage) {
    return;
  }

  // Derive the original file name (without extension) for later naming.
  const originalFileName = files[0]?.name?.split(".").slice(0, -1).join(".");

  // Lookup table for mime types and corresponding file names.
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
    "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
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
    // Request the API. Using responseType "arraybuffer" to handle both binary and JSON responses.
    const response = await axios.post(url, formData, {
      responseType: "arraybuffer",
    });

    // Get the content-type from headers.
    const contentType = response.headers["content-type"] || "";

    // Decode the response data from the arraybuffer.
    const decodedText = new TextDecoder("utf-8").decode(response.data);

    // If the content type indicates JSON or if we can parse the decoded text as JSON,
    // then try to parse it and check for a "response" property.
    if (contentType.includes("application/json")) {
      try {
        const parsed = JSON.parse(decodedText);
        if (parsed && parsed.response) {
          dispatch(
            setField({ mdResponse: parsed.response, showDownloadBtn: true })
          );
          return;
        }
      } catch (error) {
        // If JSON parsing fails, continue to file handling.
        console.error("JSON parsing error:", error);
      }
    }

    // If we did not return due to JSON, assume the response is a file.
    const mimeType = contentType;
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
    setFilesOnSubmit(files.map((f) => f.name));

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
