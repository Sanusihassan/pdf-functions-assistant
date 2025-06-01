import { Paragraph } from '@tiptap/extension-paragraph';
import { Heading } from '@tiptap/extension-heading';
import { Image as TiptapImage } from '@tiptap/extension-image';
import { Node, Mark } from '@tiptap/core';
// Helper function to create common attributes
export const createCommonAttributes = () => ({
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
export const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...createCommonAttributes(),
        };
    },
});

// Custom Heading to preserve attributes
export const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            ...createCommonAttributes(),
        };
    },
});

// Custom Image to preserve attributes
export const CustomImage = TiptapImage.extend({
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
export const CustomDiv = Node.create({
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
export const CustomSpan = Node.create({
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
export const CustomBr = Node.create({
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

// Mark extensions for inline formatting
export const CustomMark = Mark.create({
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

export const CustomSmall = Mark.create({
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

export const CustomSub = Mark.create({
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

export const CustomSup = Mark.create({
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
export const CustomQ = Mark.create({
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

// Custom Pre extension
export const CustomPre = Node.create({
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

export const GenericHTMLNode = Node.create({
    name: 'genericHTML',
    group: 'block',
    content: 'block*',
    atom: false,
    addAttributes() {
        return {
            ...createCommonAttributes(),
            tagName: {
                default: 'div',
                parseHTML: element => element.tagName.toLowerCase(),
                renderHTML: attributes => ({}),
            },
            // Preserve all other attributes
            htmlAttributes: {
                default: {},
                parseHTML: element => {
                    const attrs: { [index: string]: any } = {};
                    for (let i = 0; i < element.attributes.length; i++) {
                        const attr = element.attributes[i];
                        if (!['class', 'id', 'style'].includes(attr.name)) {
                            attrs[attr.name] = attr.value;
                        }
                    }
                    return attrs;
                },
                renderHTML: attributes => attributes.htmlAttributes || {},
            },
        };
    },
    parseHTML() {
        return [
            // Tables
            { tag: 'table' },
            { tag: 'thead' },
            { tag: 'tbody' },
            { tag: 'tfoot' },
            { tag: 'tr' },
            { tag: 'th' },
            { tag: 'td' },
            { tag: 'caption' },
            { tag: 'colgroup' },
            { tag: 'col' },
            // Lists (additional support)
            { tag: 'dl' },
            { tag: 'dt' },
            { tag: 'dd' },
            // Semantic elements
            { tag: 'header' },
            { tag: 'nav' },
            { tag: 'main' },
            { tag: 'section' },
            { tag: 'article' },
            { tag: 'aside' },
            { tag: 'footer' },
            { tag: 'figure' },
            { tag: 'figcaption' },
            { tag: 'address' },
            { tag: 'time' },
            // Media
            { tag: 'video' },
            { tag: 'audio' },
            { tag: 'source' },
            { tag: 'track' },
            { tag: 'embed' },
            { tag: 'object' },
            { tag: 'param' },
            { tag: 'iframe' },
            // Other elements
            { tag: 'abbr' },
            { tag: 'acronym' },
            { tag: 'cite' },
            { tag: 'dfn' },
            { tag: 'kbd' },
            { tag: 'samp' },
            { tag: 'var' },
            { tag: 'del' },
            { tag: 'ins' },
            { tag: 'ruby' },
            { tag: 'rt' },
            { tag: 'rp' },
            { tag: 'bdi' },
            { tag: 'bdo' },
            { tag: 'wbr' },
            { tag: 'meter' },
            { tag: 'progress' },
            { tag: 'output' },
            // Form elements (additional)
            { tag: 'fieldset' },
            { tag: 'legend' },
            { tag: 'label' },
            { tag: 'select' },
            { tag: 'option' },
            { tag: 'optgroup' },
            { tag: 'datalist' },
        ];
    },
    renderHTML({ node, HTMLAttributes }) {
        const tagName = node.attrs.tagName || 'div';
        const allAttributes = {
            ...HTMLAttributes,
            ...node.attrs.htmlAttributes,
        };
        return [tagName, allAttributes, 0];
    },
});

// Simplified inline generic element for spans and inline elements
export const GenericHTMLInline = Node.create({
    name: 'genericHTMLInline',
    group: 'inline',
    content: 'inline*',
    inline: true,
    addAttributes() {
        return {
            ...createCommonAttributes(),
            tagName: {
                default: 'span',
                parseHTML: element => element.tagName.toLowerCase(),
                renderHTML: attributes => ({}),
            },
            htmlAttributes: {
                default: {},
                parseHTML: element => {
                    const attrs = {};
                    for (let i = 0; i < element.attributes.length; i++) {
                        const attr: { [index: string]: any } = element.attributes[i];
                        if (!['class', 'id', 'style'].includes(attr.name)) {
                            // @ts-ignore
                            attrs[attr.name] = attr.value;
                        }
                    }
                    return attrs;
                },
                renderHTML: attributes => attributes.htmlAttributes || {},
            },
        };
    },
    parseHTML() {
        return [
            { tag: 'a' }, // Additional link support
            { tag: 'span' },
            { tag: 'label' },
            { tag: 'abbr' },
            { tag: 'acronym' },
            { tag: 'cite' },
            { tag: 'dfn' },
            { tag: 'kbd' },
            { tag: 'samp' },
            { tag: 'var' },
            { tag: 'time' },
            { tag: 'bdi' },
            { tag: 'bdo' },
            { tag: 'ruby' },
            { tag: 'rt' },
            { tag: 'rp' },
        ];
    },
    renderHTML({ node, HTMLAttributes }) {
        const tagName = node.attrs.tagName || 'span';
        const allAttributes = {
            ...HTMLAttributes,
            ...node.attrs.htmlAttributes,
        };
        return [tagName, allAttributes, 0];
    },
});

// Form elements
export const CustomForm = Node.create({
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

export const CustomInput = Node.create({
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

export const CustomTextarea = Node.create({
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

export const CustomButton = Node.create({
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
export const CustomCanvas = Node.create({
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

export const CustomDetails = Node.create({
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

export const CustomSummary = Node.create({
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