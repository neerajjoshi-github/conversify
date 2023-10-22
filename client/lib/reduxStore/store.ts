import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import dialogReducer from "./slices/dialogSlice";
import chatsReducer from "./slices/chatsSlice";
import socketReducer from "./slices/socketSlice";
import notifictionReducer from "./slices/notifictionSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    dialog: dialogReducer,
    chats: chatsReducer,
    socket: socketReducer,
    notification: notifictionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
