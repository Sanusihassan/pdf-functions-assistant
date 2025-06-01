import { useEditor, EditorContent } from '@tiptap/react';
import { Document } from '@tiptap/extension-document';
import { Text } from '@tiptap/extension-text';
import { Bold } from '@tiptap/extension-bold';
import { Italic } from '@tiptap/extension-italic';
import { Strike } from '@tiptap/extension-strike';
import { Code } from '@tiptap/extension-code';
import { CodeBlock } from '@tiptap/extension-code-block';
import { BulletList } from '@tiptap/extension-bullet-list';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { ListItem } from '@tiptap/extension-list-item';
import { Blockquote } from '@tiptap/extension-blockquote';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { HardBreak } from '@tiptap/extension-hard-break';
import { History } from '@tiptap/extension-history';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { useState, useCallback, useEffect } from 'react';
import { StyleTools } from './StyleTools';
import { useSelector } from 'react-redux';
import type { ToolState } from '../src/store';
import { FloatingDownloadBtn } from './FloatingDownloadBtn';
import axios from "axios";
import type { downloadFile } from '../src/content';
import { CustomParagraph, CustomHeading, CustomBr, CustomMark, CustomSmall, CustomSub, CustomSup, CustomQ, CustomPre, CustomImage, GenericHTMLNode, GenericHTMLInline, CustomForm, CustomInput, CustomTextarea, CustomButton, CustomDiv, CustomSpan, CustomCanvas, CustomDetails, CustomSummary } from './CustomElements';


interface CursorPosition {
    line: number;
    column: number;
    position: number;
    nodeType: string;
    nodeName?: string;
}

interface TiptapEditorProps {
    html: string;
    setHtml: (html: string) => void;
    onCursorPositionChange?: (position: CursorPosition) => void;
    content: downloadFile["htmlViewerContent"]["floatingDownloadBtnContent"]
}

const TiptapEditor = ({ html, setHtml, onCursorPositionChange, content }: TiptapEditorProps) => {
    const [cursorPosition, setCursorPosition] = useState<CursorPosition | null>(null);
    const headSection = useSelector((state: { tool: ToolState }) => state.tool.headSection);
    const lang = useSelector((state: { tool: ToolState }) => state.tool.lang);
    const message = useSelector((state: { tool: ToolState }) => state.tool.message);
    const downloadOptions = useSelector((state: { tool: ToolState }) => state.tool.downloadOptions);

    useEffect(() => {
        // Handle download options changes
    }, [downloadOptions]);

    // Function to calculate line and column from cursor position
    const calculateLineAndColumn = useCallback((editor: any) => {
        const { from } = editor.state.selection;
        const doc = editor.state.doc;
        const resolvedPos = doc.resolve(from);

        const currentNode = resolvedPos.node();
        const nodeType = currentNode.type.name;

        let lineNumber = 0;
        doc.descendants((node: any, pos: number) => {
            if (node.isBlock && pos < from) {
                lineNumber++;
            }
            return pos < from;
        });

        const blockStart = resolvedPos.start(resolvedPos.depth);
        const column = from - blockStart;

        const position: CursorPosition = {
            line: lineNumber,
            column: column,
            position: from,
            nodeType: nodeType,
            nodeName: currentNode.attrs?.id || currentNode.attrs?.class || undefined
        };

        return position;
    }, []);

    const getCursorInfo = useCallback((editor: any) => {
        const position = calculateLineAndColumn(editor);

        setCursorPosition(position);
        onCursorPositionChange?.(position);

        return position;
    }, [calculateLineAndColumn, onCursorPositionChange]);

    const insertTextAtCursor = useCallback((text: string) => {
        if (editor) {
            const { from } = editor.state.selection;
            editor.chain().focus().insertContentAt(from, text).run();
        }
    }, []);

    useEffect(() => {
        if (message) {
            insertTextAtCursor(message);
        }
    }, [message, insertTextAtCursor]);

    const editor = useEditor({
        extensions: [
            // Core extensions - use individual extensions instead of StarterKit
            Document,
            Text,

            // Basic text elements (use custom versions)
            CustomParagraph,
            CustomHeading,
            CustomBr,
            HardBreak,
            HorizontalRule,

            // Inline formatting (use built-in versions to avoid conflicts)
            Bold,
            Italic,
            Strike,
            Code,
            Underline,
            CustomMark,
            CustomSmall,
            CustomSub,
            CustomSup,

            // Quotes and code blocks
            Blockquote,
            CustomQ,
            CodeBlock,
            CustomPre,

            // Lists (use built-in versions)
            BulletList,
            OrderedList,
            ListItem,

            // Links and images
            Link,
            CustomImage,

            // Generic HTML support (handles tables and other elements)
            GenericHTMLNode,
            GenericHTMLInline,

            // Forms
            CustomForm,
            CustomInput,
            CustomTextarea,
            CustomButton,

            // Structure
            CustomDiv,
            CustomSpan,

            // HTML5 elements
            CustomCanvas,
            CustomDetails,
            CustomSummary,

            // Styling
            TextStyle,
            Color,
            Highlight,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),

            // Editor behavior
            History,
            Dropcursor,
            Gapcursor,
        ],
        content: html,
        onUpdate: ({ editor }) => {
            setHtml(editor.getHTML());
        },
        onSelectionUpdate: ({ editor }) => {
            getCursorInfo(editor);
        },
        // Add this to help with hydration issues
        editorProps: {
            attributes: {
                class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
            },
        },
    });

    const handleDownload = useCallback(async () => {
        if (editor) {
            try {
                const html = editor.getHTML();
                const htmlContent = `
                <!DOCTYPE html>
                <html lang="${lang || "en"}">
                    ${headSection}
                    ${html.includes("<body") ? html : `<body class="pdf-html">${html}</body>`}
                </html>
                `;

                const payload = {
                    pagesContainer: htmlContent,
                    downloadOptions: { ...downloadOptions, scale: (downloadOptions ? downloadOptions.scale / 100 : 1) },
                    pdfData: {},
                };

                const endpoint = process.env.NODE_ENV === "development" ? "https://www.pdfequips.com" : "";

                const response = await axios.post(`${endpoint}/download-pdf`, payload, {
                    responseType: 'blob',
                });

                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                const fileName = downloadOptions?.fileName ?? "document.pdf";

                const nameWithoutExtension = fileName.split('.').slice(0, -1).join('.') || fileName;
                link.setAttribute('download', `${nameWithoutExtension}.pdf`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            } catch (error) {
                console.error('PDF Download Error:', error);
            }
        }
    }, [editor, headSection, lang, downloadOptions]);

    const handleEditorClick = useCallback(() => {
        if (editor) {
            setTimeout(() => {
                getCursorInfo(editor);
            }, 10);
        }
    }, [editor, getCursorInfo]);

    if (!editor) {
        return <div>Loading editor...</div>;
    }

    return (
        <div>
            <StyleTools editor={editor} />
            <div onClick={handleEditorClick} className="pdf-html">
                <EditorContent editor={editor} />
            </div>
            <FloatingDownloadBtn onClick={handleDownload} content={content} />
        </div>
    );
};

export default TiptapEditor;