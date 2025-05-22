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
import { HTMLViewer } from "./HTMLViewer";

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
  const quillCompatibleHTML = `


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sanusi Hassan - Resume</title>
  <style>
    .container {
      max-width: 800px;
      margin: auto;
      background: #fff;
      padding: 2rem;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1, h2 {
      color: #0073aa;
      border-bottom: 2px solid #eee;
      padding-bottom: 0.25rem;
    }
    .section {
      margin-bottom: 2rem;
    }
    .contact, .links {
      text-align: center;
      font-size: 0.9rem;
    }
    ul {
      padding-left: 1.25rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="contact">
      <p>8EME Arrondissement, N'Djamena, Tchad | +23593064452 | sanusihassan122@gmail.com</p>
    </div>
    <div class="links">
      <p>GitHub: github.com/Sanusihassan | LinkedIn: linkedin.com/in/sanusi-hassan-umar-343a6011a/</p>
    </div>

    <div class="section">
      <h1>Professional Summary</h1>
      <p>
        Full-stack web developer with 5+ years of experience building responsive, high-performance web applications.
        Proficient in JavaScript, React, TypeScript, Node.js, and DevOps practices. Proven track record in delivering
        end-to-end solutions and improving system efficiency by up to 80%. Adept at both independent and collaborative work.
      </p>
    </div>

    <div class="section">
      <h2>Experience</h2>
      <p><strong>Upwork — Front-End Developer</strong><br>Oct 2022</p>
      <ul>
        <li>Delivered client web projects with 5.00 rating.</li>
        <li>Implemented responsive UIs and enhanced functionality for performance improvements.</li>
      </ul>
    </div>

    <div class="section">
      <h2>Projects</h2>
      <ul>
        <li><strong>PDFEquips:</strong> Built entire PDF utility platform from scratch (pdfequips.com)</li>
        <li><strong>Portfolio Website:</strong> Personal showcase of skills and work (my-portfolio-sage-pi.vercel.app)</li>
        <li><strong>ICVR:</strong> Reduced bugs by 75% and execution time by 80%</li>
        <li><strong>PreQuran:</strong> Implemented UI overhaul and API integration</li>
        <li><strong>Darbi Admin Panel:</strong> Upgraded UI, responsiveness, and localization</li>
        <li><strong>Custom Bootstrap:</strong> Utility-first CSS framework for Bootstrap</li>
        <li><strong>PHP Prettifier Extension:</strong> Browser extension for formatting PHP error messages</li>
      </ul>
    </div>

    <div class="section">
      <h2>Skills</h2>
      <p><strong>Languages:</strong> JavaScript, Python, PHP, SQL, TypeScript</p>
      <p><strong>Frameworks:</strong> React, Node.js, Express, Django, Flask, Laravel, NestJS, Vue.js</p>
      <p><strong>Tools:</strong> Git, npm, Vite, Gulp, Bootstrap, Tailwind, Materialize, Jest, GraphQL, Apollo</p>
      <p><strong>Databases:</strong> MongoDB, MySQL</p>
      <p><strong>Other:</strong> HTML, CSS, SASS, jQuery, Pug, Astro, HTTP</p>
    </div>

    <div class="section">
      <h2>Languages</h2>
      <p>English (Advanced), Arabic (Native)</p>
    </div>
  </div>
</body>
</html>
  `
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
        <HTMLViewer content={quillCompatibleHTML} chatAreaTooltipContent={downloadFile.chatAreaTooltipContent} />
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