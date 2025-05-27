// GlobalAttributes.ts
import { Extension } from '@tiptap/core';

export const GlobalAttributes = Extension.create({
    addGlobalAttributes() {
        return [
            {
                types: [
                    'paragraph',
                    'heading',
                    'bulletList',
                    'orderedList',
                    'listItem',
                    'blockquote',
                ],
                attributes: {
                    class: {
                        default: null,
                    },
                    id: {
                        default: null,
                    },
                },
            },
        ];
    },
});