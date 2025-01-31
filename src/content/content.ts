import type { SeoProps } from "../head";
export const tool = {
  PDF_Assistant: {
    title: "PDF Assistant",
    seoTitle: "PDF AI Assistant - Enhance Your PDF Experience",
    description: "AI-powered assistant to perform advanced PDF tasks effortlessly.",
    color: "#38ada9",
    type: ".pdf",
    to: "/pdf-assistant",
    features: [
      {
        title: "AI-Driven Tasks",
        description: "Leverage AI to perform your PDF tasks, extract data, summarize content, and more."
      },
      {
        title: "Time-Saving Automation",
        description: "Streamline your workflow with intelligent automation for complex PDF operations."
      },
      {
        title: "All-in-One Solution",
        description: "Access a comprehensive suite of PDF tools in one user-friendly platform."
      }
    ],
    keywords: "AI PDF assistant, PDF functions tool, pdf ai assistant to help with pdf tools, PDF summarizer, PDF data extraction, automate PDF tasks, intelligent PDF assistant, online PDF AI, advanced PDF operations, functions assistant for PDF, secure AI PDF tool, free PDF assistant, efficient PDF tools, interactive PDF solutions, manage PDFs with AI, PDF AI assistant features"
  },
};


export const pageProps: SeoProps = {
  title: "PDFEquips | Your AI-Powered PDF Assistant",
  description: "PDFEquips simplifies your PDF tasks with AI. Split PDFs by chapters, get summaries, extract data, and more. Your ultimate PDF assistant is here!",
  canonical: "https://www.pdfequips.com",
  image: "https://www.pdfequips.com/assets/images/og-image.png",
  images: [
    {
      url: "https://www.pdfequips.com/assets/images/og-image.png",
      width: 1200,
      height: 630,
      alt: "PDFEquips - Your AI-Powered PDF Assistant",
    },
  ],
  lang: "en",
  keywords: [
    "PDF assistant",
    "AI PDF tools",
    "split PDF by chapter",
    "PDF summarizer",
    "PDF AI chatbot",
    "PDF processing",
    "PDFEquips",
    "AI-powered PDF editor",
  ],
  noindex: false,
  nofollow: false,
  type: "website",
  locale: "en_US",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PDFEquips",
      description:
        "An AI-powered PDF assistant that performs tasks like splitting PDFs, summarizing content, and extracting data.",
      applicationCategory: "Productivity",
      operatingSystem: "All",
      url: "https://www.pdfequips.com",
      image: "https://www.pdfequips.com/assets/images/og-image.png",
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


export const tools = {
  select: "Select",
  or_drop: "or drop files here",
  files: "files",
  drop_files: "Drag files here",
};

export const edit_page = {
  edit_page_titles: {
    pdf_assistant: "PDF assistant options",
  },
  loader_text: "please wait...",
  add_more_button: "Add more pages",
  action_buttons: {
    pdf_assistant: "Process Document",
  },
  pages: "pages",
  page: "page",
  options: {
    info: "Add your prompt",
    placeholder: "Message PDFEquips Assistant"
  }
};

export const downloadFile = {
  titles: {
    "pdf-assistant": ["Your task has been successfully completed!", "Your tasks have been successfully completed!"],
  },

  btnText: {
    "pdf-assistant": ["Download processed file", "Download processed files"],
  },

  backto: {
    "pdf-assistant": "Back To PDF assistant",
  },
};

export const errors = {
  EMPTY_FILE: {
    message: "The file is empty. Please choose a valid file.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "The file is too large. Please choose a smaller file, or use our compress-pdf tool to reduce the file size.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "The file is not a supported type.",
    types: {
      PDF: "Please choose a valid PDF file.",
      JPG: "Please choose a valid JPEG image file.",
      DOC: "Please choose a valid Word document file.",
      DOCX: "Please choose a valid Word document file.",
      XLS: "Please choose a valid Excel spreadsheet file.",
      XLSX: "Please choose a valid Excel spreadsheet file.",
      PPT: "Please choose a valid PowerPoint presentation file.",
      PPTX: "Please choose a valid PowerPoint presentation file.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "The file is corrupt and cannot be processed. Please choose a valid file.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "The file contains missing fontsand cannot be processed. Please ensure all fonts are embedded in the PDF file.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "The file contains invalid image data. Please ensure all images are properly formatted.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "You have exceeded the maximum number of files allowed. Please delete some files and try again.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "No files selected. Please select at least one file.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "An unknown error occurred. Please try again later or contact support.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "A network error occurred. Please check your internet connection and try again.",
    code: "ERR_NETWORK",
  },
  ERR_MAX_USAGE: {
    message:
      "Maximum usage exceeded. Please upgrade or subscribe to continue using this service.",
    code: "ERR_MAX_USAGE",
  },
  ERR_FILE_PAGE_LIMIT: {
    message:
      "The uploaded file exceeds the page limit of 10. Please upload a file with fewer pages.",
    code: "ERR_FILE_PAGE_LIMIT",
  },
};
