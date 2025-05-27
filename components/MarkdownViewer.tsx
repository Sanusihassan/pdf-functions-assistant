import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Copy, Check } from 'lucide-react';

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
    const [copied, setCopied] = useState(false);

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

        // Reset display content when content prop changes
        setDisplayContent('');
        currentIndex = 0;
        animationFrameId = requestAnimationFrame(typeContent);

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [content, speed, onComplete]);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container">
            <div className={`markdown-container ${className}`}>
                <div className="markdown-viewer">
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            // @ts-ignore
                            code({ node, inline, className, children, ...props }) {
                                const match = /language-(\w+)/.exec(className || '');
                                return !inline && match ? (
                                    <SyntaxHighlighter
                                        // @ts-ignore
                                        style={github}
                                        language={match[1]}
                                        PreTag="div"
                                        customStyle={{
                                            padding: '1rem',
                                            borderRadius: '0.375rem',
                                            marginTop: '0.5rem',
                                            marginBottom: '0.5rem'
                                        }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            }
                        }}
                    >
                        {displayContent}
                    </ReactMarkdown>
                </div>
                <div className="copy-button-container">
                    <button
                        onClick={handleCopy}
                        className="copy-btn"
                        aria-label="Copy content"
                        title="Copy content"
                    >
                        {copied ? (
                            <>
                                <Check size={16} className="me-1" />
                                <span>Copied!</span>
                            </>
                        ) : (
                            <>
                                <Copy size={16} className="me-1" />
                                <span>Copy</span>
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarkdownViewer;