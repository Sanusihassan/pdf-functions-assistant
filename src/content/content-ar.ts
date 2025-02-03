import type {
  tool as _tool,
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
    title: "مساعد PDF",
    seoTitle: "مساعد PDF بالذكاء الاصطناعي - تحسين تجربة PDF الخاصة بك",
    description: "مساعد مدعوم بالذكاء الاصطناعي لتنفيذ مهام PDF المتقدمة بسهولة.",
    color: "#38ada9",
    type: ".pdf",
    to: "assistant",
    features: [
      {
        title: "مهام مدعومة بالذكاء الاصطناعي",
        description: "استخدم الذكاء الاصطناعي لتنفيذ مهام PDF الخاصة بك، واستخراج البيانات، وتلخيص المحتوى، والمزيد."
      },
      {
        title: "أتمتة لتوفير الوقت",
        description: "قم بتبسيط سير العمل الخاص بك باستخدام أتمتة ذكية للعمليات المعقدة على ملفات PDF."
      },
      {
        title: "حل شامل",
        description: "الوصول إلى مجموعة متكاملة من أدوات PDF في منصة سهلة الاستخدام."
      }
    ],
    keywords: "مساعد PDF بالذكاء الاصطناعي, أداة وظائف PDF, مساعد PDF الذكي, تلخيص PDF, استخراج بيانات PDF, أتمتة مهام PDF, مساعد PDF عبر الإنترنت, عمليات PDF المتقدمة, مساعد PDF الذكي"
  },
};

export const pageProps: SeoProps = {
  title: "PDFEquips | مساعد PDF بالذكاء الاصطناعي",
  description: "PDFEquips يجعل مهام PDF أسهل باستخدام الذكاء الاصطناعي. قم بتقسيم ملفات PDF حسب الفصول، واحصل على ملخصات، واستخرج البيانات والمزيد. مساعد PDF النهائي الخاص بك هنا!",
  canonical: "https://www.pdfequips.com",
  image: "https://www.pdfequips.com/images/pdf-assistant-ar.png",
  images: [
    {
      url: "https://www.pdfequips.com/assets/images/pdf-assistant-ar.png",
      width: 1200,
      height: 630,
      alt: "PDFEquips - مساعد PDF بالذكاء الاصطناعي",
    },
  ],
  lang: "ar",
  keywords: [
    "مساعد PDF",
    "أدوات PDF بالذكاء الاصطناعي",
    "تقسيم PDF حسب الفصول",
    "ملخص PDF",
    "روبوت PDF الذكي",
    "معالجة PDF",
    "PDFEquips",
    "محرر PDF بالذكاء الاصطناعي",
  ],
  noindex: false,
  nofollow: false,
  type: "website",
  locale: "ar_SA",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PDFEquips",
      description:
        "مساعد PDF مدعوم بالذكاء الاصطناعي يقوم بمهام مثل تقسيم PDF، وتلخيص المحتوى، واستخراج البيانات.",
      applicationCategory: "Productivity",
      operatingSystem: "All",
      url: "https://www.pdfequips.com",
      image: "https://www.pdfequips.com/assets/images/pdf-assistant-ar.png",
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



export const tools: _tools = {
  select: "اختر",
  or_drop: "أو قم بإسقاط الملفات هنا",
  files: "ملفات",
  drop_files: "قم بوضع الملفات هنا",
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    pdf_assistant: "خيارات مساعد PDF",
  },
  loader_text: "يرجى الانتظار...",
  add_more_button: "إضافة المزيد من الصفحات",
  action_buttons: {
    pdf_assistant: "معالجة المستند",
  },
  pages: "صفحات",
  page: "صفحة",
  options: {
    info: "أضف تعليماتك",
    select_placeholder: "ماذا تريد أن تفعل؟",
    placeholder: "رسالة إلى مساعد PDFEquips",
    placeholders: {
      script: "استخرج الصفحة الثانية كملف PDF...",
      content: "ما هي الفكرة الرئيسية لهذا المستند؟",
      generate: "أنشئ سيرة ذاتية بناءً على بياناتي المرفقة."
    },
    labels: {
      script: "أداء مهمة",
      content: "اسأل عن مستندك",
      generate: "أنشئ مستندًا"
    },
    ocr_placeholder: "اختر اللغات",
    ocr_warning: "أضف لغة المستند للحصول على نتائج أكثر دقة."
  },
};

export const downloadFile: _downloadFile = {
  titles: {
    "pdf-assistant": ["تم إكمال مهمتك بنجاح!", "تم إكمال مهامك بنجاح!"],
  },

  btnText: {
    "pdf-assistant": ["تنزيل الملف المعالج", "تنزيل الملفات المعالجة"],
  },

  backto: {
    "pdf-assistant": "العودة إلى مساعد PDF",
  },
};


export const footer: _footer = {
  brand: "PDFEquips",
  terms: "الشروط",
  conditions: "والأحكام",
  privacy_policy: "سياسة الخصوصية",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "الملف فارغ. يرجى اختيار ملف صالح.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "حجم الملف كبير جدًا. يرجى اختيار ملف أصغر، أو استخدام أداة ضغط PDF الخاصة بنا لتقليل حجم الملف.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "الملف غير مدعوم.",
    types: {
      PDF: "يرجى اختيار ملف PDF صالح.",
      JPG: "يرجى اختيار ملف صورة JPEG صالح.",
      DOC: "يرجى اختيار ملف مستند Word صالح.",
      DOCX: "يرجى اختيار ملف مستند Word صالح.",
      XLS: "يرجى اختيار ملف جدول بيانات Excel صالح.",
      XLSX: "يرجى اختيارملف جدول بيانات Excel صالح.",
      PPT: "يرجى اختيار ملف عرض تقديمي PowerPoint صالح.",
      PPTX: "يرجى اختيار ملف عرض تقديمي PowerPoint صالح.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message: "الملف تالف ولا يمكن معالجته. يرجى اختيار ملف صالح.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "الملف يحتوي على خطوط أحرف مفقودة. يرجى التأكد من تضمين جميع الخطوط في ملف PDF.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "الملف يحتوي على بيانات صورة غير صالحة. يرجى التأكد من تنسيق جميع الصور بشكل صحيح.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "لقد تجاوزت الحد الأقصى لعدد الملفات المسموح به. يرجى حذف بعض الملفات والمحاولة مرة أخرى.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "لم يتم اختيار أي ملفات. يرجى اختيار ملف واحد على الأقل.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "حدث خطأ غير معروف. يرجى المحاولة مرة أخرى لاحقًا أو الاتصال بالدعم.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "حدث خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت وحاول مرة أخرى.",
    code: "ERR_NETWORK",
  },
  ERR_MAX_USAGE: {
    message: "تم تجاوز الحد الأقصى للاستخدام. يرجى الترقية أو الاشتراك لمواصلة استخدام هذه الخدمة.",
    code: "ERR_MAX_USAGE",
  },
  ERR_FILE_PAGE_LIMIT: {
    message: "الملف الذي تم تحميله يتجاوز الحد الأقصى لعدد الصفحات وهو 10. يرجى تحميل ملف يحتوي على صفحات أقل.",
    code: "ERR_FILE_PAGE_LIMIT",
  },
};
