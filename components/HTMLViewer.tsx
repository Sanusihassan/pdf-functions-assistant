import { useState, useEffect, useRef } from 'react';
import { ChatTextArea } from './ChatTextArea';
import type { downloadFile } from '../src/content';
import { setField, type ToolState } from '../src/store';
import { useDispatch, useSelector } from 'react-redux';
import { defaultTextContent, PdfDownloadOptions } from './PdfDownloadOptions';

export const HTMLViewer = ({ content, chatAreaTooltipContent }: { content: string; chatAreaTooltipContent: downloadFile["chatAreaTooltipContent"] }) => {
    const [html, setHtml] = useState(content);
    const [TiptapEditor, setTiptapEditor] = useState<any>(null);
    const editorRef = useRef<any>(null);
    const headSection = useSelector((state: { tool: ToolState }) => state.tool.headSection);
    const dispatch = useDispatch();
    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const bodyContent = doc.body.innerHTML;
        const _headSection = doc.head.innerHTML;
        dispatch(setField({ headSection: _headSection }));
        setHtml(bodyContent);
        import('./TiptapEditor').then((module) => {
            setTiptapEditor(() => module.default);
        });
    }, [content]);

    const insertAtCursor = (newHtml: string) => {
        if (editorRef.current) {
            const editor = editorRef.current;
            const { from } = editor.state.selection;
            editor.chain().focus().insertContentAt(from, newHtml).run();
        }
    };

    return (
        <>
            <div className="html-viewer-wrapper">
                <div dangerouslySetInnerHTML={{ __html: headSection }} />
                {TiptapEditor ? (
                    <TiptapEditor html={html} setHtml={setHtml} editorRef={editorRef} />
                ) : (
                    <div className="editor-loading">
                        <div className="editor-placeholder" dangerouslySetInnerHTML={{ __html: html }}></div>
                    </div>
                )}
                <ChatTextArea content={chatAreaTooltipContent} insertAtCursor={insertAtCursor} />
            </div>
            <PdfDownloadOptions textContent={defaultTextContent} />
        </>
    );
};