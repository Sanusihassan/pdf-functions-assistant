import type { RefObject } from "react";

export const downloadConvertedFile = (
  response: any,
  fileType: string,
  fileName: string,
  downloadBtn: RefObject<HTMLAnchorElement | null>
) => {
  const blob = new Blob([response.data], { type: fileType });
  const url = URL.createObjectURL(blob);
  if (downloadBtn && downloadBtn.current) {
    downloadBtn.current.setAttribute("download", fileName);
    downloadBtn.current.href = url;
  }
};
