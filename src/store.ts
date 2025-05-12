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
  strategy: "script" | "content" | "generate" | null,
  selectedLanguages: string[];
  subscriptionAndStatus: { subscription: SubscriptionData, status: boolean } | null;
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
  strategy: null,
  selectedLanguages: [],
  subscriptionAndStatus: null
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
