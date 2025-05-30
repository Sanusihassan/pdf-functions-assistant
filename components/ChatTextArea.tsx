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
    content,
    insertAtCursor,
}: {
    content: downloadFile["chatAreaTooltipContent"];
    insertAtCursor: (html: string) => void;
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
    const socketRef = useRef<any>(null);
    const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Try to use existing global socket first
        const existingSocket = getGlobalSocket();

        if (existingSocket && existingSocket.connected) {
            console.log("Using existing WebSocket connection");
            socketRef.current = existingSocket;
            setupSocketListeners(existingSocket);
        } else {
            // Create new connection if no existing one
            console.log("Creating new WebSocket connection");
            const socketUrl = process.env.NODE_ENV === "development"
                ? "https://www.pdfequips.com"
                : `https://${window.location.host}`;

            // Updated socket path to match your server namespace
            const socket = io(`${socketUrl}/html`);

            socketRef.current = socket;
            setupSocketListeners(socket);

            socket.on("connect", () => {
                console.log("New WebSocket connection established in ChatTextArea");
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
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: `<p style="color: red;">${error}</p>` },
            ]);
        });

        socket.on("status", (status: string) => {
            console.log(`Server status: ${status}`);
        });

        // // Handle file processing completion
        // socket.on("file-processed", (data: any) => {
        //     console.log("File processed:", data);
        //     if (data.message) {
        //         setMessages((prev) => [...prev, { role: "assistant", content: data.message }]);
        //         insertAtCursor(data.message);
        //     }
        // });

        // Handle conversation context updates
        socket.on("context-updated", (data: any) => {
            console.log("Context updated:", data);
        });
    };

    const handleSubmit = () => {
        // Clear any pending blur timeout
        if (blurTimeoutRef.current) {
            clearTimeout(blurTimeoutRef.current);
            blurTimeoutRef.current = null;
        }

        if (input.trim() && socketRef.current) {
            const newMessage: ChatMessage = { role: "user", content: input };
            setMessages((prev) => [...prev, newMessage]);

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


    const handleBlur = () => {
        // Delay hiding the chat area to allow button clicks to register
        blurTimeoutRef.current = setTimeout(() => {
            dispatch(setField({ showChatTextArea: false }));
        }, 150); // Small delay to allow click events to fire
    };

    const handleButtonMouseDown = (e: React.MouseEvent) => {
        // Prevent blur when clicking submit button
        e.preventDefault();
    };

    return (
        <div className={`${showChatTextArea ? "" : "d-none"}`}>
            <button
                className={`up-arrow-button deep-search ${advancedSearch ? "active" : ""}`}
                onClick={() => dispatch(setField({ advancedSearch: !advancedSearch }))}
                data-tooltip-id="search-tooltip"
                data-tooltip-content={advancedSearch ? "Disable Advanced Search" : content.search}
            >
                <Globe />
            </button>

            <textarea
                className="styled-textarea mt-3 overlayed-text-area"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={content.textarea}
                onBlur={handleBlur}
                onPaste={(e) => e.stopPropagation()}
                onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSubmit();
                    }
                }}
            ></textarea>

            <button
                className="up-arrow-button fixed"
                aria-label="submit"
                onClick={handleSubmit}
                onMouseDown={handleButtonMouseDown}
                data-tooltip-id="submit-tooltip"
                data-tooltip-content={content.submit}
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