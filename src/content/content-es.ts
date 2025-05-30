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
    to: "assistant",
    features: [
      {
        title: "Tareas impulsadas por IA",
        description: "Aprovecha la IA para hacer tus tareas con PDF, extraer datos, resumir contenido, convertir a PDF y mucho más."
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
  description: "PDFEquips simplifica tus tareas con PDF. Genera PDF usando IA, obtén resúmenes, extrae datos y mucho más. ¡Tu asistente de PDF está aquí!",
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
    assistant: "Opciones del asistente PDF",
  },
  loader_text: "por favor espera...",
  add_more_button: "Agregar más páginas",
  action_buttons: {
    assistant: "Procesar documento",
  },
  pages: "páginas",
  page: "página",
  options: {
    info: "Agrega tu indicación",
    select_placeholder: "¿Qué te gustaría hacer?",
    placeholder: "Mensaje para el asistente PDFEquips",
    placeholders: {
      script: "extrae la segunda página como un archivo PDF...",
      content: "¿Cuál es la idea principal de este documento?",
      generate: "crea un currículum basado en mis datos adjuntos."
    },
    labels: {
      script: "Realiza una tarea",
      content: "Pregunta sobre tu documento",
      generate: "Crea un documento",
      advancedSearch: "Búsqueda avanzada"
    },
    ocr_placeholder: "Seleccionar idiomas",
    ocr_warning: "Agrega el idioma del documento para obtener resultados más precisos."
  },
};

export const downloadFile: _downloadFile = {
  titles: {
    "assistant": ["¡Tu tarea se ha completado con éxito!", "¡Tus tareas se han completado con éxito!"],
  },

  btnText: {
    "assistant": ["Descargar archivo procesado", "Descargar archivos procesados"],
  },

  backto: {
    "assistant": "Volver al asistente PDF",
  },
  htmlViewerContent: {
    chatAreaTooltipContent: {
      search: "Búsqueda avanzada y razonamiento",
      textarea: "Escribe tu mensaje aquí",
      submit: "Enviar mensaje",
    },
    downloadOptions: {
      downloadOptions: "Opciones de descarga",
      pdfDownloadOptions: "Opciones de descarga de PDF",
      layout: "Diseño",
      portrait: "Vertical",
      landscape: "Horizontal",
      paperSize: "Tamaño del papel",
      scale: "Escala",
      margins: "Márgenes",
      default: "Predeterminado",
      none: "Ninguno",
      minimal: "Mínimo",
      custom: "Personalizado",
      customMarginsTitle: "Márgenes personalizados",
      customMarginsUnit: "mm",
      top: "Superior",
      right: "Derecha",
      bottom: "Inferior",
      left: "Izquierda",
      doubleSided: "Impresión a doble cara",
      doubleSidedDesc: "Imprimir en ambos lados de la página",
      fileName: "Nombre del archivo",
      fileNamePlaceholder: "Introduce el nombre del archivo...",
      cancel: "Cancelar",
      save: "Guardar"
    },
    floatingDownloadBtnContent: {
      downloading: "Descargando...",
      complete: "Descarga completada",
      default: "Descargar"
    }
  }
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
  ERR_MAX_USAGE: {
    message: "Se ha excedido el uso máximo. Por favor, actualice o suscríbase para continuar utilizando este servicio.",
    code: "ERR_MAX_USAGE",
  },
  ERR_FILE_PAGE_LIMIT: {
    message: "El archivo cargado excede el límite de páginas de 25. Por favor, cargue un archivo con menos páginas.",
    code: "ERR_FILE_PAGE_LIMIT",
  },
};
