import { useEditor, EditorContent } from '@tiptap/react';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Heading } from '@tiptap/extension-heading';
import { Image as TiptapImage } from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import { Node } from '@tiptap/core';
import { useState, useCallback, useEffect } from 'react';
import { StyleTools } from './StyleTools';
import { useSelector } from 'react-redux';
import type { ToolState } from '../src/store';
import { FloatingDownloadBtn } from './FloatingDownloadBtn';
import axios from "axios";
import type { downloadFile } from '../src/content';

// Custom Paragraph to preserve class, id, and style
const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                    if (!attributes.class) return {};
                    return { class: attributes.class };
                },
            },
            id: {
                default: null,
                parseHTML: element => element.getAttribute('id'),
                renderHTML: attributes => {
                    if (!attributes.id) return {};
                    return { id: attributes.id };
                },
            },
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => {
                    if (!attributes.style) return {};
                    return { style: attributes.style };
                },
            },
        };
    },
});

// Custom Heading to preserve class, id, and style
const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: null,
                parseHTML: element => {
                    return element.getAttribute('class');
                },
                renderHTML: attributes => {
                    if (!attributes.class) return {};
                    return { class: attributes.class };
                },
            },
            id: {
                default: null,
                parseHTML: element => element.getAttribute('id'),
                renderHTML: attributes => {
                    if (!attributes.id) return {};
                    return { id: attributes.id };
                },
            },
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => {
                    if (!attributes.style) return {};
                    return { style: attributes.style };
                },
            },
        };
    },
});

// Custom Image to preserve class, id, and style
const CustomImage = TiptapImage.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                    if (!attributes.class) return {};
                    return { class: attributes.class };
                },
            },
            id: {
                default: null,
                parseHTML: element => element.getAttribute('id'),
                renderHTML: attributes => {
                    if (!attributes.id) return {};
                    return { id: attributes.id };
                },
            },
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => {
                    if (!attributes.style) return {};
                    return { style: attributes.style };
                },
            },
        };
    },
});

// Custom Div extension to handle div elements
const CustomDiv = Node.create({
    name: 'customDiv',

    group: 'block',

    content: 'block*',

    defining: true,

    addAttributes() {
        return {
            class: {
                default: null,
                parseHTML: element => element.getAttribute('class'),
                renderHTML: attributes => {
                    if (!attributes.class) return {};
                    return { class: attributes.class };
                },
            },
            id: {
                default: null,
                parseHTML: element => element.getAttribute('id'),
                renderHTML: attributes => {
                    if (!attributes.id) return {};
                    return { id: attributes.id };
                },
            },
            style: {
                default: null,
                parseHTML: element => element.getAttribute('style'),
                renderHTML: attributes => {
                    if (!attributes.style) return {};
                    return { style: attributes.style };
                },
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'div',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['div', HTMLAttributes, 0];
    },
});

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

    // Function to calculate line and column from cursor position
    const calculateLineAndColumn = useCallback((editor: any) => {
        const { from } = editor.state.selection;
        const doc = editor.state.doc;
        const resolvedPos = doc.resolve(from);

        // Get the current node
        const currentNode = resolvedPos.node();
        const nodeType = currentNode.type.name;

        // Calculate which "line" (block element) we're in
        let lineNumber = 0;
        doc.descendants((node: any, pos: number) => {
            if (node.isBlock && pos < from) {
                lineNumber++;
            }
            return pos < from; // Continue until we reach the cursor position
        });

        // Calculate column position within the current block
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

    // Function to get detailed cursor information
    const getCursorInfo = useCallback((editor: any) => {
        const position = calculateLineAndColumn(editor);

        console.log('Cursor Position Info:', {
            line: position.line,
            column: position.column,
            absolutePosition: position.position,
            nodeType: position.nodeType,
            nodeName: position.nodeName
        });

        setCursorPosition(position);
        onCursorPositionChange?.(position);

        return position;
    }, [calculateLineAndColumn, onCursorPositionChange]);

    // Function to insert text at current cursor position
    const insertTextAtCursor = useCallback((text: string) => {
        if (editor) {
            const { from } = editor.state.selection;
            editor.chain().focus().insertContentAt(from, text).run();
        }
    }, []);

    useEffect(() => {
        if (message) {
            console.log(message)
            insertTextAtCursor(message)
        }
    }, [message])


    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: false, // Use custom paragraph
                heading: false,  // Use custom heading
            }),
            CustomParagraph,
            CustomHeading,
            CustomImage,
            CustomDiv,
            Underline,
            TextStyle,
            Color,
            Highlight,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Link,
        ],
        content: html,
        onUpdate: ({ editor }) => {
            setHtml(editor.getHTML());
        },
        onSelectionUpdate: ({ editor }) => {
            // This fires whenever the cursor position changes
            getCursorInfo(editor);
        },
    });

    const handleDownload = useCallback(async () => {
        if (editor) {
            try {
                // Get the HTML content from the editor
                const html = editor.getHTML();
                const htmlContent = `
                <!DOCTYPE html>
                <html lang="${lang || "en"}">
                    ${headSection}
                    ${html.includes("<body") ? html : `<body class="pdf-html">${html}</body>`}
                </html>
                `;


                console.log("htmlcontent", htmlContent);

                // Define default download options matching the backend's DownloadOptionsState
                const downloadOptions = {
                    layout: 'portrait',
                    paperSize: 'A4',
                    scale: 1,
                    margin: 'default',
                    customMargins: { top: 10, right: 10, bottom: 10, left: 10 },
                };

                // Prepare the request payload
                const payload = {
                    pagesContainer: htmlContent,
                    downloadOptions,
                    pdfData: {}, // Include an empty pdfData object if your backend expects it
                };

                const endpoint = process.env.NODE_ENV === "development" ? "https://www.pdfequips.com" : "";

                // Send POST request to the backend
                const response = await axios.post(`${endpoint}/download-pdf`, payload, {
                    responseType: 'blob', // Important for handling binary PDF data
                });

                // Create a downloadable PDF file
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'document.pdf');
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url); // Clean up
            } catch (error) {
                console.error('PDF Download Error:', error);
                // Handle error (e.g., show a notification to the user)
            }
        }
    }, [editor]);

    // Handle click events to get cursor position
    const handleEditorClick = useCallback(() => {
        if (editor) {
            // Small delay to ensure selection is updated
            setTimeout(() => {
                getCursorInfo(editor);
            }, 10);
        }
    }, [editor, getCursorInfo]);

    if (!editor) {
        return null;
    }

    return (
        <div>
            <StyleTools editor={editor} />
            <div onClick={handleEditorClick}>
                <EditorContent editor={editor} />
            </div>
            <FloatingDownloadBtn onClick={handleDownload} content={content} />
        </div>
    );
};

export default TiptapEditor;