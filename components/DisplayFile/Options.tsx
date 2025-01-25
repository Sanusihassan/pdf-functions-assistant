import Select from "react-select";
import { useDispatch } from "react-redux";
import { setField } from "../../src/store";
import type { edit_page as _edit_pages } from "../../src/content";
import { Alert } from "react-bootstrap";
import { InformationCircleIcon } from "@heroicons/react/outline";

export interface OptionsProps {
  content: _edit_pages["options"];
}

const Options = ({ content }: OptionsProps) => {
  const dispatch = useDispatch();

  return (
    <div className="options-container">
      <Alert variant="info">
        <InformationCircleIcon className="icon" />{" "}
        {content?.info}
      </Alert>
      {/* please style this: advanced really good style please */}
      <textarea
        placeholder={content.placeholder}
        className="styled-textarea"
        onChange={(e) => { dispatch(setField({ prompt: e.target.value })) }}
      ></textarea>
    </div>
  );
};

export default Options;
