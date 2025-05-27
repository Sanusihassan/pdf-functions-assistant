import { RefreshIcon, TrashIcon } from "@heroicons/react/solid";
import { useRotatedImage, validateFiles } from "../../src/utils";
import type { errors as _ } from "../../src/content";
// import { ToolStoreContext } from "../../src/ToolStoreContext";

import { useSelector, useDispatch } from "react-redux";
import { useFileStore } from "../../src/file-store";

export type ActionProps = {
  index: number;
  extension?: string;
  errors: _;
  fileName: string;
};

/**
 * it's working fine, but the changes from this actiondiv component is not reflected ouside of it
 * it's a next.js app, the updates are not available on other components
 */

export const ActionDiv = ({
  index,
  extension,
  errors,
  fileName,
}: ActionProps) => {
  // the files:
  const { files, setFiles } = useFileStore();
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //  const newFiles = store.files.filter((file) => file.name !== item.file.name);
    const newFiles = files.filter((file) => file.name !== fileName);
    setFiles(newFiles);
  };
  // const rotatedImageUrl = useRotatedImage(item.imageUrl);
  // router and tool path

  // const handleRotateImage = useCallback(() => {
  //   if (rotatedImageUrl) {
  //     const newImageUrls = [...imageUrls];
  //     newImageUrls[index].imageUrl = rotatedImageUrl;
  //     setImageUrls(newImageUrls);
  //   }
  // }, [index, imageUrls, setImageUrls, rotatedImageUrl]);

  return (
    <div
      className={`action-div d-flex ${extension == ".html" ? "justify-content-end" : "justify-content-between"
        }`}
    >
      <button
        className="btn btn-light"
        // onClick={() => {
        //   const newImageUrls = [...imageUrls];
        //   newImageUrls.splice(index, 1);
        //   const isValid = validateFiles(files, extension, errors, dispatch);
        //   if(isValid) {
        //     dispatch(resetErrorMessage());
        //   }
        //   setImageUrls(newImageUrls);
        // }}
        // i think the problem might be with this onclick handler
        // which might not set the files correctly
        // this is a handler for deletion each file has a delete button
        // the files array on my mobx store should be updated and it should be reflected on all of my application.
        onClick={(e) => handleClick(e)}
      >
        <TrashIcon className="icon hero-icon" />
      </button>

      {/* {extension != ".html" ? (
        <button className="btn btn-light" onClick={handleRotateImage}>
          <RefreshIcon className="hero-icon" />
        </button>
      ) : null} */}
    </div>
  );
};
