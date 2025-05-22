import { Globe } from "lucide-react";
import { Tooltip } from "react-tooltip";
import type { downloadFile } from "../src/content";

export const ChatTextArea = ({ content }: { content: downloadFile["chatAreaTooltipContent"] }) => {
    return (
        <>

            <button
                className="up-arrow-button deep-search"
                data-tooltip-id="search-tooltip"
                data-tooltip-content={content.search}
            >
                <Globe />
            </button>

            <textarea
                className="styled-textarea mt-3 overlayed-text-area"
                data-tooltip-id="textarea-tooltip"
                data-tooltip-content={content.textarea}
                onPaste={(e) => {
                    e.stopPropagation();
                }}
            ></textarea>

            {/* Submit button with tooltip */}
            <button
                className="up-arrow-button fixed"
                aria-label="submit"
                data-tooltip-id="submit-tooltip"
                data-tooltip-content={content.submit}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                onClick={(e) => {
                    // Your submit logic here
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m18 15-6-6-6 6" />
                </svg>
            </button>

            {/* Tooltip components */}
            <Tooltip
                id="search-tooltip"
                place="top"
            />
            <Tooltip
                id="textarea-tooltip"
                place="top"
            />
            <Tooltip
                id="submit-tooltip"
                place="top"
            />
        </>
    )
}