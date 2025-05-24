import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setField, type ToolState } from "../../src/store";
import type { edit_page as _edit_pages, errors } from "../../src/content";
import { Alert } from "react-bootstrap";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { languages } from "../../src/content/content";
import { type MultiValue } from 'react-select';
import { useFileStore } from "../../src/file-store";
import { validationForContentStrategy } from "../../src/utils";
import { Checkbox } from "pretty-checkbox-react";


export interface OptionsProps {
  content: _edit_pages["options"];
  errors: errors;
}

interface LanguageOption {
  value: string;
  label: string;
}

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

const Options = ({ content, errors }: OptionsProps) => {
  const { files } = useFileStore();
  const dispatch = useDispatch();
  const strategy = useSelector((state: { tool: ToolState }) => state.tool.strategy);
  const isScanned = useSelector((state: { tool: ToolState }) => state.tool.isScanned);
  const prompt = useSelector((state: { tool: ToolState }) => state.tool.prompt);
  const advancedSearch = useSelector((state: { tool: ToolState }) => state.tool.advancedSearch);

  const options = Object.entries(languages).map(
    ([value, language]: [string, { name: string, nativeName: string }]) => ({
      value,
      label: `${language.name} (${language.nativeName})`,
    })
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
    if (selectedOption.value === "content") {
      const file = files[0];
      (async () => {
        await validationForContentStrategy(file, dispatch, errors);
      })();
    }
  };

  const handleLangChange = (selectedOptions: MultiValue<LanguageOption>) => {
    const limitedOptions = selectedOptions ? selectedOptions.slice(0, 3) : [];
    dispatch(
      setField({
        selectedLanguages: limitedOptions.map(option => option.value),
      })
    );
  };

  return (
    <div className="options-container">
      <div className="select-wrapper">
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
        onChange={(e) => dispatch(setField({ prompt: e.target.value }))}
      >{prompt}</textarea>

      {/* Pretty Checkbox Toggle */}
      <Checkbox
        animation="smooth"
        color="primary"
        checked={advancedSearch}
        onClick={(e) => e.stopPropagation()}
        onChange={() => dispatch(setField({ advancedSearch: !advancedSearch }))}
        className="ml-1 my-3 mb-0"
      >
        {content.labels.advancedSearch}
      </Checkbox>



      {isScanned ? (
        <div>
          <Alert variant="warning">
            <InformationCircleIcon className="icon" /> {content.ocr_warning}
          </Alert>
          <Select
            isMulti
            name="languages"
            options={options}
            className="select-wrapper"
            classNamePrefix="select"
            placeholder={content.ocr_placeholder}
            onChange={handleLangChange}
            styles={customSelectStyles}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Options;
