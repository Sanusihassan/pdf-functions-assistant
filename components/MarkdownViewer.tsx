import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { type Components } from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MathNode {
    type: string;
    value: string;
}

interface MarkdownViewerProps {
    content: string;
    className?: string;
    speed?: number; // number of characters to add per animation frame
    onComplete?: () => void;
}

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
    content,
    className = '',
    speed = 15,
    onComplete
}) => {
    const [displayContent, setDisplayContent] = useState('');

    useEffect(() => {
        let animationFrameId: number;
        let currentIndex = 0;

        const typeContent = () => {
            if (currentIndex < content.length) {
                // Increase by "speed" characters per frame
                currentIndex = Math.min(content.length, currentIndex + speed);
                setDisplayContent(content.slice(0, currentIndex));
                animationFrameId = requestAnimationFrame(typeContent);
            } else {
                onComplete && onComplete();
            }
        };

        animationFrameId = requestAnimationFrame(typeContent);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [content, speed, onComplete]);

    const customComponents: Components = {
        // Inline math
        // @ts-ignore
        math: ({ node }: { node: MathNode }) => (
            <span
                className="math math-inline"
                dangerouslySetInnerHTML={{
                    __html: window.katex.renderToString(node.value, {
                        throwOnError: false
                    })
                }}
            />
        ),
        // Block math
        mathBlock: ({ node }: { node: MathNode }) => (
            <div
                className="math math-block"
                dangerouslySetInnerHTML={{
                    __html: window.katex.renderToString(node.value, {
                        displayMode: true,
                        throwOnError: false
                    })
                }}
            />
        )
    };

    return (
        <div className={`markdown-viewer ${className}`}>
            <ReactMarkdown
                remarkPlugins={[remarkMath]}
                rehypePlugins={[rehypeKatex]}
                components={customComponents}
            >
                {displayContent}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownViewer;
