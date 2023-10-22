import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ChatType } from "@/lib/api-helpers/chats";
import { MessageType } from "@/lib/api-helpers/messages";

export interface chatsState {
  currentChat: ChatType | null;
  userChats: ChatType[] | null;
  isTyping: boolean;
}

const initialState: chatsState = {
  currentChat: null,
  userChats: null,
  isTyping: false,
};

export const chatslice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setCurrentChat: (state, action: PayloadAction<ChatType | null>) => {
      state.currentChat = action.payload;
    },
    setUserChats: (state, action: PayloadAction<ChatType[]>) => {
      state.userChats = action.payload;
    },
    addNewUserChat: (state, action: PayloadAction<ChatType>) => {
      state.userChats = state.userChats && [action.payload, ...state.userChats];
    },
    setLatestMessage: (state, action: PayloadAction<MessageType>) => {
      const updatedChats = state.userChats?.map((chat) => {
        if (chat._id === action.payload.chat._id) {
          chat.latestMessage = action.payload;
          return chat;
        } else {
          return chat;
        }
      });

      state.userChats = updatedChats || null;
    },
    setIsTyping: (state, action: PayloadAction<boolean>) => {
      state.isTyping = action.payload;
    },
  },
});

export const {
  setCurrentChat,
  setUserChats,
  setLatestMessage,
  addNewUserChat,
  setIsTyping,
} = chatslice.actions;

export default chatslice.reducer;
