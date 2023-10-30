import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DialogState {
  isCreateGroupModalOpen: boolean;
  isChangeGroupNameModalOpen: boolean;
  isUpdateGroupMenuOpen: boolean;
  isRemoveMemberModalOpen: boolean;
  isAddMemberModalOpen: boolean;
}

const initialState: DialogState = {
  isCreateGroupModalOpen: false,
  isChangeGroupNameModalOpen: false,
  isUpdateGroupMenuOpen: false,
  isRemoveMemberModalOpen: false,
  isAddMemberModalOpen: false,
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
    setIsChangeGroupNameOpen: (state, action: PayloadAction<boolean>) => {
      state.isChangeGroupNameModalOpen = action.payload;
    },
    toggleIsChangeGroupNameModalOpen: (state) => {
      state.isChangeGroupNameModalOpen = !state.isChangeGroupNameModalOpen;
    },
    toggleIsUpdateGroupMenuOpen: (state) => {
      state.isUpdateGroupMenuOpen = !state.isUpdateGroupMenuOpen;
    },
    toggleIsRemoveMemberModalOpen: (state) => {
      state.isRemoveMemberModalOpen = !state.isRemoveMemberModalOpen;
    },
    toggleIsAddMemberModalOpen: (state) => {
      state.isAddMemberModalOpen = !state.isAddMemberModalOpen;
    },
  },
});

export const {
  setIsCreateGroupModalOpen,
  toggleIsCreateGroupModalOpen,
  toggleIsChangeGroupNameModalOpen,
  toggleIsUpdateGroupMenuOpen,
  toggleIsRemoveMemberModalOpen,
  toggleIsAddMemberModalOpen,
} = dialogSlice.actions;

export default dialogSlice.reducer;
