"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { AiOutlineSend } from "react-icons/ai";
import { BsEmojiSmile } from "react-icons/bs";
import ChatHeader from "@/components/dashboard/ChatHeader";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reduxStore/store";
import Lottie from "lottie-react";
import ChatAnimation from "../../public/lotti-animation/chat-animation.json";

const ChatContainer = () => {
  const { currentChat } = useSelector((state: RootState) => state.chats);
  if (!currentChat)
    return (
      <div className="flex-1 h-full flex flex-col gap-4 items-center justify-center">
        <h3 className="text-4xl font-medium text-center">
          Select a user or group to start chating!!
        </h3>
        <Lottie animationData={ChatAnimation} loop={true} />
      </div>
    );

  return (
    <div className="flex-1 h-full relative">
      <ChatHeader />
      <div className="z-10 absolute bottom-0 left-0 w-full bg-secondary h-14 flex items-center gap-1">
        <Button variant="ghost" size="icon">
          <BsEmojiSmile size={28} className="active:scale-95" />
        </Button>
        <Input className="bg-background flex-1" placeholder="Type a message" />
        <Button variant="ghost" size="icon" title="Send">
          <AiOutlineSend size={28} />
        </Button>
      </div>
    </div>
  );
};

export default ChatContainer;
