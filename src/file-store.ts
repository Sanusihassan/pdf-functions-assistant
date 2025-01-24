import type { Dispatch, SetStateAction, RefObject } from "react";
import { create } from "zustand";

export interface FileStore {
  files: File[];
  fileInput: RefObject<HTMLInputElement> | null;
  submitBtn: React.RefObject<HTMLButtonElement> | null;
  downloadBtn: React.RefObject<HTMLAnchorElement> | null;
  filesOnSubmit: string[];
  imageUrls: {
    file: File;
    imageUrl: string;
  }[];
  setFiles: (files: FileList | File[]) => void;
  setFileInput: (refEl: RefObject<HTMLInputElement> | null) => void;
  setSubmitBtn: (refEl: React.RefObject<HTMLButtonElement> | null) => void;
  setDownloadBtn: (refEl: React.RefObject<HTMLAnchorElement> | null) => void;
  setImageUrls: Dispatch<
    SetStateAction<
      {
        file: File;
        imageUrl: string;
      }[]
    >
  >;
  setFilesOnSubmit(value: string[]): void;
}

export const useFileStore = create<FileStore>((set) => ({
  files: [],
  fileInput: null,
  downloadBtn: null,
  submitBtn: null,
  imageUrls: [],
  filesOnSubmit: [],
  setFiles: (files: FileList | File[]) => {
    const uniqueFiles = new Set<File>();

    if (files instanceof FileList) {
      Array.from(files).forEach((file) => uniqueFiles.add(file));
    } else {
      files.forEach((file) => uniqueFiles.add(file));
    }

    set({ files: Array.from(uniqueFiles) });
  },
  setFileInput(refEl: RefObject<HTMLInputElement> | null) {
    set({ fileInput: refEl });
  },
  setSubmitBtn(refEl: React.RefObject<HTMLButtonElement> | null) {
    set({ submitBtn: refEl });
  },
  setDownloadBtn(refEl: React.RefObject<HTMLAnchorElement> | null) {
    set({ downloadBtn: refEl });
  },
  setImageUrls(value: SetStateAction<{ file: File; imageUrl: string }[]>) {
    set((prevState) => ({
      imageUrls:
        typeof value === "function" ? value(prevState.imageUrls) : value,
    }));
  },
  setFilesOnSubmit(value: string[]) {
    set({ filesOnSubmit: value });
  },
}));
