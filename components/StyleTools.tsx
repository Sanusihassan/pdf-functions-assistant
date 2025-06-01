/**
 bold & italic tools are not working but the rest are working fine:
 [vite] hot updated: /components/StyleTools.tsx
StyleTools.tsx:71 
Editor {callbacks: {…}, isFocused: false, isInitialized: true, extensionStorage: {…}, options: {…}, …}
StyleTools.tsx:72 
 Uncaught TypeError: editor.chain(...).focus(...).toggleBold is not a function
    at onClick (StyleTools.tsx:72:44)

 */
import { FaItalic, FaBold } from "react-icons/fa6";
import { BiFont } from "react-icons/bi";
import { Bot, PaintBucket } from "lucide-react";
// import { FontSizeTool } from "./StyleTools/FontSizeTool";
import { HexColorPicker } from "react-colorful";
import { useEffect, useRef, useState } from "react";
import { AlignmentTool } from "./StyleTools/AlignmentTool";
import { ListTool } from "./StyleTools/ListTool";
// import { SpacingTool } from "./StyleTools/SpacingTool";
import { MoreTools } from "./StyleTools/MoreTools";
import type { Editor } from "@tiptap/react";
import { TextDirectionTool } from "./TextDirectionTool";
import { useDispatch, useSelector } from "react-redux";
import { setField, type ToolState } from "../src/store";

export const StyleTools = ({ editor }: { editor: Editor }) => {
    const styleToolsRef = useRef<HTMLDivElement>(null);
    const showStyleTools = true;
    const [color, setColor] = useState<string>("");
    const [bg, setBg] = useState<string>("");
    const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
    const [showPaintTool, setShowPaintTool] = useState<boolean>(false);

    const showChatTextArea = useSelector(
        (state: { tool: ToolState }) => state.tool.showChatTextArea
    );

    if (!editor) return <>...</>

    const dispatch = useDispatch();
    return (
        <div
            className={`style-tools hide-show ignore${showStyleTools ? " show" : " hide"}`}
            ref={styleToolsRef}
        >
            {/* <FontSizeTool editor={editor} /> */}
            <button className="chat-bot-tool" onClick={() => {
                dispatch(setField({
                    showChatTextArea: !showChatTextArea
                }))
            }}>
                <Bot />
            </button>
            <div className="text-color-tool hex-picker" onClick={() => setShowColorPicker(!showColorPicker)}>
                <BiFont />
                <div className={`color-picker-wrapper${showColorPicker ? "" : " hide"}`}>
                    <HexColorPicker
                        color={color}
                        onChange={(newColor) => {
                            setColor(newColor);
                            editor.chain().focus().setColor(newColor).run();
                        }}
                    />
                </div>
            </div>
            <div className="paint-tool hex-picker" onClick={() => setShowPaintTool(!showPaintTool)}>
                <PaintBucket />
                <div className={`color-picker-wrapper${showPaintTool ? "" : " hide"}`}>
                    <HexColorPicker
                        color={bg}
                        onChange={(newBg) => {
                            setBg(newBg);
                            editor.chain().focus().setHighlight({ color: newBg }).run();
                        }}
                    />
                </div>
            </div>
            <div
                className={`bold-tool${editor.isActive('bold') ? " active" : ""}`}
                onClick={() => {
                    editor.chain().focus().toggleBold().run();
                }}
            >
                <FaBold />
            </div>
            <div
                className={`italic-tool${editor.isActive('italic') ? " active" : ""}`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
            >
                <FaItalic />
            </div>
            <TextDirectionTool editor={editor} />
            <AlignmentTool editor={editor} />
            <ListTool editor={editor} />
            {/* <SpacingTool editor={editor} /> */}
            <MoreTools editor={editor} />
            {/* <button className="save-document">
                <BiDownload />
            </button> */}
        </div>
    );
};