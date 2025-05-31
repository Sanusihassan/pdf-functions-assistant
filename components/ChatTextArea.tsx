// instead of the "waiting for response" placeholder i want to instead add 3 dots "..." 
// please give me the complete code solution because i'll be replacing my current code with the entire code solution you'll give me.
/**
 scss: 
 .styled-textarea {
    @include extend("bg-white");
    width: 100%;
    font-family: "Raleway",
        sans-serif;
    min-height: 150px;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    transition: all 0.3s ease;
    resize: none;
    font-size: 0.875rem;
    color: #333;

    &::placeholder {
        color: #9ca3af;
    }

    &:focus {
        outline: none;
        border-color: transparent;
        box-shadow: 0 0 0 2px $main-color;
    }

    &.overlayed-text-area {
        @include extend("position-fixed");
        bottom: 5%;
        width: 75%;
        z-index: 5;
        left: 50%;
        translate: -50% 0;
    }
}
 */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setField, type ToolState } from "../src/store";
import { Globe } from "lucide-react";
import { Tooltip } from "react-tooltip";
import type { downloadFile } from "../src/content";
import io from "socket.io-client";
import { getGlobalSocket } from "../src/handlers/handleUpload";

interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export const ChatTextArea = ({
    content
}: {
    content: downloadFile["htmlViewerContent"]["chatAreaTooltipContent"];
}) => {
    const dispatch = useDispatch();
    const showChatTextArea = useSelector(
        (state: { tool: ToolState }) => state.tool.showChatTextArea
    );
    const advancedSearch = useSelector(
        (state: { tool: ToolState }) => state.tool.advancedSearch
    );
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isWaitingForResponse, setIsWaitingForResponse] = useState(false);
    const socketRef = useRef<any>(null);
    const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Refs for detecting clicks
    const containerRef = useRef<HTMLDivElement>(null);
    const deepSearchButtonRef = useRef<HTMLButtonElement>(null);
    const submitButtonRef = useRef<HTMLButtonElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        // Try to use existing global socket first
        const existingSocket = getGlobalSocket();

        if (existingSocket && existingSocket.connected) {
            socketRef.current = existingSocket;
            setupSocketListeners(existingSocket);
        } else {
            // Create new connection if no existing one
            const socketUrl = process.env.NODE_ENV === "development"
                ? "https://www.pdfequips.com"
                : `https://${window.location.host}`;

            // Updated socket path to match your server namespace
            const socket = io(`${socketUrl}/html`);

            socketRef.current = socket;
            setupSocketListeners(socket);

            socket.on("connect", () => {
                // Connection established
            });

            socket.on("connect_error", (error) => {
                console.error("WebSocket connection error:", error);
            });
        }

        return () => {
            // Clean up timeout
            if (blurTimeoutRef.current) {
                clearTimeout(blurTimeoutRef.current);
            }

            // Don't disconnect the socket here to preserve connection
            // Only clean up listeners
            if (socketRef.current) {
                socketRef.current.off("response");
                socketRef.current.off("error");
                socketRef.current.off("status");
                socketRef.current.off("file-processed");
                socketRef.current.off("context-updated");
            }
        };
    }, []);

    const setupSocketListeners = (socket: any) => {
        // Remove existing listeners to prevent duplicates
        socket.off("response");
        socket.off("error");
        socket.off("status");
        socket.off("file-processed");
        socket.off("context-updated");

        socket.on("response", (response: string, metadata?: { isFirstResponse: boolean }) => {
            dispatch(setField({ advancedSearch: false }));
            // Re-enable textarea when response is received
            setIsWaitingForResponse(false);

            // Only process response in ChatTextArea if it's NOT the first response
            if (!metadata?.isFirstResponse) {
                // Don't sanitize HTML as requested
                setMessages((prev) => [...prev, { role: "assistant", content: response }]);
                dispatch(setField({
                    message: response,
                    showDownloadBtn: true
                }));
            }
        });

        socket.on("error", (error: string) => {
            console.error("Server error:", error);
            // Re-enable textarea when error is received
            setIsWaitingForResponse(false);
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `<p style="color: red;">${error}</p>` },
            ]);
        });
    };

    const handleSubmit = () => {
        // Clear any pending blur timeout
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
            blurTimeoutRef.current = null;
        }

        if (input.trim() && socketRef.current && !isWaitingForResponse) {
            const newMessage: ChatMessage = { role: "user", content: input };
            setMessages((prev) => [...prev, newMessage]);

            // Disable textarea while waiting for response
            setIsWaitingForResponse(true);

            // Use generate-pdf event with isFirstRequest: false
            socketRef.current.emit("generate-pdf", {
                message: input,
                advancedSearch: advancedSearch,
                preserveContext: true, // Include context preservation flag
                isFirstRequest: false // Always false for subsequent chat messages
            });

            setInput("");
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
        // Check if the click target is within our component
        const relatedTarget = e.relatedTarget as HTMLElement;

        // Don't hide if clicking on our buttons or staying within our container
        if (relatedTarget && containerRef.current) {
            if (containerRef.current.contains(relatedTarget)) {
                return; // Stay open if clicking within our component
            }
        }

        // Also prevent hiding if clicking on our specific buttons (backup check)
        if (relatedTarget === deepSearchButtonRef.current ||
            relatedTarget === submitButtonRef.current) {
            return;
        }

        // Delay hiding the chat area to allow button clicks to register
        blurTimeoutRef.current = setTimeout(() => {
            dispatch(setField({ showChatTextArea: false }));
        }, 100);
    };

    const handleDeepSearchClick = (e: React.MouseEvent) => {
        // Clear any pending blur timeout
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
            blurTimeoutRef.current = null;
        }

        // Toggle advanced search
        dispatch(setField({ advancedSearch: !advancedSearch }));

        // Return focus to textarea to prevent unwanted blur
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    };

    const handleSubmitClick = (e: React.MouseEvent) => {
        // Clear any pending blur timeout
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
            blurTimeoutRef.current = null;
        }

        handleSubmit();
    };

    const handleButtonMouseDown = (e: React.MouseEvent) => {
        // Prevent default to avoid focus issues
        e.preventDefault();
    };

    return (
        <div
            className={`${showChatTextArea ? "" : "d-none"}`}
            ref={containerRef}
        >
            <button
                ref={deepSearchButtonRef}
                className={`up-arrow-button deep-search ${advancedSearch ? "active" : ""}`}
                onClick={handleDeepSearchClick}
                onMouseDown={handleButtonMouseDown}
                data-tooltip-id="search-tooltip"
                data-tooltip-content={advancedSearch ? "Disable Advanced Search" : content.search}
                disabled={isWaitingForResponse}
            >
                <Globe />
            </button>

            <textarea
                ref={textareaRef}
                className="styled-textarea mt-3 overlayed-text-area"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={isWaitingForResponse ? content.loader_text : content.textarea}
                onBlur={handleBlur}
                onPaste={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
                disabled={isWaitingForResponse}
            />

            <button
                ref={submitButtonRef}
                className="up-arrow-button fixed"
                aria-label="submit"
                onClick={handleSubmitClick}
                onMouseDown={handleButtonMouseDown}
                data-tooltip-id="submit-tooltip"
                data-tooltip-content={content.submit}
                disabled={isWaitingForResponse}
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

            <Tooltip id="search-tooltip" place="top" />
            <Tooltip id="submit-tooltip" place="top" />
        </div>
    );
};