import React, { useCallback, useEffect } from "react";
import * as dropzone from "react-dropzone";
import EditPage from "./EditPage";
import ErrorElement from "./ErrorElement";
import { useSelector, useDispatch } from "react-redux";
import { FileInputForm } from "./Tool/FileInputForm";
import DownloadFile from "./DownloadFile";
import { useFileStore } from "../src/file-store";
import { setField } from "../src/store";
import type { edit_page } from "../src/content";

export type errorType = {
  response: {
    data: {
      error: string;
      text: () => Promise<string>;
    };
  };
};

export type ToolData = {
  title: string;
  description: string;
  color: string;
  type: string;
  to: string;
};

export type ToolProps = {
  data: ToolData;
  tools: any;
  lang: string;
  errors: any;
  edit_page: edit_page;
  pages: string;
  page: string;
  downloadFile: any;
};

const Tool: React.FC<ToolProps> = ({
  data,
  tools,
  lang,
  errors,
  edit_page,
  pages,
  page,
  downloadFile,
}) => {
  const path = "assistant";
  const stateShowTool = useSelector((state: { tool: any }) => state.tool.showTool);
  const errorMessage = useSelector((state: { tool: any }) => state.tool.errorMessage);
  const { setFiles } = useFileStore();
  const dispatch = useDispatch();

  const handleHideTool = () => {
    dispatch(setField({ showTool: false }));
  };

  useEffect(() => {
    dispatch(setField({ showDownloadBtn: false }));
  }, [stateShowTool]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    handleHideTool();
  }, []);

  const handlePaste = useCallback((event: React.ClipboardEvent<HTMLDivElement>) => {
    const items = event.clipboardData?.items;
    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file") {
          const blob = item.getAsFile();
          if (blob) {
            setFiles([blob]);
            handleHideTool();
            return;
          }
        } else if (item.kind === "string") {
          item.getAsString((text) => {
            // Create a new File object from the pasted text
            const textFile = new File([text], "pasted-text.txt", {
              type: "text/plain"
            });
            setFiles([textFile]);
            handleHideTool();
          });
          return;
        }
      }
    }
  }, []);

  const { getRootProps, isDragActive } = dropzone.useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/csv': ['.csv'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
      'application/json': ['.json']
    }
  });

  const { content, generate, script } = edit_page.options.placeholders;

  return (
    <>
      <div
        className="tools-page container-fluid position-relative"
        {...(stateShowTool && { ...getRootProps(), onPaste: handlePaste })}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        {isDragActive && (
          <div className="overlay display-4">{tools.drop_files}</div>
        )}
        <div
          className={`text-center${!(stateShowTool && errorMessage?.length > 0) ? "" : " d-flex"
            } flex-column tools ${stateShowTool ? "" : "d-none"}`}
        >
          <h1 className="display-3">
            {data.title}
          </h1>
          <p className="lead">
            {data.description}
          </p>
          <FileInputForm
            lang={lang}
            data={data}
            errors={errors}
            tools={tools}
            placeholders={[edit_page.options.select_placeholder, content, generate, script]}
          />
          <p>{tools.or_drop}</p>
          <ErrorElement />
        </div>
        <EditPage
          edit_page={edit_page}
          pages={pages}
          page={page}
          lang={lang}
          errors={errors}
          path={path}
        />
        <DownloadFile lang={lang} downloadFile={downloadFile} path={path} errors={errors} />
      </div>
    </>
  );
};

export { Tool };