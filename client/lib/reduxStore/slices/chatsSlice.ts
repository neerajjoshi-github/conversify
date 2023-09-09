import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ChatType } from "@/lib/api-helpers/chats";

export interface chatsState {
  currentChat: ChatType | null;
}

const initialState: chatsState = {
  currentChat: null,
};

export const chatslice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<ChatType>) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setCurrentChat } = chatslice.actions;

export default chatslice.reducer;
