export const downloadConvertedFile = (
  response: any,
  fileType: string,
  fileName: string,
  downloadBtn: React.RefObject<HTMLAnchorElement>
) => {
  const blob = new Blob([response.data], { type: fileType });
  const url = URL.createObjectURL(blob);
  if (downloadBtn && downloadBtn.current) {
    downloadBtn.current.setAttribute("download", fileName);
    downloadBtn.current.href = url;
  }
};
