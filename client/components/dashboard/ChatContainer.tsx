"use client";
import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "@/components/dashboard/ChatHeader";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/reduxStore/store";
import Lottie from "lottie-react";
import ChatAnimation from "../../public/lotti-animation/chat-animation.json";
import { getAllMessagesForAChat } from "@/lib/api-helpers/messages";
import { MessageType } from "@/lib/api-helpers/messages";
import MessageCard from "./MessageCard";
import { ScrollArea } from "../ui/scroll-area";
import ChatFooter from "./ChatFooter";
import { setLatestMessage } from "@/lib/reduxStore/slices/chatsSlice";
import {
  setNewUnreadMessage,
  clearUnreadMessages,
} from "@/lib/reduxStore/slices/notifictionSlice";
import TypingIndicator from "./TypingIndicator";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const { currentChat, isTyping } = useSelector(
    (state: RootState) => state.chats
  );
  console.log("current chat id : : ", currentChat);
  const { data } = useSelector((state: RootState) => state.user);
  const { socket } = useSelector((state: RootState) => state.socket);
  const { unreadMessages } = useSelector(
    (state: RootState) => state.notification
  );
  const [messages, setMessages] = useState<MessageType[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const getMessages = async () => {
    if (!currentChat) return null;
    const response = await getAllMessagesForAChat(currentChat._id);
    if (response.success) {
      setMessages(response.data);
    }
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView();
    }
  }, [messages]);

  useEffect(() => {
    if (!socket) return;
    socket.on("message recieved", (newMessageRecieved: MessageType) => {
      dispatch(setLatestMessage(newMessageRecieved));
      console.log(
        "message recieved chat id:::",
        newMessageRecieved.chat._id,
        "Current chat id:::",
        currentChat?._id
      );
      if (!currentChat || currentChat._id !== newMessageRecieved.chat._id) {
        dispatch(setNewUnreadMessage(newMessageRecieved));
      } else {
        setMessages((state) => [...state, newMessageRecieved]);
      }
    });
  }, [socket, currentChat]);

  useEffect(() => {
    getMessages();
  }, [currentChat]);

  if (!currentChat)
    return (
      <div className="max-md:hidden flex-1 h-full flex flex-col gap-4 items-center justify-center">
        <h3 className="text-4xl font-medium text-center">
          Select a user or group to start chating!!
        </h3>
        <Lottie animationData={ChatAnimation} loop={true} />
      </div>
    );

  return (
    <div
      className={`${
        currentChat ? "flex" : "hidden"
      } flex-1 h-full relative flex flex-col`}
    >
      <ChatHeader />
      <div className="w-full flex-1 overflow-hidden">
        <ScrollArea className="h-full w-full px-6 pb-2">
          <div className="flex flex-col gap-2 h-full ">
            <div className="flex-1"></div>
            {messages &&
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))}
            {isTyping && <TypingIndicator />}
            <div ref={scrollRef}></div>
          </div>
        </ScrollArea>
      </div>
      <ChatFooter refetchMessages={getMessages} />
    </div>
  );
};

export default ChatContainer;
