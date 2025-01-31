import { useSelector } from "react-redux";
import { setField, type ToolState } from "../src/store";
import { DownloadIcon, ArrowLeftIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import type { downloadFile } from "../src/content";
import { useEffect } from "react";
import { useFileStore } from "../src/file-store";
import MarkdownViewer from "./MarkdownViewer";

const DownloadFile = ({
  lang,
  downloadFile,
  path,
}: {
  lang: string;
  downloadFile: downloadFile;
  path: string;
}) => {
  const { files, downloadBtn } = useFileStore();
  const dispatch = useDispatch();
  const showDownloadBtn = useSelector(
    (state: { tool: ToolState }) => state.tool.showDownloadBtn
  );
  const mdResponse = useSelector(
    (state: { tool: ToolState }) => state.tool.mdResponse
  );

  useEffect(() => { }, [downloadFile, showDownloadBtn]);

  if (mdResponse) {
    return (
      <div className={`download-page flex-column align-items-center justify-content-center${showDownloadBtn ? " d-flex" : " d-none"}`}>
        <div className="d-flex align-items-center justify-content-between w-100">
          <button
            className={`btn btn-dark rounded-circle mr-2 back-btn align-items-center`}
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
        <MarkdownViewer content={mdResponse} />
      </div>
    );
  }

  return (
    <div
      className={`download-page flex-column align-items-center justify-content-center text-center${showDownloadBtn ? " d-flex" : " d-none"
        }`}
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
            dispatch(setField({ showDownloadBtn: false }));
          }}
        >
          <ArrowLeftIcon className="icon" />
          <Tooltip id="download-btn-tooltip" />
        </button>
        <button
          className={`download-btn btn btn-lg text-white position-relative overflow-hidden ${path}`}
          onClick={() => {
            if (downloadBtn?.current) {
              downloadBtn.current.click();
            }
          }}
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