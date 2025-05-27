import { useState, useRef, useEffect, type JSX } from "react";
import type { Editor } from "@tiptap/react";
import { PilcrowLeft, PilcrowRight } from "lucide-react";

interface TextDirectionOption {
    value: string;
    label: string;
    icon: JSX.Element;
}

export const TextDirectionTool = ({ editor }: { editor: Editor }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [currentDirection, setCurrentDirection] = useState<string>("left"); // Default LTR
    const dropdownRef = useRef<HTMLDivElement>(null);

    const directions: TextDirectionOption[] = [
        { value: "left", label: "Left (LTR)", icon: <PilcrowRight /> },
        { value: "right", label: "Right (RTL)", icon: <PilcrowLeft /> },
        // Optional: Add center and justify if needed
        // { value: "center", label: "Center", icon: <MdOutlineFormatAlignCenter /> },
        // { value: "justify", label: "Justify", icon: <MdOutlineFormatAlignJustify /> },
    ];

    // Sync editor's textAlign with component state
    useEffect(() => {
        const handleUpdate = () => {
            const currentAlign = editor.getAttributes('paragraph')?.textAlign || "left";
            if (currentAlign !== currentDirection) {
                setCurrentDirection(currentAlign);
            }
        };

        editor.on('selectionUpdate', handleUpdate);
        editor.on('update', handleUpdate);

        return () => {
            editor.off('selectionUpdate', handleUpdate);
            editor.off('update', handleUpdate);
        };
    }, [editor, currentDirection]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle direction selection
    const handleDirectionSelect = (direction: string) => {
        editor.chain().focus().setTextAlign(direction).run();
        setCurrentDirection(direction);
        setIsDropdownOpen(false);
    };

    // Toggle between LTR and RTL on main button click
    const handleToggleDirection = () => {
        const newDirection = currentDirection === "left" ? "right" : "left";
        editor.chain().focus().setTextAlign(newDirection).run();
        setCurrentDirection(newDirection);
    };

    return (
        <div className="text-direction-tool-wrapper" ref={dropdownRef}>
            <button
                className={`text-direction-tool${editor.isActive({ textAlign: currentDirection }) ? " active" : ""}`}
                onClick={handleToggleDirection}
                title={currentDirection === "left" ? "Left (LTR)" : "Right (RTL)"}
            >
                {currentDirection === "left" ? <PilcrowLeft /> : <PilcrowRight />}
            </button>
            <div className={`direction-options hide-show ignore${isDropdownOpen ? " show" : " hide"}`}>
                <ul>
                    {directions.map((direction) => (
                        <li
                            key={direction.value}
                            className={`direction-option${currentDirection === direction.value ? " active" : ""}`}
                            onClick={() => handleDirectionSelect(direction.value)}
                        >
                            {direction.icon}
                            <span>{direction.label}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};