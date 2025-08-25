import type { errors as _ } from "../../src/content";
import { useEffect, useState } from "react";
import { Loader } from "./Loader";
import {
  analyzePDF,
  calculatePages,
  getNthPageAsImage,
} from "../../src/utils";
import { useDispatch } from "react-redux";
import type { ActionProps } from "./ActionDiv";
import { Pages } from "./Pages";
import { setField } from "../../src/store";

type OmitFileName<T extends ActionProps> = Omit<T, "fileName" | "index">;

type CardProps = OmitFileName<ActionProps> & {
  file: File;
  errors: _;
  loader_text: string;
  fileDetailProps: [string, string, string];
  index?: number | string;
};

export type imageUrlsType = {
  url: string;
  id: number;
}[];

const FileCard = ({
  file,
  errors,
  loader_text,
}: CardProps) => {
  const [imageUrls, setImageUrls] = useState<imageUrlsType>([]);
  const [pageCount, setPageCount] = useState(0);
  const dispatch = useDispatch();
  const extension = "." + file.name.split(".")[1] || ".pdf";

  let isSubscribed = true;

  // List of supported extensions for icon rendering
  const SUPPORTED_EXTENSIONS = ['.csv', '.txt', '.md', '.json', '.pdf'];

  const ICON_LOOKUP: Record<string, string> = {
    ".csv": "csv.png",
    ".txt": "prompt.png",
    ".md": "file-markdown.png",
    ".json": "json.png",
  };

  const processFile = async () => {
    try {
      if (extension === ".pdf") {
        if (isSubscribed) {
          const urls: imageUrlsType = [];
          for (let i = 1; i <= pageCount; i += 1) {
            let url = await getNthPageAsImage(file, dispatch, errors, i);
            urls.push({ url, id: i });
          }
          setImageUrls(urls);
        }
        const result = await analyzePDF(file);
        dispatch(setField({ isScanned: result.scanned }))
      } else if (SUPPORTED_EXTENSIONS.includes(extension)) {
        if (isSubscribed) {
          setImageUrls(
            !file.size
              ? [{ url: "/images/corrupted.png", id: 1 }]
              : [{ url: `${process.env.NODE_ENV === "development" ? "https://www.pdfequips.com" : ""}/images/${ICON_LOOKUP[extension]}`, id: 1 }]
          );
        }
      }
    } catch (error) {
      console.error("Error processing files:", error);
      if (isSubscribed) {
        setImageUrls([{ url: "/images/corrupted.png", id: 1 }]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (extension === ".pdf") {
        let _pageCount = await calculatePages(file);
        dispatch(setField({ pageCount: _pageCount }))
        setPageCount(_pageCount <= 16 ? _pageCount : 16);
      }
    })();
    processFile();
    return () => {
      isSubscribed = false;
    };
  }, [extension, file, pageCount]);

  return (
    <>
      {imageUrls.length == 0 ? (
        <div className="initial-loader">
          <Loader loader_text={loader_text} />
        </div>
      ) : null}
      <Pages
        imageUrls={imageUrls}
        loader_text={loader_text}
      />
    </>
  );
};

export default FileCard;