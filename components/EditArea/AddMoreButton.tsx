import React from "react";
import { PlusIcon } from "@heroicons/react/solid";
import { Tooltip } from "react-tooltip";

interface AddMoreButtonProps {
  path: string;
  lang: string;
  text: string;
  onClick: () => void;
}

const AddMoreButton: React.FC<AddMoreButtonProps> = ({
  path,
  lang,
  text,
  onClick,
}: AddMoreButtonProps) => {
  return (
    <button
      className={`btn text-white add-more-files ${path}`}
      data-tooltip-content={text}
      data-tooltip-id="add-more-tooltip"
      data-tooltip-place={lang == "ar" ? "right" : "left"}
      onClick={onClick}
      style={lang == "ar" ? { order: 1 } : {}}
    >
      <div className="icon-container">
        <PlusIcon className="icon" />
      </div>
      <Tooltip id="add-more-tooltip" />
    </button>
  );
};

export default AddMoreButton;
