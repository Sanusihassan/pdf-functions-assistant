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
    title: "पीडीएफ असिस्टेंट",
    seoTitle: "एआई पीडीएफ असिस्टेंट - अपनी पीडीएफ अनुभव को बेहतर बनाएं",
    description: "एआई-संचालित सहायक जो उन्नत पीडीएफ कार्यों को आसानी से पूरा करता है।",
    color: "#38ada9",
    type: ".pdf",
    to: "assistant",
    features: [
      {
        title: "एआई-ड्रिवन टास्क्स",
        description: "एआई का उपयोग करके अपने पीडीएफ कार्य करें, डेटा निकालें, सामग्री का सारांश बनाएं, और अधिक।"
      },
      {
        title: "समय बचाने वाली ऑटोमेशन",
        description: "जटिल पीडीएफ ऑपरेशंस के लिए इंटेलिजेंट ऑटोमेशन से अपने कार्य प्रवाह को सरल बनाएं।"
      },
      {
        title: "एक संपूर्ण समाधान",
        description: "एक उपयोगकर्ता-अनुकूल प्लेटफ़ॉर्म पर पीडीएफ टूल्स का व्यापक सेट एक्सेस करें।"
      }
    ],
    keywords: "एआई पीडीएफ असिस्टेंट, पीडीएफ फंक्शन टूल, पीडीएफ के लिए एआई असिस्टेंट, पीडीएफ का सारांश, पीडीएफ डेटा निष्कर्षण, पीडीएफ कार्य ऑटोमेशन, ऑनलाइन पीडीएफ एआई, उन्नत पीडीएफ ऑपरेशन"
  },
};


export const pageProps: SeoProps = {
  title: "PDFEquips | आपका AI-संचालित PDF सहायक",
  description: "PDFEquips आपके PDF कार्यों को AI के साथ सरल बनाता है। अध्यायों के अनुसार PDF विभाजित करें, सारांश प्राप्त करें, डेटा निकालें और अधिक। आपका अंतिम PDF सहायक यहाँ है!",
  canonical: "https://www.pdfequips.com",
  image: "https://www.pdfequips.com/images/pdf-assistant-hi.png",
  images: [
    {
      url: "https://www.pdfequips.com/assets/images/pdf-assistant-hi.png",
      width: 1200,
      height: 630,
      alt: "PDFEquips - आपका AI-संचालित PDF सहायक",
    },
  ],
  lang: "hi",
  keywords: [
    "PDF सहायक",
    "AI PDF टूल्स",
    "अध्याय के अनुसार PDF विभाजित करें",
    "PDF सारांशक",
    "AI PDF चैटबॉट",
    "PDF प्रसंस्करण",
    "PDFEquips",
    "AI-संचालित PDF संपादक",
  ],
  noindex: false,
  nofollow: false,
  type: "website",
  locale: "hi_IN",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PDFEquips",
      description:
        "एक AI-संचालित PDF सहायक जो PDF को विभाजित करने, सामग्री का सारांश बनाने और डेटा निकालने जैसे कार्य करता है।",
      applicationCategory: "Productivity",
      operatingSystem: "All",
      url: "https://www.pdfequips.com",
      image: "https://www.pdfequips.com/assets/images/pdf-assistant-hi.png",
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
    assistant: "PDF सहायक विकल्प",
  },
  loader_text: "कृपया प्रतीक्षा करें...",
  add_more_button: "अधिक पृष्ठ जोड़ें",
  action_buttons: {
    assistant: "दस्तावेज़ संसाधित करें",
  },
  pages: "पृष्ठ",
  page: "पृष्ठ",
  options: {
    info: "अपना संकेत जोड़ें",
    select_placeholder: "आप क्या करना चाहेंगे?",
    placeholder: "PDFEquips सहायक को संदेश",
    placeholders: {
      script: "दूसरे पृष्ठ को पीडीएफ फ़ाइल के रूप में निकालें...",
      content: "इस दस्तावेज़ का मुख्य विचार क्या है?",
      generate: "मेरे संलग्न डेटा के आधार पर एक रिज़्यूमे बनाएं।"
    },
    labels: {
      script: "एक कार्य करें",
      content: "अपने दस्तावेज़ के बारे में पूछें",
      generate: "एक दस्तावेज़ बनाएं"
    },
    ocr_placeholder: "भाषाएँ चुनें",
    ocr_warning: "अधिक सटीक परिणामों के लिए दस्तावेज़ की भाषा जोड़ें।"
  },
};

export const downloadFile: _downloadFile = {
  titles: {
    "pdf-assistant": ["आपका कार्य सफलतापूर्वक पूरा हो गया है!", "आपके कार्य सफलतापूर्वक पूरे हो गए हैं!"],
  },

  btnText: {
    "pdf-assistant": ["प्रक्रियाजित फ़ाइल डाउनलोड करें", "प्रक्रियाजित फ़ाइलें डाउनलोड करें"],
  },

  backto: {
    "pdf-assistant": "PDF सहायक पर वापस जाएं",
  },
};


export const tools: _tools = {
  select: "चुनें",
  or_drop: "या फ़ाइलें यहां छोड़ें",
  files: "फाइलें",
  drop_files: "फ़ाइलें यहाँ खींचें",
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "शर्तें",
  conditions: "उपयोग की शर्तें",
  privacy_policy: "गोपनीयता नीति",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "फ़ाइल खाली है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "फ़ाइल बहुत बड़ी है। कृपया एक छोटी फ़ाइल चुनें या हमारा कंप्रेस-पीडीएफ़ उपकरण उपयोग करके फ़ाइल का आकार कम करें।",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "फ़ाइल एक समर्थित प्रकार नहीं है।",
    types: {
      PDF: "कृपया एक मान्य पीडीएफ़फ़ाइल चुनें।",
      JPG: "कृपया एक मान्य जेपेग छवि फ़ाइल चुनें।",
      DOC: "कृपया एक मान्य वर्ड दस्तावेज़ फ़ाइल चुनें।",
      DOCX: "कृपया एक मान्य वर्ड दस्तावेज़ फ़ाइल चुनें।",
      XLS: "कृपया एक मान्य एक्सेल स्प्रेडशीट फ़ाइल चुनें।",
      XLSX: "कृपया एक मान्य एक्सेल स्प्रेडशीट फ़ाइल चुनें।",
      PPT: "कृपया एक मान्यपावरपॉइंट प्रस्तुति फ़ाइल चुनें।",
      PPTX: "कृपया एक मान्य पावरपॉइंट प्रस्तुति फ़ाइल चुनें।",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "फ़ाइल का डाटा भ्रष्ट है और इसे प्रसंस्करण नहीं किया जा सकता है। कृपया एक मान्य फ़ाइल चुनें।",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "फ़ाइल में फ़ॉन्ट गुम हैं। कृपया सुनिश्चित करें कि पीडीएफफ़ाइल में सभी फ़ॉन्ट एम्बेड हैं।",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "फ़ाइल में अवैध छवि डेटा है। कृपया सुनिश्चित करें कि सभी छवियाँ सही ढंग से फ़ॉर्मेटेड हैं।",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "आपने अनुमति दी हुई अधिकतम फ़ाइलों की संख्या पार कर दी है। कृपया कुछ फ़ाइलें हटाएं और पुनः प्रयास करें।",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message: "कोई फ़ाइल चयनित नहीं की गई है। कृपया कम से कम एक फ़ाइल चुनें।",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "एक अज्ञात त्रुटि हुई है। कृपया बाद में पुनः प्रयास करें या सहायता से संपर्क करें।",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "नेटवर्क में त्रुटि हो गई है। कृपया अपना इंटरनेट कनेक्शन जांचें और पुनः प्रयास करें।",
    code: "ERR_NETWORK",
  },
  ERR_MAX_USAGE: {
    message: "अधिकतम उपयोग सीमा पार हो गई है। कृपया इस सेवा का उपयोग जारी रखने के लिए अपग्रेड करें या सब्सक्राइब करें।",
    code: "ERR_MAX_USAGE",
  },
  ERR_FILE_PAGE_LIMIT: {
    message: "अपलोड की गई फ़ाइल 10 पृष्ठों की सीमा से अधिक है। कृपया कम पृष्ठों वाली फ़ाइल अपलोड करें।",
    code: "ERR_FILE_PAGE_LIMIT",
  },
};
