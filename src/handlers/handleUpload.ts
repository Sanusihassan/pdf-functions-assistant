import axios from "axios";
import { downloadConvertedFile } from "../downloadFile";
import type { errors as _ } from "../content";
import { type RefObject } from "react";
import { resetErrorMessage, setField } from "../store";
import type { Action, Dispatch } from "@reduxjs/toolkit/react";
import io from "socket.io-client";

// Global socket reference to maintain connection across components
let globalSocket: any = null;

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
    strategy: "script" | "content" | "generate",
    selectedLanguages: string[];
    advancedSearch
  },
  files: File[],
  errors: _,
  filesOnSubmit: string[],
  setFilesOnSubmit: (value: string[]) => void
) => {
  e.preventDefault();
  dispatch(setField({ isSubmitted: true }));

  if (!files || files.length === 0) return;

  // If strategy is "generate", handle WebSocket connection and file upload
  if (state.strategy === "generate") {
    try {
      // Initialize WebSocket connection if not already connected
      if (!globalSocket || !globalSocket.connected) {
        const socketUrl = process.env.NODE_ENV === "development"
          ? "https://www.pdfequips.com"
          : `https://${window.location.host}`;

        globalSocket = io(socketUrl, {
          path: '/api/conversation'
        });

        // Wait for connection to be established
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(() => {
            reject(new Error("WebSocket connection timeout"));
          }, 10000); // 10 second timeout

          globalSocket.on("connect", () => {
            console.log("WebSocket connected for file upload");
            clearTimeout(timeout);
            resolve(true);
          });

          globalSocket.on("connect_error", (error: any) => {
            console.error("WebSocket connection error:", error);
            clearTimeout(timeout);
            reject(error);
          });
        });
      }

      // Prepare file data for WebSocket transmission
      const fileData = await Promise.all(
        files.map(async (file) => {
          const arrayBuffer = await file.arrayBuffer();
          const base64Data = btoa(
            new Uint8Array(arrayBuffer).reduce(
              (data, byte) => data + String.fromCharCode(byte),
              ''
            )
          );

          return {
            name: file.name,
            type: file.type,
            size: file.size,
            data: base64Data
          };
        })
      );

      // Send file upload event through WebSocket
      globalSocket.emit("file-upload", {
        files: fileData,
        prompt: state.prompt,
        isScanned: state.isScanned,
        pageCount: state.pageCount,
        strategy: state.strategy,
        selectedLanguages: state.selectedLanguages,
        advancedSearch: state.advancedSearch,
        path: state.path
      });

      // Set up one-time listeners for upload response
      globalSocket.once("file-upload-success", (response: any) => {
        console.log("File upload successful:", response);
        dispatch(setField({
          showChatTextArea: true,
          isSubmitted: false
        }));
        setFilesOnSubmit(files.map((f) => f.name));

        // If there's an initial response, handle it
        if (response.initialResponse) {
          dispatch(setField({
            mdResponse: response.initialResponse,
            showDownloadBtn: true
          }));
        }
      });

      globalSocket.once("file-upload-error", (error: any) => {
        console.error("File upload error:", error);
        dispatch(setField({
          errorMessage: error.message || "File upload failed",
          isSubmitted: false
        }));
      });

      // Store socket reference globally for ChatTextArea to use
      (window as any).globalChatSocket = globalSocket;

      return; // Exit early for generate strategy

    } catch (error) {
      console.error("WebSocket initialization error:", error);
      dispatch(setField({
        errorMessage: errors.ERR_NETWORK.message,
        isSubmitted: false
      }));
      return;
    }
  }

  // Original upload logic for non-generate strategies
  const formData = new FormData();
  for (let i = 0; i < files.length; i++) {
    formData.append("files", files[i]);
  }
  formData.append("prompt", state.prompt);
  formData.append("isScanned", String(state.isScanned));
  formData.append("pageCount", String(state.pageCount));
  formData.append("strategy", String(state.strategy));
  formData.append("selectedLanguages", JSON.stringify(state.selectedLanguages));

  let url: string;
  if (process.env.NODE_ENV === "development") {
    url = `https://www.pdfequips.com/api/assistant`;
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
        if (parsed && parsed.response && parsed.responseType === "md") {
          dispatch(
            setField({ mdResponse: parsed.response, showDownloadBtn: true })
          );
          return;
        } else if (parsed && parsed.responseType === "html") {
          dispatch(
            setField({ htmlResponse: parsed.response, showDownloadBtn: true })
          );
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

// Utility function to get the global socket for ChatTextArea
export const getGlobalSocket = () => {
  return globalSocket || (window as any).globalChatSocket;
};

// Utility function to cleanup socket connection
export const cleanupSocket = () => {
  if (globalSocket) {
    globalSocket.disconnect();
    globalSocket = null;
  }
  if ((window as any).globalChatSocket) {
    (window as any).globalChatSocket.disconnect();
    (window as any).globalChatSocket = null;
  }
};