// import React, { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { ActionDiv } from "./ActionDiv";
import { Tooltip } from "react-tooltip";
import type { errors as _ } from "../../src/content";
import { useDispatch } from "react-redux";
import { getFileDetailsTooltipContent } from "../../src/utils";
import { Loader } from "./Loader";
import { useState, useEffect } from "react";
interface ImageCardProps {
  index: number;
  provided: any;
  extension: string;
  errors: _;
  file: File;
  fileDetailProps: [string, string, string];
  loader_text: string;
}

const ImageCard: React.FC<ImageCardProps> = ({
  index,
  provided,
  extension,
  errors,
  file,
  fileDetailProps,
  loader_text,
}) => {
  const [showLoader, setShowLoader] = useState(true);
  const [showImg, setShowImg] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [tooltipSize, setToolTipSize] = useState("");
  const dispatch = useDispatch();
  let isSubscribed = true;
  let p = getFileDetailsTooltipContent(
    file,
    ...fileDetailProps,
    dispatch,
    errors
  );
  p.then((size) => {
    setToolTipSize(size);
  });
  useEffect(() => {
    const processFile = async () => {
      try {
        setShowLoader(true);
        if (extension && extension === ".jpg") {
          const reader = new FileReader();
          reader.onload = function (event: ProgressEvent<FileReader>) {
            const imageUrl = (event.target as FileReader).result as string;
            if (isSubscribed) {
              setImageUrl(imageUrl);
            }
          };
          reader.readAsDataURL(file);
        }
      } catch (error) {
        console.error("Error processing files:", error);
      } finally {
        // setShowLoader(false);
      }
    };
    processFile();
    return () => {
      isSubscribed = false;
    };
  }, [extension, file]);
  return (
    <div
      className="drag-element-img"
      data-tooltip-id={`image_tooltip_${index}`}
      data-tooltip-content={tooltipSize}
      data-tooltip-place="top"
      {...provided.dragHandleProps}
      style={{
        height: showImg ? "auto" : "126px",
      }}
    >
      <ActionDiv
        extension={extension}
        index={index}
        errors={errors}
        fileName={file.name}
      />
      {showLoader ? <Loader loader_text={loader_text} /> : null}
      <bdi>
        <Tooltip id={`image_tooltip_${index}`} />
      </bdi>
      <div>
        <img
          className="img-fluid-custom object-fit-cover border rounded"
          src={imageUrl}
          alt={`Selected file ${index}`}
          draggable={false}
          style={{
            opacity: showImg ? "1" : "0",
          }}
          onError={() => setShowImg(false)}
          onLoad={() => {
            setShowLoader(false);
            setShowImg(true);
          }}
        />
      </div>
      <p className="text-center">{file.name}</p>
    </div>
  );
};

export default ImageCard;
