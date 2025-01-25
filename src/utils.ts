import { useEffect, useMemo, useState } from "react";
import { type Action, type Dispatch } from "@reduxjs/toolkit";
import type { errors as _ } from "./content";
import { setField } from "./store";
import * as pdfjs from "pdfjs-dist";
import { getDocument, type PDFDocumentProxy, type PageViewport, type RenderTask } from "pdfjs-dist";
import { canUseSiteToday, fetchSubscriptionStatus } from "fetch-subscription-status";

// @ts-ignore
// how can i optimize this using partytown? this is included in a astro.js app
const pdfjsWorker = await import("pdfjs-dist/build/pdf.worker.min.mjs");
// pdfjs.GlobalWorkerOptions = pdfjs.GlobalWorkerOptions || {};
// pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

export function useLoadedImage(src: string): HTMLImageElement | null {
  const [loadedImage, setLoadedImage] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setLoadedImage(img);
  }, [src]);

  return loadedImage;
}
export function useRotatedImage(imageUrl: string): string | null {
  const image = useLoadedImage(imageUrl);

  return useMemo(() => {
    if (!image) return null;

    const canvas = document.createElement("canvas");
    canvas.width = image.height;
    canvas.height = image.width;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((90 * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);
    return canvas.toDataURL();
  }, [image]);
}

const DEFAULT_PDF_IMAGE = "/images/corrupted.png";
function emptyPDFHandler(dispatch: Dispatch<Action>, errors: _) {
  dispatch(setField({ errorMessage: errors.EMPTY_FILE.message }));
  dispatch(setField({ errorCode: "ERR_EMPTY_FILE" }));
  return DEFAULT_PDF_IMAGE;
}
// i don't know why but when i pass any other file type except images or pdfs this function will cause the application to crash by entering an infinite loop
export const getFileDetailsTooltipContent = async (
  file: File,
  pages: string,
  page: string,
  lang: string,
  dispatch: Dispatch<Action>,
  errors: _
): Promise<string> => {
  const sizeInBytes = file.size;
  let size: string = "";
  let isoCode = lang === "fr" ? "fr-FR" : lang == "" ? "en" : lang;
  size = new Intl.NumberFormat(isoCode, {
    notation: "compact",
    style: "unit",
    unit: "byte",
    unitDisplay: "narrow",
  }).format(sizeInBytes);
  let tooltipContent = "<bdi>" + size;
  if (file.size === 0) {
    emptyPDFHandler(dispatch, errors);
    throw Error("ERROR: FILE_SIZE_ZERO");
  } else {
    if (
      file.type !== "image/png" &&
      file.type !== "image/jpeg" &&
      file.type !== "application/pdf"
    ) {
      return tooltipContent;
    }
    try {
      if (file.type === "image/jpeg" || file.type === "image/png") {
        const image = new Image();
        image.src = URL.createObjectURL(file);
        await new Promise<void>((resolve) => {
          image.onload = () => {
            tooltipContent += `</bdi> - <bdi>${image.width} x ${image.height}</bdi>`;
            resolve();
          };
        });
      } else if (file.type === "application/pdf") {
        const url = URL.createObjectURL(file);
        const pdf = await pdfjs.getDocument(url).promise;

        const pageCount = pdf.numPages || 0;
        if (pageCount === 2 && lang === "ar") {
          tooltipContent += " - صفحتين</bdi>";
        } else {
          tooltipContent += ` - ${lang === "ar" && pageCount === 1 ? "" : pageCount + " "
            }${pageCount > 1 ? pages : page}</bdi>`;
        }
        URL.revokeObjectURL(url);
        if (!file.size) {
          emptyPDFHandler(dispatch, errors);
        }
      }
    } catch (e) {
      if (!file.size) {
        emptyPDFHandler(dispatch, errors);
      }
    }
  }

  return tooltipContent;
};

/**
 * this is the current function and it's working,
 * but i want to display the pdf.png file while fetching the first page from the pdf
 */

export async function getFirstPageAsImage(
  file: File,
  dispatch: Dispatch<Action>,
  errors: _
): Promise<string> {
  const fileUrl = URL.createObjectURL(file);
  if (!file.size) {
    return emptyPDFHandler(dispatch, errors);
  } else {
    try {
      const loadingTask = pdfjs.getDocument(fileUrl);
      const pdf: PDFDocumentProxy = await loadingTask.promise;
      const page = await pdf.getPage(1); // Get the first page

      const scale = 1.5;
      const viewport: PageViewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas context not available.");
      }
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderTask: RenderTask = page.render({
        canvasContext: context,
        viewport: viewport,
      });

      await renderTask.promise;

      return canvas.toDataURL();
    } catch (error) {
      dispatch(setField({ errorMessage: errors.FILE_CORRUPT.message }));

      return DEFAULT_PDF_IMAGE; // Return the placeholder image URL when an error occurs
    }
  }
}

export const getPlaceHoderImageUrl = (extension: string) => {
  switch (extension) {
    case ".docx":
      return "/images/word.png";
    case ".html":
      return "/images/html.png";
    case ".pptx":
      return "/images/powerpoint.png";
    case ".xlsx":
      return "/images/excel.png";
    default:
      return "images/pdf.png";
  }
};

// a function to check if the extension is .jpg or .pdf:
export const isDraggableExtension = (ext: string, asPath: string) => {
  return ext === ".jpg" || asPath.includes("merge-pdf");
};
export const validateFiles = async (
  _files: FileList | File[],
  extension: string,
  errors: _,
  dispatch: Dispatch<Action>,
  state: {
    path: string;
  }
) => {
  const files = Array.from(_files); // convert FileList to File[] array
  const status = await fetchSubscriptionStatus();
  if (!canUseSiteToday(10) && !status) {
    dispatch(setField({ errorMessage: errors.ERR_MAX_USAGE.message }));
    dispatch(setField({ errorCode: "ERR_MAX_USAGE" }));
    return false;
  }

  const pageCount = await calculatePages(files[0]);
  if (pageCount > 10) {
    dispatch(setField({ errorMessage: errors.ERR_FILE_PAGE_LIMIT.message }));
    dispatch(setField({ errorCode: "ERR_FILE_PAGE_LIMIT" }));
    return false;
  }

  let allowedMimeTypes = [
    "application/pdf",
    "text/html",
    "image/jpeg",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.ms-powerpoint",
    "application/vnd.ms-excel",
  ];

  if (files.length == 0) {
    dispatch(setField({ errorMessage: errors.NO_FILES_SELECTED.message }));
    dispatch(setField({ errorCode: "ERR_NO_FILES_SELECTED" }));
    return false;
  }
  const fileSizeLimit = 50 * 1024 * 1024; // 50 MB
  for (let i = 0; i < files.length; i++) {
    const file = files[i] || null;
    extension = extension.replace(".", "").toUpperCase();
    let file_extension = file.name.split(".").pop()?.toUpperCase() || "";
    // this contains all types and some special types that might potentially be of than one extension
    const types = [
      "ppt",
      "pptx",
      "doc",
      "docx",
      "xls",
      "xlsx",
      "html",
      "htm",
      "jpg",
      "pdf",
    ];

    if (!file || !file.name) {
      // handle FILE_CORRUPT error
      dispatch(setField({ errorMessage: errors.FILE_CORRUPT.message }));
      return false;
    } else if (!file.type) {
      // handle NOT_SUPPORTED_TYPE error
      dispatch(setField({ errorMessage: errors.NOT_SUPPORTED_TYPE.message }));
      return false;
    } else if (
      !allowedMimeTypes.includes(file.type) ||
      !types.includes(file_extension.toLowerCase())
    ) {
      const errorMessage =
        errors.NOT_SUPPORTED_TYPE.types[
        extension as keyof typeof errors.NOT_SUPPORTED_TYPE.types
        ] || errors.NOT_SUPPORTED_TYPE.message;
      dispatch(setField({ errorMessage: errorMessage }));
      return false;
    } else if (file.size > fileSizeLimit) {
      // handle FILE_TOO_LARGE error
      dispatch(setField({ errorMessage: errors.FILE_TOO_LARGE.message }));
      return false;
    } else if (!file.size) {
      // handle EMPTY_FILE error

      dispatch(setField({ errorMessage: errors.EMPTY_FILE.message }));
      dispatch(setField({ errorCode: "ERR_EMPTY_FILE" }));
      return false;
    } else if (file.type.startsWith("image/")) {
      // handle INVALID_IMAGE_DATA error
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result as string;
        img.onerror = () => {
          dispatch(
            setField({ errorMessage: errors.INVALID_IMAGE_DATA.message })
          );
          return false;
        };
      };
      return true;
    }
  }
  return true;
};

interface PDFFile extends Blob {
  name: string;
}

export async function calculatePages(file: PDFFile): Promise<number> {
  const reader = new FileReader();
  reader.readAsArrayBuffer(file);
  return new Promise<number>((resolve, reject) => {
    reader.onload = async (event) => {
      try {
        const typedArray = new Uint8Array(event.target?.result as ArrayBuffer);
        const pdf = await pdfjs.getDocument(typedArray).promise;
        resolve(pdf.numPages);
      } catch (error) {
        reject(error);
      }
    };
  });
}


export async function getNthPageAsImage(
  file: File,
  dispatch: Dispatch<Action>,
  errors: _,
  pageNumber: number
): Promise<string> {
  const fileUrl = URL.createObjectURL(file);
  if (!file.size) {
    return emptyPDFHandler(dispatch, errors);
  } else {
    try {
      const loadingTask = pdfjs.getDocument(fileUrl);
      const pdf: PDFDocumentProxy = await loadingTask.promise;
      const page = await pdf.getPage(pageNumber); // Get the Nth page

      const scale = 1.5;
      const viewport: PageViewport = page.getViewport({ scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas context not available.");
      }
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderTask: RenderTask = page.render({
        canvasContext: context,
        viewport: viewport,
      });

      await renderTask.promise;

      return canvas.toDataURL();
    } catch (error) {
      // dispatch(setField({ errorMessage: errors.FILE_CORRUPT.message}));

      return DEFAULT_PDF_IMAGE; // Return the placeholder image URL when an error occurs
    }
  }
}





export async function analyzePDF(pdfFile) {
  try {
    // Load PDF from File or Blob object
    const data = await pdfFile.arrayBuffer();
    const pdf = await pdfjs.getDocument({ data }).promise;

    let totalPages = pdf.numPages;
    let textContent = '';
    let imageCount = 0;
    let totalArea = 0;
    let imageArea = 0;

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      // Get page text content
      const content = await page.getTextContent();
      textContent += content.items.map(item => 'str' in item ? item.str : '').join(' ');

      // Get page operations (including images)
      const ops = await page.getOperatorList();
      const viewport = page.getViewport({ scale: 1.0 });
      totalArea += viewport.width * viewport.height;

      // Count and analyze images
      for (let i = 0; i < ops.fnArray.length; i++) {
        if (ops.fnArray[i] === pdfjs.OPS.paintImageXObject ||
          ops.fnArray[i] === pdfjs.OPS.paintInlineImageXObject) {
          imageCount++;
          // Estimate image area (this is approximate)
          const args = ops.argsArray[i];
          if (args && args.length >= 2) {
            imageArea += (args[0] * args[1]); // width * height
          }
        }
      }
    }

    // Analysis criteria
    const textLength = textContent.trim().length;
    const imageRatio = imageArea / totalArea;
    const wordsPerPage = textContent.split(/\s+/).length / totalPages;

    // Calculate confidence score (0-1)
    let confidence = 0;

    if (imageRatio > 0.5 && wordsPerPage < 50) {
      confidence += 0.4;
    }
    if (textLength < 100 && imageCount > 0) {
      confidence += 0.3;
    }
    if (imageCount >= totalPages) {
      confidence += 0.3;
    }

    // Additional heuristics
    const hasRegularTextStructure = /^[A-Za-z0-9\s.,!?-]+$/.test(textContent);
    if (!hasRegularTextStructure && imageCount > 0) {
      confidence += 0.2;
    }

    // Normalize confidence to 0-1
    confidence = Math.min(1, confidence);

    return {
      scanned: confidence > 0.6, // Consider it scanned if confidence > 60%
      confidence
    };
  } catch (error) {
    console.error('Error analyzing PDF:', error);
    throw error;
  }
}