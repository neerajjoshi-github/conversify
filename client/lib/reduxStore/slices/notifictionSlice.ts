import { MessageType } from "@/lib/api-helpers/messages";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface notificationState {
  unreadMessages: MessageType[];
}

const initialState: notificationState = {
  unreadMessages: [],
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNewUnreadMessage: (state, action: PayloadAction<MessageType>) => {
      state.unreadMessages = [...state.unreadMessages, action.payload];
    },
    clearUnreadMessages: (state, action: PayloadAction<string>) => {
      state.unreadMessages = state.unreadMessages.filter(
        (message) => message.chat._id !== action.payload
      );
    },
  },
});

export const { setNewUnreadMessage, clearUnreadMessages } =
  notificationSlice.actions;

export default notificationSlice.reducer;
