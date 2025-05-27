// nothing is working here, the thing is that when changing the line-spacing the current-node is changed into
import React, { useRef, useEffect, useState } from "react";
import { MdOutlineFormatLineSpacing } from "react-icons/md";
import "rc-slider/assets/index.css";
import type { Editor } from "@tiptap/react";

export const SpacingTool = ({ editor }: { editor: Editor }) => {
    const [letterSpacing, setLetterSpacing] = useState<number>(0); // Default letter spacing in px
    const [lineSpacing, setLineSpacing] = useState<number>(1); // Default line spacing (unitless)
    const [hideDropdown, setHideDropdown] = useState<boolean>(true);
    const [SliderComponent, setSliderComponent] = useState<any>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Dynamically import Slider on client side only
    useEffect(() => {
        const loadSlider = async () => {
            try {
                const module = await import("rc-slider");
                setSliderComponent(() => module.default);
            } catch (error) {
                console.error("Failed to load slider component:", error);
            }
        };

        loadSlider();
    }, []);

    // Apply letter spacing and line spacing to editor
    useEffect(() => {
        if (editor && letterSpacing !== null) {
            editor
                .chain()
                .focus()
                .setMark('textStyle', { letterSpacing: `${letterSpacing}px` })
                .run();
        }
    }, [letterSpacing, editor]);

    useEffect(() => {
        if (editor && lineSpacing !== null) {
            editor
                .chain()
                .focus()
                .setNode('paragraph', { style: `line-height: ${lineSpacing}` })
                .run();
        }
    }, [lineSpacing, editor]);

    // Sync editor's current spacing with component state
    useEffect(() => {
        const handleUpdate = () => {
            // Sync letter spacing
            const currentLetterSpacing = editor.getAttributes('textStyle')?.letterSpacing;
            if (currentLetterSpacing) {
                const size = parseFloat(currentLetterSpacing);
                if (!isNaN(size) && size !== letterSpacing) {
                    setLetterSpacing(size);
                }
            } else {
                setLetterSpacing(0); // Default
            }

            // Sync line spacing (from paragraph node)
            const currentNode = editor.state.selection.$head.node();
            if (currentNode.type.name === 'paragraph') {
                const currentLineHeight = currentNode.attrs.style?.match(/line-height:\s*([\d.]+)/)?.[1];
                if (currentLineHeight) {
                    const size = parseFloat(currentLineHeight);
                    if (!isNaN(size) && size !== lineSpacing) {
                        setLineSpacing(size);
                    }
                } else {
                    setLineSpacing(1); // Default
                }
            }
        };

        editor.on('selectionUpdate', handleUpdate);
        editor.on('update', handleUpdate);

        return () => {
            editor.off('selectionUpdate', handleUpdate);
            editor.off('update', handleUpdate);
        };
    }, [editor, letterSpacing, lineSpacing]);

    // Handle slider changes
    const handleLetterSpacingChange = (value: number) => {
        const clampedValue = Math.max(-200, Math.min(800, value)); // Enforce bounds
        setLetterSpacing(clampedValue);
    };

    const handleLineSpacingChange = (value: number) => {
        const clampedValue = Math.max(0.5, Math.min(2.5, value)); // Enforce bounds
        setLineSpacing(clampedValue);
    };

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setHideDropdown(true);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="spacing-tool-wrapper" ref={dropdownRef}>
            <button
                className="spacing-tool"
                onClick={() => setHideDropdown(!hideDropdown)}
            >
                <MdOutlineFormatLineSpacing />
            </button>
            <div
                className={`spacing-tool-dropdown hide-show ignore${hideDropdown ? " hide" : " show"}`}
            >
                <p>Letter Spacing</p>
                <div className="slider-container">
                    {SliderComponent && (
                        <SliderComponent
                            min={-200}
                            max={800}
                            value={letterSpacing}
                            onChange={handleLetterSpacingChange}
                            className="custom-slider"
                        />
                    )}
                    <div className="input">
                        <input
                            type="text"
                            value={letterSpacing}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                    handleLetterSpacingChange(value);
                                }
                            }}
                        />
                        <span>px</span>
                    </div>
                </div>
                <p>Line Spacing</p>
                <div className="slider-container">
                    {SliderComponent && (
                        <SliderComponent
                            min={0.5}
                            max={2.5}
                            step={0.1}
                            value={lineSpacing}
                            onChange={handleLineSpacingChange}
                            className="custom-slider"
                        />
                    )}
                    <div className="input">
                        <input
                            type="text"
                            value={lineSpacing}
                            onChange={(e) => {
                                const value = parseFloat(e.target.value);
                                if (!isNaN(value)) {
                                    handleLineSpacingChange(value);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};