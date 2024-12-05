import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";
import {
  DefaultPopupMessage,
  PopupMessageInterface,
} from "../../components/globalTypes/GlobalTypes";

export interface ActionsState {
  successPopup: PopupMessageInterface;
  errorPopup: PopupMessageInterface;
  isLoading: boolean;
  deleteTaskPopup: boolean;
  updateTaskPopup: boolean;
  addTaskPopup: boolean;
}

const initialState: ActionsState = {
  successPopup: DefaultPopupMessage,
  errorPopup: DefaultPopupMessage,
  isLoading: false,
  deleteTaskPopup: false,
  updateTaskPopup: false,
  addTaskPopup: false,
};

export const popupSlice: Slice<ActionsState> = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showSucessPopup: (state, action: PayloadAction<PopupMessageInterface>) => {
      state.successPopup = action.payload;
    },
    showErrorPopup: (state, action: PayloadAction<PopupMessageInterface>) => {
      state.errorPopup = action.payload;
    },

    showDeleteTaskPopup: (state, action: PayloadAction<boolean>) => {
      state.deleteTaskPopup = action.payload;
    },

    showUpdateTaskPopup: (state, action: PayloadAction<boolean>) => {
      state.updateTaskPopup = action.payload;
    },

    showAddTaskPopup: (state, action: PayloadAction<boolean>) => {
      state.addTaskPopup = action.payload;
    },

    hidePopup: (state) => {
      state.successPopup = DefaultPopupMessage;
      state.errorPopup = DefaultPopupMessage;
      state.isLoading = false;
      state.deleteTaskPopup = false;
      state.updateTaskPopup = false;
      state.addTaskPopup = false;
    },
  },
});

export const {
  hidePopup,
  showSucessPopup,
  showErrorPopup,
  showIsLoading,
  showDeleteTaskPopup,
  showUpdateTaskPopup,
  showAddTaskPopup,
} = popupSlice.actions;

export default popupSlice.reducer;
