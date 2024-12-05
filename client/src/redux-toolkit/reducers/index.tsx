import { combineReducers } from "@reduxjs/toolkit";
// styles components
import popupSlice from "./popupSlice";
import tasksSlice from "./tasksSlice";

export const rootReducers = combineReducers({
  popupSlice,
  tasksSlice,
});
