import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dialogReducer from "./slices/dialogSlice";
import chatsReducer from "./slices/chatsSlice";
import socketReducer from "./slices/socketSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dialog: dialogReducer,
    chats: chatsReducer,
    socket: socketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
