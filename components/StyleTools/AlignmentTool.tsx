import type { Editor } from '@tiptap/react';
import React, { useState, useEffect } from 'react';
import { FaAlignCenter, FaAlignJustify, FaAlignLeft, FaAlignRight } from 'react-icons/fa6';

type AlignmentType = 'justify' | 'left' | 'center' | 'right';

const alignments: AlignmentType[] = ['justify', 'left', 'center', 'right'];
const icons = [FaAlignJustify, FaAlignLeft, FaAlignCenter, FaAlignRight];

export const AlignmentTool = ({ editor }: { editor: Editor }) => {
    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    useEffect(() => {
        // Check the current alignment and set the icon accordingly
        alignments.forEach((alignment, index) => {
            if (editor.isActive({ textAlign: alignment })) {
                setCurrentIconIndex(index);
            }
        });
    }, [editor]);

    const handleClick = () => {
        const nextIndex = (currentIconIndex + 1) % icons.length;
        setCurrentIconIndex(nextIndex);

        // Apply the alignment to the editor
        const alignment = alignments[nextIndex];
        editor.chain().focus().setTextAlign(alignment).run();
    };

    const CurrentIcon = icons[currentIconIndex];

    return (
        <div
            className={`alignment-tool${editor.isActive({ textAlign: alignments[currentIconIndex] }) ? " active" : ""}`}
            onClick={handleClick}
        >
            <CurrentIcon />
        </div>
    );
};