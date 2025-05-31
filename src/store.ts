import { createSlice, type Draft, type PayloadAction } from "@reduxjs/toolkit";
import type { SubscriptionPlan, SubscriptionStatus } from "fetch-subscription-status";
type WritableDraft<T> = {
  -readonly [K in keyof T]: Draft<T[K]>;
};

type k = keyof WritableDraft<ToolState>;
interface SubscriptionData {
  id: string;
  userId: string;
  paddleSubscriptionId: string;
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date;
  canceledAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
// i want an interface for editing an object of this type
interface DownloadOptionsState {
  layout: 'portrait' | 'landscape';
  paperSize: string;
  scale: number;
  margin: 'default' | 'none' | 'minimal' | 'custom';
  customMargins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  duplex: boolean;
  fileName: string
}

// this is a tsx component for options for downloading a PDF file [inputs], the interface would be triggered by a floating options btn, my main theme color: #38ada9;

export interface ToolState {
  showTool: boolean;
  isSubmitted: boolean;
  errorMessage: string;
  showErrorMessage: boolean;
  errorCode: string | null;
  showDownloadBtn: boolean;
  showOptions: boolean;
  nav_height: number;
  prompt: string;
  isScanned: boolean;
  pageCount: number;
  mdResponse: string;
  htmlResponse: string;
  strategy: "script" | "content" | "generate" | null,
  selectedLanguages: string[];
  subscriptionAndStatus: { subscription: SubscriptionData | null, status: boolean } | null;
  showStyleTools: boolean;
  showChatTextArea: boolean;
  advancedSearch: boolean;
  headSection: string;
  message: string | null;
  downloadOptions: DownloadOptionsState | null;
  lang: string | null;
}

const initialState: ToolState = {
  showTool: true,
  errorMessage: "",
  showErrorMessage: false,
  isSubmitted: false,
  errorCode: null,
  showDownloadBtn: false,
  showOptions: false,
  nav_height: 0,
  prompt: "",
  isScanned: false,
  pageCount: 0,
  mdResponse: "",
  htmlResponse: "",
  strategy: null,
  selectedLanguages: [],
  subscriptionAndStatus: null,
  showStyleTools: true,
  showChatTextArea: false,
  advancedSearch: false,
  headSection: "",
  message: null,
  downloadOptions: {
    layout: 'portrait',
    paperSize: 'A4',
    scale: 1,
    margin: 'default',
    customMargins: { top: 10, right: 10, bottom: 10, left: 10 },
    duplex: false,
    fileName: "document.pdf"
  },
  lang: null
};

const toolSlice = createSlice({
  name: "tool",
  initialState,
  reducers: {
    resetErrorMessage(state: ToolState) {
      state.errorMessage = "";
      state.showErrorMessage = false;
      state.errorCode = null;
      state.isSubmitted = false;
    },
    setField(state, action: PayloadAction<Partial<ToolState>>) {
      Object.keys(action.payload).forEach((key) => {
        // Cast the key to keyof ToolState to ensure it's a valid key
        const typedKey = key as k;
        const value = action.payload[typedKey];
        if (value !== undefined) {
          // @ts-ignore
          state[typedKey] = value;
        }
      });
    },
  },
});

export const {
  resetErrorMessage,
  setField
} = toolSlice.actions;

export default toolSlice.reducer;
