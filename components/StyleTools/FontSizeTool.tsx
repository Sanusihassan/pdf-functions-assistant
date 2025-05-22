import { useState, useRef, useEffect } from "react";
import { FontSizeSelect } from "./FontSizeSelect";
import { FaMinus, FaPlus } from "react-icons/fa6";
import type { Editor } from "@tiptap/react";

export const FontSizeTool = ({ editor }: { editor: Editor }) => {
    const [fontSize, setFontSize] = useState<number>(16); // Default font size
    const [isFontSizeDropdownOpen, setIsFontSizeDropdownOpen] = useState<boolean>(false);
    const decreaseSizeRef = useRef<HTMLButtonElement>(null);
    const increaseSizeRef = useRef<HTMLButtonElement>(null);

    // Update font size in editor when fontSize state changes
    useEffect(() => {
        if (fontSize) {
            editor
                .chain()
                .focus()
                .setMark('textStyle', { fontSize: `${fontSize}px` })
                .run();
        }
    }, [fontSize, editor]);

    // Sync editor's current font size with component state
    useEffect(() => {
        const handleUpdate = () => {
            const currentFontSize = editor.getAttributes('textStyle')?.fontSize;
            if (currentFontSize) {
                const size = parseInt(currentFontSize, 10);
                if (!isNaN(size) && size !== fontSize) {
                    setFontSize(size);
                }
            } else {
                // If no fontSize attribute is found, reset to default
                setFontSize(16);
            }
        };

        editor.on('selectionUpdate', handleUpdate);
        editor.on('update', handleUpdate);

        return () => {
            editor.off('selectionUpdate', handleUpdate);
            editor.off('update', handleUpdate);
        };
    }, [editor, fontSize]);

    const handleDecreaseSize = () => {
        const newSize = Math.max(8, fontSize - 2); // Minimum font size of 8px
        setFontSize(newSize);
    };

    const handleIncreaseSize = () => {
        const newSize = Math.min(72, fontSize + 2); // Maximum font size of 72px
        setFontSize(newSize);
    };

    return (
        <div className="font-size-tool">
            <button
                className="decrease-size"
                ref={decreaseSizeRef}
                onClick={handleDecreaseSize}
                disabled={fontSize <= 8}
            >
                <FaMinus />
            </button>
            <div
                className={`font-size${!fontSize ? " sm" : ""}`}
                onClick={() => {
                    setIsFontSizeDropdownOpen(!isFontSizeDropdownOpen);
                }}
            >
                {fontSize ? fontSize : "16"}
            </div>
            <button
                className="increase-size"
                ref={increaseSizeRef}
                onClick={handleIncreaseSize}
                disabled={fontSize >= 72}
            >
                <FaPlus />
            </button>
            <div className="select">
                <FontSizeSelect
                    isOpen={isFontSizeDropdownOpen}
                    setIsOpen={setIsFontSizeDropdownOpen}
                    fontSize={fontSize}
                    setFontSize={setFontSize}
                    decreaseSizeRef={decreaseSizeRef}
                    increaseSizeRef={increaseSizeRef}
                />
            </div>
        </div>
    );
};