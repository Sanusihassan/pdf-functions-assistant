import { useSelector } from "react-redux";
import { setField, type ToolState } from "../src/store";
import { DownloadIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import type { downloadFile, errors } from "../src/content";
import { useEffect } from "react";
import { useFileStore } from "../src/file-store";
import MarkdownViewer from "./MarkdownViewer";
import { HTMLViewer } from "./HTMLViewer";

const DownloadFile = ({
  lang,
  downloadFile,
  path,
  errors
}: {
  lang: string;
  downloadFile: downloadFile;
  path: string;
  errors: errors
}) => {
  const { files, downloadBtn } = useFileStore();
  const dispatch = useDispatch();
  const showDownloadBtn = useSelector(
    (state: { tool: ToolState }) => state.tool.showDownloadBtn
  );

  const mdResponse = useSelector(
    (state: { tool: ToolState }) => state.tool.mdResponse
  );

  const htmlResponse = useSelector(
    (state: { tool: ToolState }) => state.tool.htmlResponse
  );

  const subscriptionAndStatus = useSelector(
    (state: { tool: ToolState }) => state.tool.subscriptionAndStatus
  );

  const pageCount = useSelector(
    (state: { tool: ToolState }) => state.tool.pageCount
  );

  useEffect(() => {
    // No need to track usage on initial mount, only when download happens
  }, [downloadFile, showDownloadBtn]);

  const handleDownload = () => {
    if (!subscriptionAndStatus?.subscription) {
      // No subscription data available
      return;
    }


    // Trigger the download if usage is allowed
    if (downloadBtn?.current) {
      downloadBtn.current.click();
    }
  };


  if (mdResponse || htmlResponse) {
    return (
      <div className={`download-page flex-column justify-content-center${showDownloadBtn ? " d-flex" : " d-none"}`}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <div className={`container${mdResponse ? "" : " d-none"}`}>
            <button
              className={`back-btn`}
              style={lang === "ar" ? { order: 1 } : {}}
              data-tooltip-content={
                downloadFile.backto[path as keyof typeof downloadFile.backto]
              }
              data-tooltip-id="download-btn-tooltip"
              data-tooltip-place="left"
              onClick={() => {
                dispatch(setField({ showDownloadBtn: false }));
              }}
            >
              <ArrowLeftIcon className="icon" />
              <Tooltip id="download-btn-tooltip" />
            </button>
          </div>
        </div>
        {mdResponse ? <MarkdownViewer content={mdResponse} /> : <HTMLViewer content={htmlResponse} textContent={downloadFile.htmlViewerContent} />}
      </div>
    );
  }

  return (
    <div
      className={`download-page flex-column align-items-center justify-content-center text-center${showDownloadBtn ? " d-flex" : " d-none"}`}
    >
      <h3 className="text-center mb-4">
        <bdi>
          {downloadFile.titles &&
            downloadFile.titles[path as keyof typeof downloadFile.titles] &&
            downloadFile.titles[path as keyof typeof downloadFile.titles][
            files && files.length > 1 ? 0 : 1
            ]}
        </bdi>
      </h3>
      <div className="d-flex align-items-center justify-content-between rounded-circle">
        <button
          className={`btn btn-dark rounded-circle mr-2 back-btn align-items-center`}
          style={lang == "ar" ? { order: 1 } : {}}
          data-tooltip-content={
            downloadFile.backto[path as keyof typeof downloadFile.backto]
          }
          data-tooltip-id="download-btn-tooltip"
          data-tooltip-place="left"
          onClick={() => {
            dispatch(setField({ showDownloadBtn: false, mdResponse: "" }));
          }}
        >
          <ArrowLeftIcon className="icon" />
          <Tooltip id="download-btn-tooltip" />
        </button>
        <button
          className={`download-btn btn btn-lg text-white position-relative overflow-hidden ${path}`}
          onClick={handleDownload}
        >
          <DownloadIcon className="icon text-white mr-2" />
          <bdi>
            {downloadFile.btnText &&
              downloadFile.btnText[path as keyof typeof downloadFile.btnText] &&
              downloadFile.btnText[path as keyof typeof downloadFile.btnText][
              files && files.length > 1 ? 0 : 1
              ]}
          </bdi>
        </button>
      </div>
    </div>
  );
};

export default DownloadFile;