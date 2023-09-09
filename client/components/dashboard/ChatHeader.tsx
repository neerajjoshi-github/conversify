"use client";
import { RootState } from "@/lib/reduxStore/store";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { getSingleChatName } from "@/lib/utils";
import { Button } from "../ui/button";

const ChatHeader = () => {
  const { currentChat } = useSelector((state: RootState) => state.chats);
  if (!currentChat) return;
  return (
    <div className="h-16 w-full bg-secondary px-6 flex items-center gap-4 border-b border-border">
      <div className="relative w-12 h-12 rounded-full overflow-hidden bg-foreground">
        <Image
          src={
            currentChat.isGroupChat
              ? "/svgs/group-icon.svg"
              : "/svgs/single-user-icon.svg"
          }
          fill
          alt="Profile"
          objectFit="contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-semibold">
          {currentChat.isGroupChat
            ? currentChat.chatName
            : getSingleChatName(currentChat.members, "")}
        </span>
        <span className="text-xs text-zinc-500 font-semibold">
          Created on {moment(currentChat.createdAt).format("DD MMM YYYY")}
        </span>
      </div>
      <div className="flex items-center justify-center ml-auto">
        <Button size="icon" variant="ghost" title="Edit">
          <BsThreeDotsVertical size={24} />
        </Button>
      </div>
    </div>
  );
};

export default ChatHeader;
