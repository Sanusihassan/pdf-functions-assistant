import type { SeoProps } from "../head";
export const tool = {
  PDF_Assistant: {
    title: "PDF Assistant",
    seoTitle: "PDF AI Assistant - Enhance Your PDF Experience",
    description: "AI-powered assistant to perform advanced PDF tasks effortlessly.",
    color: "#38ada9",
    type: ".pdf",
    to: "assistant",
    features: [
      {
        title: "AI-Driven Tasks",
        description: "Leverage AI to perform your PDF tasks, extract data, summarize content, prompt to pdf and more."
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
  description: "PDFEquips simplifies your PDF tasks. Generate PDF using AI, get summaries, extract data, and more. Your ultimate PDF assistant is here!",
  canonical: "https://www.pdfequips.com",
  images: [
    {
      url: "https://www.pdfequips.com/images/pdf-assistant.png",
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
    assistant: "PDF assistant options",
  },
  loader_text: "please wait...",
  add_more_button: "Add more pages",
  action_buttons: {
    assistant: "Process Document",
  },
  pages: "pages",
  page: "page",
  options: {
    info: "Add your prompt",
    select_placeholder: "What would you like to do?",
    placeholder: "Message PDFEquips Assistant",
    placeholders: {
      script: "extract the second page as a pdf file...",
      content: "What is the main idea of this document?",
      generate: "create a resume based on my attached data."
    },
    labels: {
      script: "Perform a task",
      content: "Ask about your document",
      generate: "Create a document",
      advancedSearch: "Advanced search"
    },
    ocr_placeholder: "Select Languages",
    ocr_warning: "Add the document's language to get more accurate results."
  }
};

export const downloadFile = {
  titles: {
    "assistant": ["Your task has been successfully completed!", "Your tasks have been successfully completed!"],
  },

  btnText: {
    "assistant": ["Download processed file", "Download processed files"],
  },

  backto: {
    "assistant": "Back To PDF assistant",
  },
  htmlViewerContent: {
    chatAreaTooltipContent: {
      search: "Advanced search and reasoning",
      textarea: "Enter your message here",
      submit: "Submit message",
      loader_text: "please wait...",
    },
    downloadOptions: {
      downloadOptions: "Download Options",
      pdfDownloadOptions: "PDF Download Options",
      layout: "Layout",
      portrait: "Portrait",
      landscape: "Landscape",
      paperSize: "Paper Size",
      scale: "Scale",
      margins: "Margins",
      default: "Default",
      none: "None",
      minimal: "Minimal",
      custom: "Custom",
      customMarginsTitle: "Custom Margins",
      customMarginsUnit: "mm",
      top: "Top",
      right: "Right",
      bottom: "Bottom",
      left: "Left",
      doubleSided: "Double-sided printing",
      doubleSidedDesc: "Print on both sides of the page",
      fileName: "File Name",
      fileNamePlaceholder: "Enter file name...",
      cancel: "Cancel",
      save: "Save"
    },
    floatingDownloadBtnContent: {
      downloading: "Downloading...",
      complete: "Download Complete",
      default: "Download"
    }
  }
};

export const languages = {
  "abk": {
    "name": "Abkhaz",
    "nativeName": "аҧсуа"
  },
  "aar": {
    "name": "Afar",
    "nativeName": "Afaraf"
  },
  "afr": {
    "name": "Afrikaans",
    "nativeName": "Afrikaans"
  },
  "aka": {
    "name": "Akan",
    "nativeName": "Akan"
  },
  "sqi": {
    "name": "Albanian",
    "nativeName": "Shqip"
  },
  "amh": {
    "name": "Amharic",
    "nativeName": "አማርኛ"
  },
  "ara": {
    "name": "Arabic",
    "nativeName": "العربية"
  },
  "arg": {
    "name": "Aragonese",
    "nativeName": "Aragonés"
  },
  "hye": {
    "name": "Armenian",
    "nativeName": "Հայերեն"
  },
  "asm": {
    "name": "Assamese",
    "nativeName": "অসমীয়া"
  },
  "ava": {
    "name": "Avaric",
    "nativeName": "авар мацӀ, магӀарул мацӀ"
  },
  "ave": {
    "name": "Avestan",
    "nativeName": "avesta"
  },
  "aym": {
    "name": "Aymara",
    "nativeName": "aymar aru"
  },
  "aze": {
    "name": "Azerbaijani",
    "nativeName": "azərbaycan dili"
  },
  "bam": {
    "name": "Bambara",
    "nativeName": "bamanankan"
  },
  "bak": {
    "name": "Bashkir",
    "nativeName": "башҡорт теле"
  },
  "eus": {
    "name": "Basque",
    "nativeName": "euskara, euskera"
  },
  "bel": {
    "name": "Belarusian",
    "nativeName": "Беларуская"
  },
  "ben": {
    "name": "Bengali",
    "nativeName": "বাংলা"
  },
  "bis": {
    "name": "Bislama",
    "nativeName": "Bislama"
  },
  "bos": {
    "name": "Bosnian",
    "nativeName": "bosanski jezik"
  },
  "bre": {
    "name": "Breton",
    "nativeName": "brezhoneg"
  },
  "bul": {
    "name": "Bulgarian",
    "nativeName": "български език"
  },
  "mya": {
    "name": "Burmese",
    "nativeName": "ဗမာစာ"
  },
  "cha": {
    "name": "Chamorro",
    "nativeName": "Chamoru"
  },
  "che": {
    "name": "Chechen",
    "nativeName": "нохчийн мотт"
  },
  "zho": {
    "name": "Chinese",
    "nativeName": "中文 (Zhōngwén), 汉语, 漢語"
  },
  "chv": {
    "name": "Chuvash",
    "nativeName": "чӑваш чӗлхи"
  },
  "cor": {
    "name": "Cornish",
    "nativeName": "Kernewek"
  },
  "cos": {
    "name": "Corsican",
    "nativeName": "corsu, lingua corsa"
  },
  "cre": {
    "name": "Cree",
    "nativeName": "ᓀᐦᐃᔭᐍᐏᐣ"
  },
  "hrv": {
    "name": "Croatian",
    "nativeName": "hrvatski"
  },
  "ces": {
    "name": "Czech",
    "nativeName": "česky, čeština"
  },
  "dan": {
    "name": "Danish",
    "nativeName": "dansk"
  },
  "eng": {
    "name": "English",
    "nativeName": "English"
  },
  "epo": {
    "name": "Esperanto",
    "nativeName": "Esperanto"
  },
  "est": {
    "name": "Estonian",
    "nativeName": "eesti, eesti keel"
  },
  "ewe": {
    "name": "Ewe",
    "nativeName": "Eʋegbe"
  },
  "fao": {
    "name": "Faroese",
    "nativeName": "føroyskt"
  },
  "fij": {
    "name": "Fijian",
    "nativeName": "vosa Vakaviti"
  },
  "fin": {
    "name": "Finnish",
    "nativeName": "suomi, suomen kieli"
  },
  "fra": {
    "name": "French",
    "nativeName": "français, langue française"
  },
  "ful": {
    "name": "Fula; Fulah; Pulaar; Pular",
    "nativeName": "Fulfulde, Pulaar, Pular"
  },
  "glg": {
    "name": "Galician",
    "nativeName": "Galego"
  },
  "kat": {
    "name": "Georgian",
    "nativeName": "ქართული"
  },
  "deu": {
    "name": "German",
    "nativeName": "Deutsch"
  },
  "grn": {
    "name": "Guaraní",
    "nativeName": "Avañeẽ"
  },
  "guj": {
    "name": "Gujarati",
    "nativeName": "ગુજરાતી"
  },
  "hau": {
    "name": "Hausa",
    "nativeName": "Hausa, هَوُسَ"
  },
  "heb": {
    "name": "Hebrew (modern)",
    "nativeName": "עברית"
  },
  "her": {
    "name": "Herero",
    "nativeName": "Otjiherero"
  },
  "hin": {
    "name": "Hindi",
    "nativeName": "हिन्दी, हिंदी"
  },
  "hmo": {
    "name": "Hiri Motu",
    "nativeName": "Hiri Motu"
  },
  "hun": {
    "name": "Hungarian",
    "nativeName": "Magyar"
  },
  "ind": {
    "name": "Indonesian",
    "nativeName": "Bahasa Indonesia"
  },
  "gle": {
    "name": "Irish",
    "nativeName": "Gaeilge"
  },
  "ibo": {
    "name": "Igbo",
    "nativeName": "Asụsụ Igbo"
  },
  "ipk": {
    "name": "Inupiaq",
    "nativeName": "Iñupiaq, Iñupiatun"
  },
  "ido": {
    "name": "Ido",
    "nativeName": "Ido"
  },
  "isl": {
    "name": "Icelandic",
    "nativeName": "Íslenska"
  },
  "ita": {
    "name": "Italian",
    "nativeName": "Italiano"
  },
  "iku": {
    "name": "Inuktitut",
    "nativeName": "ᐃᓄᒃᑎᑐᑦ"
  },
  "jpn": {
    "name": "Japanese",
    "nativeName": "日本語 (にほんご／にっぽんご)"
  },
  "jav": {
    "name": "Javanese",
    "nativeName": "basa Jawa"
  },
  "kan": {
    "name": "Kannada",
    "nativeName": "ಕನ್ನಡ"
  },
  "kau": {
    "name": "Kanuri",
    "nativeName": "Kanuri"
  },
  "kas": {
    "name": "Kashmiri",
    "nativeName": "कश्मीरी, كشميري‎"
  },
  "kaz": {
    "name": "Kazakh",
    "nativeName": "Қазақ тілі"
  },
  "kin": {
    "name": "Kinyarwanda",
    "nativeName": "Ikinyarwanda"
  },
  "kom": {
    "name": "Komi",
    "nativeName": "коми кыв"
  },
  "kon": {
    "name": "Kongo",
    "nativeName": "KiKongo"
  },
  "kor": {
    "name": "Korean",
    "nativeName": "한국어 (韓國語), 조선말 (朝鮮語)"
  },
  "kur": {
    "name": "Kurdish",
    "nativeName": "Kurdî, كوردی‎"
  },
  "lat": {
    "name": "Latin",
    "nativeName": "latine, lingua latina"
  },
  "lug": {
    "name": "Luganda",
    "nativeName": "Luganda"
  },
  "lin": {
    "name": "Lingala",
    "nativeName": "Lingála"
  },
  "lao": {
    "name": "Lao",
    "nativeName": "ພາສາລາວ"
  },
  "lit": {
    "name": "Lithuanian",
    "nativeName": "lietuvių kalba"
  },
  "lub": {
    "name": "Luba-Katanga",
    "nativeName": ""
  },
  "lav": {
    "name": "Latvian",
    "nativeName": "latviešu valoda"
  },
  "glv": {
    "name": "Manx",
    "nativeName": "Gaelg, Gailck"
  },
  "mkd": {
    "name": "Macedonian",
    "nativeName": "македонски јазик"
  },
  "mlg": {
    "name": "Malagasy",
    "nativeName": "Malagasy fiteny"
  },
  "msa": {
    "name": "Malay",
    "nativeName": "bahasa Melayu, بهاس ملايو‎"
  },
  "mal": {
    "name": "Malayalam",
    "nativeName": "മലയാളം"
  },
  "mlt": {
    "name": "Maltese",
    "nativeName": "Malti"
  },
  "mri": {
    "name": "Māori",
    "nativeName": "te reo Māori"
  },
  "mar": {
    "name": "Marathi (Marāṭhī)",
    "nativeName": "मराठी"
  },
  "mah": {
    "name": "Marshallese",
    "nativeName": "Kajin M̧ajeļ"
  },
  "mon": {
    "name": "Mongolian",
    "nativeName": "монгол"
  },
  "nau": {
    "name": "Nauru",
    "nativeName": "Ekakairũ Naoero"
  },
  "nob": {
    "name": "Norwegian Bokmål",
    "nativeName": "Norsk bokmål"
  },
  "nde": {
    "name": "North Ndebele",
    "nativeName": "isiNdebele"
  },
  "nep": {
    "name": "Nepali",
    "nativeName": "नेपाली"
  },
  "ndo": {
    "name": "Ndonga",
    "nativeName": "Owambo"
  },
  "nno": {
    "name": "Norwegian Nynorsk",
    "nativeName": "Norsk nynorsk"
  },
  "nor": {
    "name": "Norwegian",
    "nativeName": "Norsk"
  },
  "nbl": {
    "name": "South Ndebele",
    "nativeName": "isiNdebele"
  },
  "oci": {
    "name": "Occitan",
    "nativeName": "Occitan"
  },
  "orm": {
    "name": "Oromo",
    "nativeName": "Afaan Oromoo"
  },
  "ori": {
    "name": "Oriya",
    "nativeName": "ଓଡ଼ିଆ"
  },
  "pli": {
    "name": "Pāli",
    "nativeName": "पाऴि"
  },
  "fas": {
    "name": "Persian",
    "nativeName": "فارسی"
  },
  "pol": {
    "name": "Polish",
    "nativeName": "polski"
  },
  "por": {
    "name": "Portuguese",
    "nativeName": "Português"
  },
  "que": {
    "name": "Quechua",
    "nativeName": "Runa Simi, Kichwa"
  },
  "roh": {
    "name": "Romansh",
    "nativeName": "rumantsch grischun"
  },
  "rus": {
    "name": "Russian",
    "nativeName": "русский язык"
  },
  "san": {
    "name": "Sanskrit (Saṁskṛta)",
    "nativeName": "संस्कृतम्"
  },
  "srd": {
    "name": "Sardinian",
    "nativeName": "sardu"
  },
  "snd": {
    "name": "Sindhi",
    "nativeName": "सिन्धी, سنڌي، سندھی‎"
  },
  "sme": {
    "name": "Northern Sami",
    "nativeName": "Davvisámegiella"
  },
  "smo": {
    "name": "Samoan",
    "nativeName": "gagana faa Samoa"
  },
  "sag": {
    "name": "Sango",
    "nativeName": "yângâ tî sängö"
  },
  "srp": {
    "name": "Serbian",
    "nativeName": "српски језик"
  },
  "sna": {
    "name": "Shona",
    "nativeName": "chiShona"
  },
  "slk": {
    "name": "Slovak",
    "nativeName": "slovenčina"
  },
  "slv": {
    "name": "Slovene",
    "nativeName": "slovenščina"
  },
  "som": {
    "name": "Somali",
    "nativeName": "Soomaaliga, af Soomaali"
  },
  "sot": {
    "name": "Southern Sotho",
    "nativeName": "Sesotho"
  },
  "sun": {
    "name": "Sundanese",
    "nativeName": "Basa Sunda"
  },
  "swa": {
    "name": "Swahili",
    "nativeName": "Kiswahili"
  },
  "ssw": {
    "name": "Swati",
    "nativeName": "SiSwati"
  },
  "swe": {
    "name": "Swedish",
    "nativeName": "svenska"
  },
  "tam": {
    "name": "Tamil",
    "nativeName": "தமிழ்"
  },
  "tel": {
    "name": "Telugu",
    "nativeName": "తెలుగు"
  },
  "tgk": {
    "name": "Tajik",
    "nativeName": "тоҷикӣ, toğikī, تاجیکی‎"
  },
  "tha": {
    "name": "Thai",
    "nativeName": "ไทย"
  },
  "tir": {
    "name": "Tigrinya",
    "nativeName": "ትግርኛ"
  },
  "bod": {
    "name": "Tibetan Standard, Tibetan, Central",
    "nativeName": "བོད་ཡིག"
  },
  "tuk": {
    "name": "Turkmen",
    "nativeName": "Türkmen, Түркмен"
  },
  "tgl": {
    "name": "Tagalog",
    "nativeName": "Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"
  },
  "tsn": {
    "name": "Tswana",
    "nativeName": "Setswana"
  },
  "tur": {
    "name": "Turkish",
    "nativeName": "Türkçe"
  },
  "tso": {
    "name": "Tsonga",
    "nativeName": "Xitsonga"
  },
  "tat": {
    "name": "Tatar",
    "nativeName": "татарча, tatarça, تاتارچا‎"
  },
  "twi": {
    "name": "Twi",
    "nativeName": "Twi"
  },
  "tah": {
    "name": "Tahitian",
    "nativeName": "Reo Tahiti"
  },
  "ukr": {
    "name": "Ukrainian",
    "nativeName": "українська"
  },
  "urd": {
    "name": "Urdu",
    "nativeName": "اردو"
  },
  "uzb": {
    "name": "Uzbek",
    "nativeName": "zbek, Ўзбек, أۇزبېك‎"
  },
  "ven": {
    "name": "Venda",
    "nativeName": "Tshivenḓa"
  },
  "vie": {
    "name": "Vietnamese",
    "nativeName": "Tiếng Việt"
  },
  "vol": {
    "name": "Volapük",
    "nativeName": "Volapük"
  },
  "wln": {
    "name": "Walloon",
    "nativeName": "Walon"
  },
  "cym": {
    "name": "Welsh",
    "nativeName": "Cymraeg"
  },
  "wol": {
    "name": "Wolof",
    "nativeName": "Wollof"
  },
  "fry": {
    "name": "Western Frisian",
    "nativeName": "Frysk"
  },
  "xho": {
    "name": "Xhosa",
    "nativeName": "isiXhosa"
  },
  "yid": {
    "name": "Yiddish",
    "nativeName": "ייִדיש"
  },
  "yor": {
    "name": "Yoruba",
    "nativeName": "Yorùbá"
  }
}


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
      "The uploaded file exceeds the page limit of 25. Please upload a file with fewer pages.",
    code: "ERR_FILE_PAGE_LIMIT",
  },
};
