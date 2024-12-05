import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Slice } from "@reduxjs/toolkit";

export interface ActionsState {
  tasks: [];
}

const initialState: ActionsState = {
  tasks: [],
};

export const tasksSlice: Slice<ActionsState> = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    tasksLists: (state, action: PayloadAction<[]>) => {
      state.tasks = action.payload;
    },
  },
});

export const { tasksLists } = tasksSlice.actions;

export default tasksSlice.reducer;
