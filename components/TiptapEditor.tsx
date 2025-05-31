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
import { Node, Mark } from '@tiptap/core';
import { useState, useCallback, useEffect } from 'react';
import { StyleTools } from './StyleTools';
import { useSelector } from 'react-redux';
import type { ToolState } from '../src/store';
import { FloatingDownloadBtn } from './FloatingDownloadBtn';
import axios from "axios";
import type { downloadFile } from '../src/content';

// Helper function to create common attributes
const createCommonAttributes = () => ({
    class: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('class'),
        renderHTML: (attributes: Record<string, any>) => {
            if (!attributes.class) return {};
            return { class: attributes.class };
        },
    },
    id: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('id'),
        renderHTML: (attributes: Record<string, any>) => {
            if (!attributes.id) return {};
            return { id: attributes.id };
        },
    },
    style: {
        default: null,
        parseHTML: (element: HTMLElement) => element.getAttribute('style'),
        renderHTML: (attributes: Record<string, any>) => {
            if (!attributes.style) return {};
            return { style: attributes.style };
        },
    },
});

// Custom Paragraph to preserve attributes
const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...createCommonAttributes(),
        };
    },
});

// Custom Heading to preserve attributes
const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...createCommonAttributes(),
        };
    },
});

// Custom Image to preserve attributes
const CustomImage = TiptapImage.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...createCommonAttributes(),
            alt: {
                default: null,
                parseHTML: element => element.getAttribute('alt'),
                renderHTML: attributes => {
                    if (!attributes.alt) return {};
                    return { alt: attributes.alt };
                },
            },
            width: {
                default: null,
                parseHTML: element => element.getAttribute('width'),
                renderHTML: attributes => {
                    if (!attributes.width) return {};
                    return { width: attributes.width };
                },
            },
            height: {
                default: null,
                parseHTML: element => element.getAttribute('height'),
                renderHTML: attributes => {
                    if (!attributes.height) return {};
                    return { height: attributes.height };
                },
            },
        };
    },
});

// Custom Div extension
const CustomDiv = Node.create({
    name: 'customDiv',
    group: 'block',
    content: 'block*',
    defining: true,
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'div' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['div', HTMLAttributes, 0];
    },
});

// Custom Span extension
const CustomSpan = Node.create({
    name: 'customSpan',
    group: 'inline',
    content: 'inline*',
    inline: true,
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'span' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['span', HTMLAttributes, 0];
    },
});

// Line break extension
const CustomBr = Node.create({
    name: 'customBr',
    group: 'inline',
    inline: true,
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'br' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['br', HTMLAttributes];
    },
});

// Horizontal rule extension
const CustomHr = Node.create({
    name: 'customHr',
    group: 'block',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'hr' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['hr', HTMLAttributes];
    },
});

// Mark extensions for inline formatting
const CustomBold = Mark.create({
    name: 'customBold',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'b' }, { tag: 'strong' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['strong', HTMLAttributes, 0];
    },
});

const CustomItalic = Mark.create({
    name: 'customItalic',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'i' }, { tag: 'em' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['em', HTMLAttributes, 0];
    },
});

const CustomMark = Mark.create({
    name: 'customMark',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'mark' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['mark', HTMLAttributes, 0];
    },
});

const CustomSmall = Mark.create({
    name: 'customSmall',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'small' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['small', HTMLAttributes, 0];
    },
});

const CustomSub = Mark.create({
    name: 'customSub',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'sub' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['sub', HTMLAttributes, 0];
    },
});

const CustomSup = Mark.create({
    name: 'customSup',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'sup' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['sup', HTMLAttributes, 0];
    },
});

// Quote extensions
const CustomBlockquote = Node.create({
    name: 'customBlockquote',
    group: 'block',
    content: 'block*',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'blockquote' }, { tag: 'quote' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['blockquote', HTMLAttributes, 0];
    },
});

const CustomQ = Mark.create({
    name: 'customQ',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'q' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['q', HTMLAttributes, 0];
    },
});

// Code extensions
const CustomCode = Mark.create({
    name: 'customCode',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'code' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['code', HTMLAttributes, 0];
    },
});

const CustomPre = Node.create({
    name: 'customPre',
    group: 'block',
    content: 'text*',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'pre' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['pre', HTMLAttributes, 0];
    },
});

// List extensions
const CustomUl = Node.create({
    name: 'customUl',
    group: 'block',
    content: 'customLi+',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'ul' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['ul', HTMLAttributes, 0];
    },
});

const CustomOl = Node.create({
    name: 'customOl',
    group: 'block',
    content: 'customLi+',
    addAttributes() {
        return {
            ...createCommonAttributes(),
            type: {
                default: null,
                parseHTML: element => element.getAttribute('type'),
                renderHTML: attributes => {
                    if (!attributes.type) return {};
                    return { type: attributes.type };
                },
            },
            start: {
                default: null,
                parseHTML: element => element.getAttribute('start'),
                renderHTML: attributes => {
                    if (!attributes.start) return {};
                    return { start: attributes.start };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'ol' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['ol', HTMLAttributes, 0];
    },
});

const CustomLi = Node.create({
    name: 'customLi',
    content: 'block*',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'li' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['li', HTMLAttributes, 0];
    },
});

// Table extensions
const CustomTable = Node.create({
    name: 'customTable',
    group: 'block',
    content: '(customThead | customTbody | customTfoot | customTr)*',
    addAttributes() {
        return {
            ...createCommonAttributes(),
            border: {
                default: null,
                parseHTML: element => element.getAttribute('border'),
                renderHTML: attributes => {
                    if (!attributes.border) return {};
                    return { border: attributes.border };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'table' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['table', HTMLAttributes, 0];
    },
});

const CustomThead = Node.create({
    name: 'customThead',
    content: 'customTr+',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'thead' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['thead', HTMLAttributes, 0];
    },
});

const CustomTbody = Node.create({
    name: 'customTbody',
    content: 'customTr+',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'tbody' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['tbody', HTMLAttributes, 0];
    },
});

const CustomTfoot = Node.create({
    name: 'customTfoot',
    content: 'customTr+',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'tfoot' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['tfoot', HTMLAttributes, 0];
    },
});

const CustomTr = Node.create({
    name: 'customTr',
    content: '(customTh | customTd)*',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'tr' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['tr', HTMLAttributes, 0];
    },
});

const CustomTh = Node.create({
    name: 'customTh',
    content: 'inline*',
    addAttributes() {
        return {
            ...createCommonAttributes(),
            colspan: {
                default: null,
                parseHTML: element => element.getAttribute('colspan'),
                renderHTML: attributes => {
                    if (!attributes.colspan) return {};
                    return { colspan: attributes.colspan };
                },
            },
            rowspan: {
                default: null,
                parseHTML: element => element.getAttribute('rowspan'),
                renderHTML: attributes => {
                    if (!attributes.rowspan) return {};
                    return { rowspan: attributes.rowspan };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'th' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['th', HTMLAttributes, 0];
    },
});

const CustomTd = Node.create({
    name: 'customTd',
    content: 'block*',
    addAttributes() {
        return {
            ...createCommonAttributes(),
            colspan: {
                default: null,
                parseHTML: element => element.getAttribute('colspan'),
                renderHTML: attributes => {
                    if (!attributes.colspan) return {};
                    return { colspan: attributes.colspan };
                },
            },
            rowspan: {
                default: null,
                parseHTML: element => element.getAttribute('rowspan'),
                renderHTML: attributes => {
                    if (!attributes.rowspan) return {};
                    return { rowspan: attributes.rowspan };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'td' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['td', HTMLAttributes, 0];
    },
});

// Form elements
const CustomForm = Node.create({
    name: 'customForm',
    group: 'block',
    content: 'block*',
    addAttributes() {
        return {
            ...createCommonAttributes(),
            action: {
                default: null,
                parseHTML: element => element.getAttribute('action'),
                renderHTML: attributes => {
                    if (!attributes.action) return {};
                    return { action: attributes.action };
                },
            },
            method: {
                default: null,
                parseHTML: element => element.getAttribute('method'),
                renderHTML: attributes => {
                    if (!attributes.method) return {};
                    return { method: attributes.method };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'form' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['form', HTMLAttributes, 0];
    },
});

const CustomInput = Node.create({
    name: 'customInput',
    group: 'inline',
    inline: true,
    addAttributes() {
        return {
            ...createCommonAttributes(),
            type: {
                default: 'text',
                parseHTML: element => element.getAttribute('type'),
                renderHTML: attributes => {
                    return { type: attributes.type || 'text' };
                },
            },
            name: {
                default: null,
                parseHTML: element => element.getAttribute('name'),
                renderHTML: attributes => {
                    if (!attributes.name) return {};
                    return { name: attributes.name };
                },
            },
            value: {
                default: null,
                parseHTML: element => element.getAttribute('value'),
                renderHTML: attributes => {
                    if (!attributes.value) return {};
                    return { value: attributes.value };
                },
            },
            placeholder: {
                default: null,
                parseHTML: element => element.getAttribute('placeholder'),
                renderHTML: attributes => {
                    if (!attributes.placeholder) return {};
                    return { placeholder: attributes.placeholder };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'input' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['input', HTMLAttributes];
    },
});

const CustomTextarea = Node.create({
    name: 'customTextarea',
    group: 'block',
    content: 'text*',
    addAttributes() {
        return {
            ...createCommonAttributes(),
            name: {
                default: null,
                parseHTML: element => element.getAttribute('name'),
                renderHTML: attributes => {
                    if (!attributes.name) return {};
                    return { name: attributes.name };
                },
            },
            rows: {
                default: null,
                parseHTML: element => element.getAttribute('rows'),
                renderHTML: attributes => {
                    if (!attributes.rows) return {};
                    return { rows: attributes.rows };
                },
            },
            cols: {
                default: null,
                parseHTML: element => element.getAttribute('cols'),
                renderHTML: attributes => {
                    if (!attributes.cols) return {};
                    return { cols: attributes.cols };
                },
            },
            placeholder: {
                default: null,
                parseHTML: element => element.getAttribute('placeholder'),
                renderHTML: attributes => {
                    if (!attributes.placeholder) return {};
                    return { placeholder: attributes.placeholder };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'textarea' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['textarea', HTMLAttributes, 0];
    },
});

const CustomButton = Node.create({
    name: 'customButton',
    group: 'inline',
    content: 'inline*',
    inline: true,
    addAttributes() {
        return {
            ...createCommonAttributes(),
            type: {
                default: 'button',
                parseHTML: element => element.getAttribute('type'),
                renderHTML: attributes => {
                    return { type: attributes.type || 'button' };
                },
            },
            name: {
                default: null,
                parseHTML: element => element.getAttribute('name'),
                renderHTML: attributes => {
                    if (!attributes.name) return {};
                    return { name: attributes.name };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'button' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['button', HTMLAttributes, 0];
    },
});

// Additional HTML5 elements
const CustomCanvas = Node.create({
    name: 'customCanvas',
    group: 'block',
    addAttributes() {
        return {
            ...createCommonAttributes(),
            width: {
                default: null,
                parseHTML: element => element.getAttribute('width'),
                renderHTML: attributes => {
                    if (!attributes.width) return {};
                    return { width: attributes.width };
                },
            },
            height: {
                default: null,
                parseHTML: element => element.getAttribute('height'),
                renderHTML: attributes => {
                    if (!attributes.height) return {};
                    return { height: attributes.height };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'canvas' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['canvas', HTMLAttributes];
    },
});

const CustomDetails = Node.create({
    name: 'customDetails',
    group: 'block',
    content: 'customSummary block*',
    addAttributes() {
        return {
            ...createCommonAttributes(),
            open: {
                default: null,
                parseHTML: element => element.hasAttribute('open') ? 'open' : null,
                renderHTML: attributes => {
                    if (!attributes.open) return {};
                    return { open: 'open' };
                },
            },
        };
    },
    parseHTML() {
        return [{ tag: 'details' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['details', HTMLAttributes, 0];
    },
});

const CustomSummary = Node.create({
    name: 'customSummary',
    content: 'inline*',
    addAttributes() {
        return createCommonAttributes();
    },
    parseHTML() {
        return [{ tag: 'summary' }];
    },
    renderHTML({ HTMLAttributes }) {
        return ['summary', HTMLAttributes, 0];
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
    const downloadOptions = useSelector((state: { tool: ToolState }) => state.tool.downloadOptions);
    useEffect(() => {
    }, [downloadOptions])

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

    const insertTextAtCursor = useCallback((text: string) => {
        if (editor) {
            const { from } = editor.state.selection;
            editor.chain().focus().insertContentAt(from, text).run();
        }
    }, []);

    useEffect(() => {
        if (message) {
            insertTextAtCursor(message)
        }
    }, [message])

    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                paragraph: false,
                heading: false,
                bold: false,
                italic: false,
                code: false,
                bulletList: false,
                orderedList: false,
                listItem: false,
                blockquote: false,
                horizontalRule: false,
            }),
            // Basic text elements
            CustomParagraph,
            CustomHeading,
            CustomBr,
            CustomHr,

            // Inline formatting
            CustomBold,
            CustomItalic,
            Underline,
            CustomMark,
            CustomSmall,
            CustomSub,
            CustomSup,

            // Quotes and code
            CustomBlockquote,
            CustomQ,
            CustomCode,
            CustomPre,

            // Lists
            CustomUl,
            CustomOl,
            CustomLi,

            // Links and images
            Link,
            CustomImage,

            // Tables
            CustomTable,
            CustomThead,
            CustomTbody,
            CustomTfoot,
            CustomTr,
            CustomTh,
            CustomTd,

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

            // Existing extensions
            TextStyle,
            Color,
            Highlight,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: html,
        onUpdate: ({ editor }) => {
            setHtml(editor.getHTML());
        },
        onSelectionUpdate: ({ editor }) => {
            getCursorInfo(editor);
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
    }, [editor]);

    const handleEditorClick = useCallback(() => {
        if (editor) {
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