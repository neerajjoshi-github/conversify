import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DialogState {
  isCreateGroupModalOpen: boolean;
}

const initialState: DialogState = {
  isCreateGroupModalOpen: false,
};

export const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    setIsCreateGroupModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isCreateGroupModalOpen = action.payload;
    },
    toggleIsCreateGroupModalOpen: (state) => {
      state.isCreateGroupModalOpen = !state.isCreateGroupModalOpen;
    },
  },
});

export const { setIsCreateGroupModalOpen, toggleIsCreateGroupModalOpen } =
  dialogSlice.actions;

export default dialogSlice.reducer;
