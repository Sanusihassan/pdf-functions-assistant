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
    title: "Assistant PDF",
    seoTitle: "Assistant PDF IA - Améliorez votre expérience PDF",
    description: "Assistant alimenté par l'IA pour effectuer des tâches PDF avancées sans effort.",
    color: "#38ada9",
    type: ".pdf",
    to: "pdf-assistant",
    features: [
      {
        title: "Tâches pilotées par IA",
        description: "Utilisez l'IA pour effectuer vos tâches PDF, extraire des données, résumer du contenu, et bien plus."
      },
      {
        title: "Automatisation gain de temps",
        description: "Simplifiez votre flux de travail grâce à une automatisation intelligente pour des opérations PDF complexes."
      },
      {
        title: "Solution tout-en-un",
        description: "Accédez à une suite complète d'outils PDF sur une plateforme conviviale."
      }
    ],
    keywords: "assistant PDF IA, outil de fonctions PDF, assistant intelligent PDF, résumé PDF, extraction de données PDF, automatisation des tâches PDF, assistant PDF en ligne, opérations PDF avancées, solutions PDF interactives"
  },
};

export const pageProps: SeoProps = {
  title: "PDFEquips | Votre Assistant PDF Alimenté par IA",
  description: "PDFEquips simplifie vos tâches PDF grâce à l'IA. Divisez des PDF par chapitres, obtenez des résumés, extrayez des données, et plus encore. Votre assistant PDF ultime est ici !",
  canonical: "https://www.pdfequips.com",
  image: "https://www.pdfequips.com/images/pdf-assistant-fr.png",
  images: [
    {
      url: "https://www.pdfequips.com/assets/images/pdf-assistant-fr.png",
      width: 1200,
      height: 630,
      alt: "PDFEquips - Votre Assistant PDF Alimenté par IA",
    },
  ],
  lang: "fr",
  keywords: [
    "Assistant PDF",
    "Outils PDF IA",
    "diviser PDF par chapitre",
    "Résumé PDF",
    "Chatbot PDF IA",
    "Traitement PDF",
    "PDFEquips",
    "Éditeur PDF avec IA",
  ],
  noindex: false,
  nofollow: false,
  type: "website",
  locale: "fr_FR",
  structuredData: [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PDFEquips",
      description:
        "Un assistant PDF alimenté par IA qui effectue des tâches comme diviser des PDFs, résumer le contenu et extraire des données.",
      applicationCategory: "Productivity",
      operatingSystem: "All",
      url: "https://www.pdfequips.com",
      image: "https://www.pdfequips.com/assets/images/pdf-assistant-fr.png",
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
  select: "Sélectionner",
  or_drop: "ou déposer des fichiers ici",
  files: "fichiers",
  drop_files: "Déposez les fichiers ici",
};

export const edit_page: _edit_page = {
  edit_page_titles: {
    pdf_assistant: "Options de l'assistant PDF",
  },
  loader_text: "veuillez patienter...",
  add_more_button: "Ajouter plus de pages",
  action_buttons: {
    pdf_assistant: "Traiter le document",
  },
  pages: "pages",
  page: "page",
  options: {
    info: "Ajoutez votre demande",
    select_placeholder: "Que souhaitez-vous faire ?",
    placeholder: "Message de l'assistant PDFEquips",
    placeholders: {
      script: "extrait la deuxième page sous forme de fichier PDF...",
      content: "Quelle est l'idée principale de ce document ?",
      generate: "créez un CV basé sur mes données jointes."
    },
    labels: {
      script: "Effectuez une tâche",
      content: "Posez des questions sur votre document",
      generate: "Créez un document"
    }
  },
};

export const downloadFile: _downloadFile = {
  titles: {
    "pdf-assistant": ["Votre tâche a été réalisée avec succès !", "Vos tâches ont été réalisées avec succès !"],
  },

  btnText: {
    "pdf-assistant": ["Télécharger le fichier traité", "Télécharger les fichiers traités"],
  },

  backto: {
    "pdf-assistant": "Retour à l'assistant PDF",
  },
};


export const footer: _footer = {
  brand: "PDFEquips",
  terms: "conditions",
  conditions: "conditions d'utilisation",
  privacy_policy: "politique de confidentialité",
};

export const errors: _errors = {
  EMPTY_FILE: {
    message: "Le fichier est vide. Veuillez choisir un fichier valide.",
    code: "ERR_EMPTY_FILE",
  },
  FILE_TOO_LARGE: {
    message:
      "Le fichier est trop volumineux. Veuillez choisir un fichier plus petit ou utiliser notre outil de compression PDF pour réduire la taille du fichier.",
    code: "ERR_FILE_SIZE_LIMIT_EXCEEDED",
  },
  NOT_SUPPORTED_TYPE: {
    message: "Le fichier n'est pas d'un type pris en charge.",
    types: {
      PDF: "Veuillez choisir un fichier PDF valide.",
      JPG: "Veuillez choisir un fichier d'image JPEG valide.",
      DOC: "Veuillez choisir un fichier de document Word valide.",
      DOCX: "Veuillez choisir un fichier de document Word valide.",
      XLS: "Veuillez choisir un fichier de feuille de calcul Excel valide.",
      XLSX: "Veuillez choisir un fichier de feuille de calcul Excel valide.",
      PPT: "Veuillez choisir un fichier de présentation PowerPoint valide.",
      PPTX: "Veuillez choisir un fichier de présentation PowerPoint valide.",
    },
    code: "ERR_INVALID_FILE_TYPE",
  },
  FILE_CORRUPT: {
    message:
      "Le fichier est corrompu et ne peut pas être traité. Veuillez choisir un fichier valide.",
    code: "ERR_FILE_CORRUPT",
  },
  MISSING_FONTS: {
    message:
      "Le fichier contient des polices manquantes. Veuillez vous assurer que toutes les polices sont intégrées dans le fichier PDF.",
    code: "ERR_MISSING_FONTS",
  },
  INVALID_IMAGE_DATA: {
    message:
      "Le fichier contient des données d'image non valides. Veuillez vous assurer que toutes les images sont correctement formatées.",
    code: "ERR_INVALID_IMAGE_DATA",
  },
  MAX_FILES_EXCEEDED: {
    message:
      "Vous avez dépassé le nombre maximal de fichiers autorisés. Veuillez supprimer certains fichiers et réessayer.",
    code: "ERR_MAX_FILES_EXCEEDED",
  },
  NO_FILES_SELECTED: {
    message:
      "Aucun fichier sélectionné. Veuillez sélectionner au moins un fichier.",
    code: "ERR_NO_FILES_SELECTED",
  },
  UNKNOWN_ERROR: {
    message:
      "Une erreur inconnue s'est produite. Veuillez réessayer plus tard ou contacter le support.",
    code: "ERR_UNKNOWN",
  },
  ERR_NETWORK: {
    message:
      "Une erreur de réseau s'est produite. Veuillez vérifier votre connexion Internet et réessayer.",
    code: "ERR_NETWORK",
  },
  ERR_MAX_USAGE: {
    message: "Utilisation maximale dépassée. Veuillez mettre à niveau ou vous abonner pour continuer à utiliser ce service.",
    code: "ERR_MAX_USAGE",
  },
  ERR_FILE_PAGE_LIMIT: {
    message: "Le fichier téléchargé dépasse la limite de 10 pages. Veuillez télécharger un fichier contenant moins de pages.",
    code: "ERR_FILE_PAGE_LIMIT",
  },
};
