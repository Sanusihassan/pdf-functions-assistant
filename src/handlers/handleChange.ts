// @ts-ignore
import { type Action, type Dispatch } from "@reduxjs/toolkit";
import type { errors as _ } from "../content/content"; // import the errors constant

import { validateFiles } from "../utils";
import { setField, resetErrorMessage } from "../store";
export const handleChange = async (
  e: React.ChangeEvent<HTMLInputElement>,
  dispatch: Dispatch<Action>,
  setFiles: (files: FileList | File[]) => void,
  errors: typeof _,
  files: File[],
  state: {
    path: string;
  }
) => {
  const _files = (e.target?.files as FileList) || null;
  setFiles([...files, ...Array.from(!_files ? [] : _files)]);

  const fileNameParts = _files[0].name.split('.');
  const extension = fileNameParts.length > 1
    ? `.${fileNameParts.pop()?.toLowerCase()}`
    : '';
  const isValid = await validateFiles(_files, extension, errors, dispatch, state);
  if (isValid && files) {
    dispatch(setField({ showTool: false }));
    dispatch(resetErrorMessage());
  }
};
