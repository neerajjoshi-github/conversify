import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import io, { Socket } from "socket.io-client";

export interface SocketState {
  socket: any;
}

const initialState: SocketState = {
  socket: null,
};

export const socketSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSocket: (state, action: PayloadAction<ReturnType<typeof io>>) => {
      state.socket = action.payload;
    },
  },
});

export const { setSocket } = socketSlice.actions;

export default socketSlice.reducer;
