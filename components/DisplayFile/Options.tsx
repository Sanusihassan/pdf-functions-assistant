import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setField, type ToolState } from "../../src/store";
import type { edit_page as _edit_pages } from "../../src/content";
import { Alert } from "react-bootstrap";
import { InformationCircleIcon } from "@heroicons/react/outline";

export interface OptionsProps {
  content: _edit_pages["options"];
}



// Custom styles for react-select using the theme color (#38ada9)
const customSelectStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderColor: "#38ada9",
    boxShadow: state.isFocused ? "0 0 0 0.2rem rgba(56, 173, 169, 0.25)" : provided.boxShadow,
    "&:hover": {
      borderColor: "#38ada9",
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#38ada9"
      : state.isFocused
        ? "#cceae8"
        : null,
    color: state.isSelected ? "#fff" : "#000",
    "&:hover": {
      backgroundColor: "#38ada9",
      color: "#fff",
    },
  }),
};
/**
 * this is the options i'll be passing, please complete it and update the selectOptions to get the content for the labels from it instead of hardcoding them, this is because my website is multilingual
content: {
    info: "Add your prompt",
    placeholder: "Message PDFEquips Assistant",
    placeholders: {
      script: "Ex: ",
      content: "...",
      generate: "..."
    }
  }
 */
const Options = ({ content }: OptionsProps) => {
  const dispatch = useDispatch();
  const strategy = useSelector(
    (state: { tool: ToolState }) => state.tool.strategy
  );


  const placeholder = strategy ? content.placeholders[strategy] : content.placeholder;

  const selectOptions = [
    { value: "script", label: content.labels.script },
    { value: "content", label: content.labels.content },
    { value: "generate", label: content.labels.generate },
  ];

  const handleSelectChange = (selectedOption: any) => {
    if (selectedOption) {
      dispatch(setField({ strategy: selectedOption.value }));
    }
  };

  return (
    <div className="options-container">
      <div className="select-container" style={{ margin: "10px 0" }}>
        <Select
          options={selectOptions}
          onChange={handleSelectChange}
          placeholder={content.select_placeholder}
          styles={customSelectStyles}
        />
      </div>
      <Alert variant="info">
        <InformationCircleIcon className="icon" /> {content?.info}
      </Alert>
      <textarea
        placeholder={placeholder}
        className="styled-textarea"
        onChange={(e) =>
          dispatch(setField({ prompt: e.target.value }))
        }
      ></textarea>
    </div>
  );
};

export default Options;
