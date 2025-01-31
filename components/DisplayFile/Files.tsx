import type { errors as _ } from "../../src/content";
import FileCard from "./FileCard";
import { useFileStore } from "../../src/file-store";
import { useEffect, type Dispatch, type SetStateAction } from "react";

type FileProps = {
  errors: _;
  toolTipSizes: string[];
  setToolTipSizes: Dispatch<SetStateAction<string[]>>;
  loader_text: string;
  showSpinner: boolean;
  fileDetailProps: [string, string, string];
  path: string;
};

const Files = ({
  errors,
  loader_text,
  fileDetailProps,
}: FileProps) => {
  const { files, imageUrls, setImageUrls } = useFileStore();

  useEffect(() => { }, [files]);

  return (
    <div className="display-file">
      {files.map((file, index) => (
        <div key={file.name} className="file-element">
          <FileCard
            file={file}
            index={index}
            errors={errors}
            loader_text={loader_text}
            fileDetailProps={fileDetailProps}
          />
        </div>
      ))}
    </div>
  );
};

export default Files;