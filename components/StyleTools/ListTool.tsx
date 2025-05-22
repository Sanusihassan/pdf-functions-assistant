import type { Editor } from '@tiptap/react';
import React, { useState, useEffect } from 'react';
import { FaListUl, FaListOl } from 'react-icons/fa6';

export const ListTool = ({ editor }: { editor: Editor }) => {
    const [isUnorderedList, setIsUnorderedList] = useState(true);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        // Check if we're in any kind of list and set the state accordingly
        const updateListState = () => {
            const isInBulletList = editor.isActive('bulletList');
            const isInOrderedList = editor.isActive('orderedList');

            setIsActive(isInBulletList || isInOrderedList);
            setIsUnorderedList(isInBulletList || !isInOrderedList);
        };

        updateListState();

        // Update when the selection changes
        editor.on('selectionUpdate', updateListState);
        editor.on('transaction', updateListState);

        return () => {
            editor.off('selectionUpdate', updateListState);
            editor.off('transaction', updateListState);
        };
    }, [editor]);

    const handleClick = () => {
        if (isActive) {
            // If we're already in a list, toggle between list types
            if (isUnorderedList) {
                // Currently in bullet list, switch to ordered list
                editor.chain().focus().toggleBulletList().toggleOrderedList().run();
            } else {
                // Currently in ordered list, switch back to bullet list
                editor.chain().focus().toggleOrderedList().toggleBulletList().run();
            }
        } else {
            // Not in a list, create the appropriate list type
            if (isUnorderedList) {
                editor.chain().focus().toggleBulletList().run();
            } else {
                editor.chain().focus().toggleOrderedList().run();
            }
        }

        // Toggle the icon state only if we're not already in a list
        if (!isActive) {
            setIsUnorderedList((prev) => !prev);
        }
    };

    const CurrentIcon = isUnorderedList ? FaListUl : FaListOl;

    return (
        <div
            className={`list-tool${isActive ? " active" : ""}`}
            onClick={handleClick}
            title={isUnorderedList ? "Bullet List" : "Numbered List"}
        >
            <CurrentIcon />
        </div>
    );
};