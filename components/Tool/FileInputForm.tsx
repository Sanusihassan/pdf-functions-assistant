import React, { useEffect, useRef, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
// store
import { setField, type ToolState } from "../../src/store";
import { handleUpload } from "../../src/handlers/handleUpload";
import { handleChange } from "../../src/handlers/handleChange";
import { useFileStore } from "../../src/file-store";
// types
import type { tools } from "../../src/content";
type AcceptedFileTypes = {
  [key in ".pdf" | ".pptx" | ".docx" | ".xlsx" | ".jpg" | ".html"]: string;
};
interface FileInputFormProps {
  data: {
    type: string;
    to: string;
  };
  errors: any;
  lang: string;
  tools: tools;
  placeholders: string[]
}
export const FileInputForm: React.FC<FileInputFormProps> = ({
  data,
  errors,
  lang,
  tools,
  placeholders
}) => {
  const path = "assistant";
  const errorMessage = useSelector(
    (state: { tool: ToolState }) => state.tool.errorMessage
  );
  const prompt = useSelector(
    (state: { tool: ToolState }) => state.tool.prompt
  );
  const isScanned = useSelector(
    (state: { tool: ToolState }) => state.tool.isScanned
  );
  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );
  const strategy = useSelector(
    (state: { tool: ToolState }) => state.tool.strategy
  );
  const selectedLanguages = useSelector(
    (state: { tool: ToolState }) => state.tool.selectedLanguages
  );
  const advancedSearch = useSelector(
    (state: { tool: ToolState }) => state.tool.advancedSearch
  );
  const dispatch = useDispatch();
  // file store
  const {
    files,
    setFiles,
    setFileInput,
    setDownloadBtn,
    setSubmitBtn,
    filesOnSubmit,
    setFilesOnSubmit,
  } = useFileStore();
  // refs
  const fileInput = useRef<HTMLInputElement>(null);
  const submitBtn = useRef<HTMLButtonElement>(null);
  const downloadBtn = useRef<HTMLAnchorElement>(null);

  // State for current placeholder index
  const [currentPlaceholderIndex, setCurrentPlaceholderIndex] = useState<number>(0);

  useEffect(() => {
    // @ts-ignore
    setFileInput(fileInput);
    // @ts-ignore
    setSubmitBtn(submitBtn);
    // @ts-ignore
    setDownloadBtn(downloadBtn);
  }, []);

  // Effect for rotating through placeholders
  useEffect(() => {
    if (!placeholders || placeholders.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentPlaceholderIndex(prevIndex =>
        prevIndex === placeholders.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [placeholders]);

  return (
    <form
      onClick={(e) => {
        e.stopPropagation();
      }}
      onSubmit={(e) =>
        handleUpload(
          e,
          downloadBtn,
          dispatch,
          {
            path,
            errorMessage,
            prompt,
            isScanned,
            pageCount,
            strategy,
            selectedLanguages,
            advancedSearch
          },
          files,
          errors,
          filesOnSubmit,
          setFilesOnSubmit
        )
      }
      method="POST"
      encType="multipart/form-data"
      className="position-relative"
    >
      <div
        className={`upload-btn btn btn-lg text-white position-relative overflow-hidden ${path}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        role="button"
      >
        {lang == "ar" ? (
          <bdi>
            {tools.select} {tools.files}
            <span className="text-uppercase">
              {data.type.replace(".", "")}
            </span>{" "}
          </bdi>
        ) : (
          <bdi>
            {tools.select}{" "}
            <span className="text-uppercase">{data.type.replace(".", "")}</span>{" "}
            {tools.files}
          </bdi>
        )}
        <input
          type="file"
          name="files"
          accept=".pdf, .csv, .txt, .md, .json"
          // multiple={path !== "split-pdf" && path !== "pdf-to-pdf-a"}
          ref={fileInput}
          className="position-absolute file-input"
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            handleChange(e, dispatch, setFiles, errors, files, {
              path,
            });
          }}
        />
      </div>
      <a
        href=""
        className="d-none"
        ref={downloadBtn}
        download="__output.pdf"
      ></a>
      {/* <div className="my-4">
          </div> */}
      <button type="submit" ref={submitBtn} className="d-none">
        submit
      </button>
      <textarea
        placeholder={placeholders[currentPlaceholderIndex]}
        className="styled-textarea mt-3"
        onChange={(e) =>
          dispatch(setField({ prompt: e.target.value }))
        }
        onPaste={(e) => {
          e.stopPropagation();
        }}
      ></textarea>
      <button
        type="button"  // Add this to prevent form submission
        className="up-arrow-button"
        aria-label="submit"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation(); // Also add this for extra safety
          const textFile = new File([prompt], "prompt.txt", {
            type: "text/plain"
          });
          setFiles([textFile]);
          dispatch(setField({
            showTool: false
          }));
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </form>
  );
};