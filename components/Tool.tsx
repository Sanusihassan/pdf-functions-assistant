import React, { useCallback, useEffect } from "react";
import * as dropzone from "react-dropzone";
import EditPage from "./EditPage";
import ErrorElement from "./ErrorElement";
import { useSelector, useDispatch } from "react-redux";
import { FileInputForm } from "./Tool/FileInputForm";
import DownloadFile from "./DownloadFile";
import { useFileStore } from "../src/file-store";
import { setField } from "../src/store";
import type { downloadFile, edit_page } from "../src/content";
import type { WithContext, HowTo as HowToType } from "schema-dts";
import { Features } from "./Features";
import HowTo from "./HowTo";
import { Footer } from "pdfequips-footer/components/Footer.tsx";
// import { HTMLViewer } from "./HTMLViewer";

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
  downloadFile: downloadFile;
  howTo: WithContext<HowToType>;
  seoTitle: string;
  features: {
    title: string;
    description: string;
  }[];
  to: string;
};

// const table = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Product Comparison Table</title>
//   <style>
//     body {
//       font-family: Arial, sans-serif;
//       margin: 20px;
//     }

//     table {
//       width: 100%;
//       border-collapse: collapse;
//       margin-bottom: 20px;
//     }

//     thead {
//       background-color: #f8f9fa;
//     }

//     th, td {
//       border: 1px solid #dee2e6;
//       padding: 12px;
//       text-align: left;
//     }

//     th[scope="col"] {
//       background-color: #e9ecef;
//       text-align: center;
//     }

//     tr:nth-child(even) {
//       background-color: #f1f3f5;
//     }

//     @media (max-width: 600px) {
//       table, thead, tbody, th, td, tr {
//         display: block;
//       }

//       th {
//         background-color: #dee2e6;
//         text-align: left;
//       }

//       td {
//         border: none;
//         position: relative;
//         padding-left: 50%;
//       }

//       td::before {
//         position: absolute;
//         top: 12px;
//         left: 12px;
//         width: 45%;
//         white-space: nowrap;
//         font-weight: bold;
//         content: attr(data-label);
//       }
//     }
//   </style>
// </head>
// <body>

// <h2>Product Comparison</h2>

// <table>
//   <thead>
//     <tr>
//       <th scope="col">Feature</th>
//       <th scope="col">Basic</th>
//       <th scope="col">Pro</th>
//       <th scope="col">Enterprise</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td data-label="Feature">Price</td>
//       <td data-label="Basic">$10/month</td>
//       <td data-label="Pro">$25/month</td>
//       <td data-label="Enterprise">Contact Us</td>
//     </tr>
//     <tr>
//       <td data-label="Feature">Storage</td>
//       <td data-label="Basic">10 GB</td>
//       <td data-label="Pro">100 GB</td>
//       <td data-label="Enterprise">Unlimited</td>
//     </tr>
//     <tr>
//       <td data-label="Feature">Support</td>
//       <td data-label="Basic">Email</td>
//       <td data-label="Pro">Email & Chat</td>
//       <td data-label="Enterprise">24/7 Phone Support</td>
//     </tr>
//   </tbody>
// </table>

// </body>
// </html>
// `

const Tool: React.FC<ToolProps> = ({
  data,
  tools,
  lang,
  errors,
  edit_page,
  pages,
  page,
  downloadFile,
  howTo,
  seoTitle,
  features,
  to
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
        {/* <HTMLViewer content={table} textContent={downloadFile.htmlViewerContent} /> */}
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
      <div className={`container${stateShowTool ? "" : " d-none"}`}>
        <HowTo howTo={howTo} alt={seoTitle} imgSrc={to.replace("/", "")} />
      </div>
      <div className={`container${stateShowTool ? "" : " d-none"}`}>
        <Features
          features={features as { title: string; description: string }[]}
        />
      </div>
      <div className={`${stateShowTool ? "" : "d-none"}`}>
        <Footer
          title={seoTitle.split("-")[0]}
          lang={lang === "en" ? "" : lang}
        />
      </div>
    </>
  );
};

export { Tool };