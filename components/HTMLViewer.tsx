import { useState, useEffect, useRef } from 'react';
import { FloatingDownloadBtn } from './FloatingDownloadBtn';
import { ChatTextArea } from './ChatTextArea';
import type { downloadFile } from '../src/content';

export const HTMLViewer = ({ content, chatAreaTooltipContent }: { content: string; chatAreaTooltipContent: downloadFile["chatAreaTooltipContent"] }) => {
    const [html, setHtml] = useState(content);
    const [TiptapEditor, setTiptapEditor] = useState<any>(null);
    const [headSection, setHeadSection] = useState<string>("");
    const editorRef = useRef<any>(null);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const bodyContent = doc.body.innerHTML;
        const _headSection = doc.head.innerHTML;
        setHeadSection(_headSection);
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

            <FloatingDownloadBtn onClick={() => {
                const blob = new Blob([html], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'document.html';
                a.click();
                URL.revokeObjectURL(url);
            }} />
        </div>
    );
};