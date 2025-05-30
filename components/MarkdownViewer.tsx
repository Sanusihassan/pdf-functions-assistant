import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import { Copy, Check, Download } from 'lucide-react';
import { useSelector } from 'react-redux';
import type { ToolState } from '../src/store';
import axios from 'axios';

interface MarkdownViewerProps {
    content: string;
    className?: string;
    speed?: number;
    onComplete?: () => void;
}

const endpoint = process.env.NODE_ENV === 'development'
    ? 'https://www.pdfequips.com'
    : '';

const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
    content,
    className = '',
    speed = 15,
    onComplete
}) => {
    const [displayContent, setDisplayContent] = useState('');
    const [copied, setCopied] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const mdResponse = useSelector(
        (state: { tool: ToolState }) => state.tool.mdResponse
    );

    useEffect(() => {
        let animationFrameId: number;
        let currentIndex = 0;

        const typeContent = () => {
            if (currentIndex < content.length) {
                currentIndex = Math.min(content.length, currentIndex + speed);
                setDisplayContent(content.slice(0, currentIndex));
                animationFrameId = requestAnimationFrame(typeContent);
            } else {
                onComplete && onComplete();
            }
        };

        setDisplayContent('');
        currentIndex = 0;
        animationFrameId = requestAnimationFrame(typeContent);

        return () => cancelAnimationFrame(animationFrameId);
    }, [content, speed, onComplete]);

    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = async () => {
        try {
            setDownloading(true);

            const formData = new FormData();
            formData.append(
                'markdown',
                JSON.stringify({ markdown: mdResponse })
            );
            formData.append(
                'options',
                JSON.stringify({
                    options: {
                        theme: 'github',
                        orientation: 'Portrait',
                        screenSize: 'screen',
                        pageMargin: 'No margin',
                        pageSize: 'A4',
                        fontSize: 16
                    }
                })
            );

            const response = await axios.post(
                `${endpoint}/api/md-text-to-pdf`,
                formData,
                {
                    responseType: 'blob'
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'output.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setDownloading(false);
        }
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
                        className="copy-btn me-1"
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

                    <button
                        onClick={handleDownload}
                        className="copy-btn"
                        aria-label="Download PDF"
                        title="Download PDF"
                        disabled={downloading}
                    >
                        <Download size={16} className="me-1" />
                        <span>{downloading ? 'Downloading...' : 'Download'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MarkdownViewer;
