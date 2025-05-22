import { useState, useRef, useEffect } from "react";
import { BsTypeStrikethrough } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { RiUnderline } from "react-icons/ri";
import { RxTransparencyGrid } from "react-icons/rx";
import { VscCaseSensitive } from "react-icons/vsc";
import "rc-slider/assets/index.css";
import type { Editor } from "@tiptap/react";

export const MoreTools = ({ editor }: { editor: Editor }) => {
    const [hideRest, setHideRest] = useState<boolean>(true);
    const [showOpacityTool, setShowOpacityTool] = useState<boolean>(false);
    const [opacity, setOpacity] = useState<number>(1);
    const [isUpperCase, setIsUpperCase] = useState<boolean>(false);
    const moreRef = useRef<HTMLDivElement>(null);
    const [SliderComponent, setSliderComponent] = useState<any>(null);

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

    // Apply opacity to editor
    useEffect(() => {
        if (editor && opacity !== null) {
            editor
                .chain()
                .focus()
                .setMark('textStyle', { opacity })
                .run();
        }
    }, [opacity, editor]);

    // Sync editor's state with component state
    useEffect(() => {
        const handleUpdate = () => {
            // Sync underline and strikethrough (for button active state)
            const isUnderlineActive = editor.isActive('underline');
            const isStrikeActive = editor.isActive('strike');

            // Sync opacity
            const currentOpacity = editor.getAttributes('textStyle')?.opacity;
            if (currentOpacity !== undefined) {
                const value = parseFloat(currentOpacity);
                if (!isNaN(value) && value !== opacity) {
                    setOpacity(value);
                }
            } else {
                setOpacity(1); // Default
            }

            // Sync case (check selected text)
            const { from, to } = editor.state.selection;
            const selectedText = editor.state.doc.textBetween(from, to, ' ');
            if (selectedText) {
                const isAllUpper = selectedText === selectedText.toUpperCase();
                const isAllLower = selectedText === selectedText.toLowerCase();
                setIsUpperCase(isAllUpper && !isAllLower);
            }
        };

        editor.on('selectionUpdate', handleUpdate);
        editor.on('update', handleUpdate);

        return () => {
            editor.off('selectionUpdate', handleUpdate);
            editor.off('update', handleUpdate);
        };
    }, [editor, opacity]);

    // Handle clicks outside the component
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
                setHideRest(true);
                setShowOpacityTool(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Handle opacity change
    const handleOpacityChange = (value: number) => {
        const clampedValue = Math.max(0, Math.min(1, value));
        setOpacity(clampedValue);
    };

    // Handle case toggle
    const handleCaseToggle = () => {
        const { from, to } = editor.state.selection;
        const selectedText = editor.state.doc.textBetween(from, to, ' ');
        const isAllUpper = selectedText === selectedText.toUpperCase();
        const newText = isAllUpper ? selectedText.toLowerCase() : selectedText.toUpperCase();

        editor
            .chain()
            .focus()
            .command(({ tr }) => {
                tr.insertText(newText, from, to);
                return true;
            })
            .run();

        setIsUpperCase(!isAllUpper);
    };

    return (
        <div className="more" ref={moreRef}>
            <button
                className="indicator"
                onClick={() => setHideRest(!hideRest)}
                title="More Tools"
            >
                <IoIosMore />
            </button>
            <div className={`rest hide-show ignore${hideRest ? " hide" : " show"}`}>
                <button
                    className={`underline${editor.isActive('underline') ? " active" : ""}`}
                    title="Underline"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                >
                    <RiUnderline />
                </button>
                <button
                    className={`strikethrough${editor.isActive('strike') ? " active" : ""}`}
                    title="Strikethrough"
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                >
                    <BsTypeStrikethrough />
                </button>
                <button
                    className={`upper-case${isUpperCase ? " active" : ""}`}
                    title="Toggle Upper/Lower Case"
                    onClick={handleCaseToggle}
                >
                    <VscCaseSensitive />
                </button>
                {/* <button
                    className="opacity-icon"
                    title="Opacity"
                    onClick={() => setShowOpacityTool(!showOpacityTool)}
                >
                    <RxTransparencyGrid />
                </button> */}
                {/* <div className={`opacity-tool${!showOpacityTool ? " hide" : ""}`}>
                    <div className="slider-container opacity">
                        {SliderComponent && (
                            <SliderComponent
                                min={0}
                                max={1}
                                step={0.1}
                                value={opacity}
                                onChange={handleOpacityChange}
                                className="custom-slider"
                            />
                        )}
                        <div className="input">
                            <input
                                type="text"
                                value={opacity.toFixed(1)}
                                onChange={(e) => {
                                    const value = parseFloat(e.target.value);
                                    if (!isNaN(value)) {
                                        handleOpacityChange(value);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div> */}
            </div>
        </div>
    );
};