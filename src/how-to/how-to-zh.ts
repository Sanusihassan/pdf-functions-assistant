import { type _howToSchema } from "./how-to";

export const howToSchema: _howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "如何使用 PDF 助手？",
    description: "在 PDFEquips 上使用 PDF 助手的步骤。",
    step: [
        {
            "@type": "HowToStep",
            name: "步骤 1",
            text: "在 PDFEquips 上打开 PDF 助手工具。"
        },
        {
            "@type": "HowToStep",
            name: "步骤 2",
            text: "上传您想要处理的 PDF 文件。"
        },
        {
            "@type": "HowToStep",
            name: "步骤 3",
            text: "在输入框中添加您的提示或指令。例如，您可以让助手总结、提取数据或执行特定任务。"
        },
        {
            "@type": "HowToStep",
            name: "步骤 4",
            text: "点击“处理文档”按钮以启动 AI 驱动的操作。"
        },
        {
            "@type": "HowToStep",
            name: "步骤 5",
            text: "等待结果并在文件处理完成后下载。"
        }
    ]
};
