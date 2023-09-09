"use client";
import { ChatType } from "@/lib/api-helpers/chats";
import { setCurrentChat } from "@/lib/reduxStore/slices/chatsSlice";
import { getSingleChatName } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

type ChatCardProps = {
  chatData: ChatType;
};

const ChatCard: React.FC<ChatCardProps> = ({ chatData }) => {
  const dispatch = useDispatch();
  const onClickHandler = () => {
    dispatch(setCurrentChat(chatData));
  };
  return (
    <div
      onClick={onClickHandler}
      className="w-full px-4 py-2 flex items-center cursor-pointer hover:bg-foreground/10 transition duration-300 border-b border-border"
    >
      <div className="flex gap-2 w-full">
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-foreground">
          <Image
            src={
              chatData.isGroupChat
                ? "/svgs/group-icon.svg"
                : "/svgs/single-user-icon.svg"
            }
            fill
            alt="Profile"
            objectFit="cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <span className="text-foreground font-semibold">
            {chatData.isGroupChat
              ? chatData.chatName
              : getSingleChatName(chatData.members, "")}
          </span>
          <p className="text-xs truncate text-zinc-500">long time no see..</p>
        </div>
        <div className="flex items-end">
          <span className="text-zinc-500 text-xs">10:00pm</span>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
