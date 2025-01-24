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
    title: "Asistente de PDF",
    seoTitle: "Asistente de PDF con IA - Mejora tu experiencia con PDF",
    description: "Asistente impulsado por IA para realizar tareas avanzadas de PDF sin esfuerzo.",
    color: "#38ada9",
    type: ".pdf",
    to: "/pdf-assistant",
    features: [
      {
        title: "Tareas impulsadas por IA",
        description: "Aprovecha la IA para realizar tus tareas de PDF, extraer datos, resumir contenido y más."
      },
      {
        title: "Automatización que ahorra tiempo",
        description: "Optimiza tu flujo de trabajo con automatización inteligente para operaciones complejas de PDF."
      },
      {
        title: "Solución todo en uno",
        description: "Accede a un conjunto completo de herramientas PDF en una plataforma fácil de usar."
      }
    ],
    keywords: "asistente de PDF con IA, herramienta de funciones PDF, asistente de IA para herramientas PDF, resumen de PDF, extracción de datos de PDF, automatización de tareas PDF, asistente de PDF inteligente, operaciones avanzadas de PDF, soluciones PDF interactivas"
  },
};

export const pageProps: SeoProps = {
  title: "PDFEquips | Tu Asistente de PDF con IA",
  description: "PDFEquips simplifica tus tareas de PDF con IA. Divide PDFs por capítulos, obtén resúmenes, extrae datos y más. ¡Tu asistente definitivo para PDFs está aquí!",
  canonical: "https://www.pdfequips.com",
  image: "https://www.pdfequips.com/images/pdf-assistant-es.png",
  images: [
    {
      url: "https://www.pdfequips.com/assets/images/pdf-assistant-es.png",
      width: 1200,
      height: 630,
      alt: "PDFEquips - Tu Asistente de PDF con IA",
    },
  ],
  lang: "es",
  keywords: [
    "Asistente de PDF",
    "Herramientas PDF con IA",
    "dividir PDF por capítulos",
    "resumidor de PDF",
    "Chatbot PDF con IA",
    "Procesamiento de PDF",
    "PDFEquips",
    "Editor PDF impulsado por IA",
  ],
  noindex: false,
  nofollow: false,
  type: "website",
  locale: "es_ES",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PDFEquips",
      description:
        "Un asistente PDF impulsado por IA que realiza tareas como dividir PDFs, resumir contenido y extraer datos.",
      applicationCategory: "Productivity",
      operatingSystem: "All",
      url: "https://www.pdfequips.com",
      image: "https://www.pdfequips.com/assets/images/pdf-assistant-es.png",
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
  select: "Seleccionar",
  or_drop: "o soltar archivos aquí",
  files: "archivos",
  drop_files: "Arrastra los archivos aquí",
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    merge_pages: "Opciones de fusión de páginas",
  },
  loader_text: "por favor espere...",
  add_more_button: "Agregar más páginas",
  action_buttons: {
    merge_pages: "Fusionar páginas",
  },
  pages: "páginas",
  page: "página",
  options: {
    info: "Seleccione una disposición de página del menú desplegable a continuación. Esto determinará cómo se organizan las páginas en el documento PDF combinado.",
    placeholder: "Seleccione disposición de página"
  }
};

export const downloadFile: _downloadFile = {
  titles: {
    "merge-pages": ["¡Las páginas PDF han sido fusionadas!", "¡La página PDF ha sido fusionada!"],
  },

  btnText: {
    "merge-pages": ["Descargar páginas PDF fusionadas", "Descargar página PDF fusionada"],
  },

  backto: {
    "merge-pages": "Volver a Fusionar páginas",
  },
};

export const footer: _footer = {
  brand: "PDFEquips",
  terms: "términos",
  conditions: "condiciones",
  privacy_policy: "política de privacidad",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "El archivo está vacío. Por favor, elija un archivo válido.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "El archivo es demasiado grande. Por favor, elija un archivo más pequeño o use nuestra herramienta de compresión de PDF para reducir el tamaño del archivo.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "El archivo no es un tipo compatible.",
    types: {
      PDF: "Por favor, elija un archivo PDF válido.",
      JPG: "Por favor, elija un archivo de imagen JPEG válido.",
      DOC: "Por favor, elija un archivo de documento de Word válido.",
      DOCX: "Por favor, elija un archivo de documento de Word válido.",
      XLS: "Por favor, elija un archivo de hoja de cálculo de Excel válido.",
      XLSX: "Por favor, elija un archivo de hoja de cálculo de Excel válido.",
      PPT: "Por favor, elija un archivo de presentación de PowerPoint válido.",
      PPTX: "Por favor, elija un archivo de presentación de PowerPoint válido.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "El archivo estácorrupto y no se puede procesar. Por favor, elija un archivo válido.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "El archivo contiene fuentes faltantes. Por favor, asegúrese de que todas las fuentes estén incrustadas en el archivo PDF.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "El archivo contiene datos de imagen no válidos. Por favor, asegúrese de que todas las imágenes estén correctamente formateadas.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  SECURITY_RISK: {
    message:
      "El archivo contiene un riesgo de seguridad y no se puede procesar. Por favor, elija un archivo válido.",
    code: "ERR_SECURITY_RISK",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "Ha excedido el número máximo de archivos permitidos. Por favor, elimine algunos archivos e intente nuevamente.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message:
      "No se han seleccionado archivos. Por favor, seleccione al menos un archivo.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "Ha ocurrido un error desconocido. Por favor, inténtelo de nuevo más tarde o contacte al soporte.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "Ha ocurrido un error en la red. Por favor, comprueba tu conexión a internet e inténtalo de nuevo.",
    code: "ERR_NETWORK",
  },
  ERR_UPLOAD_COUNT: {
    message: "Por favor, suba al menos dos archivos para fusionar.",
    code: "ERR_UPLOAD_COUNT",
  },
};
