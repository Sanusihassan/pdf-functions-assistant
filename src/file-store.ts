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
  setFilesOnSubmit: (value: string[]) => void;
  clearImageUrls: () => void;
  removeFile: (fileToRemove: File) => void;
  clearFiles: () => void;
}

export const useFileStore = create<FileStore>((set, get) => ({
  files: [],
  fileInput: null,
  downloadBtn: null,
  submitBtn: null,
  imageUrls: [],
  filesOnSubmit: [],

  setFiles: (files: FileList | File[]) => {
    const fileArray = files instanceof FileList ? Array.from(files) : files;

    // Deduplicate by name + size + lastModified (reasonable proxy for content)
    const uniqueFiles = fileArray.filter((file, index, arr) =>
      arr.findIndex(f =>
        f.name === file.name &&
        f.size === file.size &&
        f.lastModified === file.lastModified
      ) === index
    );

    set({ files: uniqueFiles });
  },

  setFileInput: (refEl: RefObject<HTMLInputElement> | null) => {
    set({ fileInput: refEl });
  },

  setSubmitBtn: (refEl: React.RefObject<HTMLButtonElement> | null) => {
    set({ submitBtn: refEl });
  },

  setDownloadBtn: (refEl: React.RefObject<HTMLAnchorElement> | null) => {
    set({ downloadBtn: refEl });
  },

  setImageUrls: (value: SetStateAction<{ file: File; imageUrl: string }[]>) => {
    set((prevState) => ({
      imageUrls:
        typeof value === "function" ? value(prevState.imageUrls) : value,
    }));
  },

  setFilesOnSubmit: (value: string[]) => {
    set({ filesOnSubmit: value });
  },

  clearImageUrls: () => {
    const { imageUrls } = get();
    // Clean up object URLs to prevent memory leaks
    imageUrls.forEach(({ imageUrl }) => {
      URL.revokeObjectURL(imageUrl);
    });
    set({ imageUrls: [] });
  },

  removeFile: (fileToRemove: File) => {
    set((state) => ({
      files: state.files.filter(file =>
        !(file.name === fileToRemove.name &&
          file.size === fileToRemove.size &&
          file.lastModified === fileToRemove.lastModified)
      )
    }));

    // Also remove associated image URL if it exists
    const { imageUrls } = get();
    const associatedImageUrl = imageUrls.find(({ file }) =>
      file.name === fileToRemove.name &&
      file.size === fileToRemove.size &&
      file.lastModified === fileToRemove.lastModified
    );

    if (associatedImageUrl) {
      URL.revokeObjectURL(associatedImageUrl.imageUrl);
      set((state) => ({
        imageUrls: state.imageUrls.filter(({ file }) =>
          !(file.name === fileToRemove.name &&
            file.size === fileToRemove.size &&
            file.lastModified === fileToRemove.lastModified)
        )
      }));
    }
  },

  clearFiles: () => {
    // Clean up all image URLs first
    const { imageUrls } = get();
    imageUrls.forEach(({ imageUrl }) => {
      URL.revokeObjectURL(imageUrl);
    });

    set({
      files: [],
      imageUrls: [],
      filesOnSubmit: []
    });
  },
}));