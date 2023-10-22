"use client";
import { ReactNode, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSocket } from "@/lib/reduxStore/slices/socketSlice";
import io from "socket.io-client";
import { RootState } from "@/lib/reduxStore/store";

const ENDPOINT = "http://localhost:8080";

export function SocketProvider({ children }: { children: ReactNode }) {
  const { data } = useSelector((state: RootState) => state.user);
  const { currentChat } = useSelector((state: RootState) => state.chats);
  const { socket } = useSelector((state: RootState) => state.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!data) return;
    const socket = io(ENDPOINT);
    dispatch(setSocket(socket));
    socket.emit("setup", data);
    socket.on("connected", () => {
      console.log("SOCKET CONNECTED SUCCESSFULLY!!!");
    });
  }, []);

  useEffect(() => {
    if (!socket) return;
    socket.emit("join chat", currentChat);
  }, [currentChat]);

  return <>{children}</>;
}
