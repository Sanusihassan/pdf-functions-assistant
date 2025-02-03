import type {
  tool as _tool,
  web2pdftool as _web2pdftool,
  tools as _tools,
  edit_page as _edit_page,
  footer as _footer,
  errors as _errors,
  downloadFile as _downloadFile,
  landing_page as _landing_page,
} from "../content";
import type { SeoProps } from "../head";

export const tool: _tool = {
  PDF_Assistant: {
    title: "PDF助手",
    seoTitle: "AI PDF助手 - 提升您的PDF体验",
    description: "由AI驱动的助手，轻松完成高级PDF任务。",
    color: "#38ada9",
    type: ".pdf",
    to: "pdf-assistant",
    features: [
      {
        title: "AI驱动的任务",
        description: "利用AI执行您的PDF任务、提取数据、总结内容等等。"
      },
      {
        title: "节省时间的自动化",
        description: "通过智能自动化简化您的工作流程，适用于复杂的PDF操作。"
      },
      {
        title: "一体化解决方案",
        description: "在一个用户友好的平台上访问全面的PDF工具套件。"
      }
    ],
    keywords: "AI PDF助手, PDF功能工具, AI PDF助手帮助工具, PDF总结, PDF数据提取, 自动化PDF任务, 在线PDF AI, 高级PDF操作, 交互式PDF解决方案"
  },
};

export const pageProps: SeoProps = {
  title: "PDFEquips | 您的AI驱动PDF助手",
  description: "PDFEquips利用AI简化您的PDF任务。按章节拆分PDF，获取摘要，提取数据等。您的终极PDF助手就在这里！",
  canonical: "https://www.pdfequips.com",
  image: "https://www.pdfequips.com/images/pdf-assistant-zh.png",
  images: [
    {
      url: "https://www.pdfequips.com/assets/images/pdf-assistant-zh.png",
      width: 1200,
      height: 630,
      alt: "PDFEquips - 您的AI驱动PDF助手",
    },
  ],
  lang: "zh",
  keywords: [
    "PDF助手",
    "AI PDF工具",
    "按章节拆分PDF",
    "PDF摘要生成器",
    "AI PDF聊天机器人",
    "PDF处理",
    "PDFEquips",
    "AI驱动的PDF编辑器",
  ],
  noindex: false,
  nofollow: false,
  type: "website",
  locale: "zh_CN",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PDFEquips",
      description:
        "一个AI驱动的PDF助手，可以执行拆分PDF、摘要内容、提取数据等任务。",
      applicationCategory: "Productivity",
      operatingSystem: "All",
      url: "https://www.pdfequips.com",
      image: "https://www.pdfequips.com/assets/images/pdf-assistant-zh.png",
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: "USD",
      },
    },
  ],
  twitter: {
    handle: "@PDFEquips",
    site: "@PDFEquips",
    cardType: "summary_large_image",
  },
};



export const edit_page: _edit_page = {
  edit_page_titles: {
    pdf_assistant: "PDF助手选项",
  },
  loader_text: "请稍候...",
  add_more_button: "添加更多页面",
  action_buttons: {
    pdf_assistant: "处理文档",
  },
  pages: "页面",
  page: "页",
  options: {
    info: "添加你的提示",
    select_placeholder: "你想做什么？",
    placeholder: "给PDFEquips助手发消息",
    placeholders: {
      script: "将第二页提取为PDF文件...",
      content: "这份文件的主要内容是什么？",
      generate: "根据我附加的数据创建一份简历。"
    },
    labels: {
      script: "执行任务",
      content: "询问关于你的文件",
      generate: "创建文档"
    },
    ocr_placeholder: "选择语言",
    ocr_warning: "添加文档语言以获得更准确的结果。"
  }
};

export const downloadFile: _downloadFile = {
  titles: {
    "pdf-assistant": ["您的任务已成功完成！", "您的任务已成功完成！"],
  },

  btnText: {
    "pdf-assistant": ["下载已处理文件", "下载已处理文件"],
  },

  backto: {
    "pdf-assistant": "返回PDF助手",
  },
};


export const tools: _tools = {
  select: "选择",
  or_drop: "或将文件拖放到此处",
  files: "文件",
  drop_files: "在此处拖放文件",
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "条款",
  conditions: "条件",
  privacy_policy: "隐私政策",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "文件为空，请选择一个有效的文件。",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "文件太大。请选择一个更小的文件，或使用我们的压缩PDF工具来减小文件大小。",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "文件不是受支持的类型。",
    types: {
      PDF: "请选择一个有效的PDF文件。",
      JPG: "请选择一个有效的JPEG图片文件。",
      DOC: "请选择一个有效的Word文档文件。",
      DOCX: "请选择一个有效的Word文档文件。",
      XLS: "请选择一个有效的Excel电子表格文件。",
      XLSX: "请选择一个有效的Excel电子表格文件。",
      PPT: "请选择一个有效的PowerPoint演示文稿文件。",
      PPTX: "请选择一个有效的PowerPoint演示文稿文件。",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message: "文件已损坏，无法处理。请选择一个有效的文件。",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message: "文件缺少字体。请确保所有字体都嵌入在PDF文件中。",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message: "文件包含无效的图像数据。请确保所有图像格式正确。",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  MAX_FILES_EXCEEDED: {
    message: "您已超出允许的最大文件数。请删除一些文件并重试。",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "未选择任何文件。请选择至少一个文件。",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message: "发生未知错误。请稍后重试或联系支持人员。",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message: "网络错误，请检查您的互联网连接并重试。",
    code: "ERR_NETWORK",
  },
  ERR_MAX_USAGE: {
    message: "已超出最大使用限制。请升级或订阅以继续使用此服务。",
    code: "ERR_MAX_USAGE",
  },
  ERR_FILE_PAGE_LIMIT: {
    message: "上传的文件超过了10页的限制。请上传页数较少的文件。",
    code: "ERR_FILE_PAGE_LIMIT",
  },
};
