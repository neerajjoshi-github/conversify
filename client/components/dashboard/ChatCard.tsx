"use client";
import { ChatType } from "@/lib/api-helpers/chats";
import { setCurrentChat } from "@/lib/reduxStore/slices/chatsSlice";
import { getSingleChatName } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "@/lib/reduxStore/store";

type ChatCardProps = {
  chatData: ChatType;
};

const ChatCard: React.FC<ChatCardProps> = ({ chatData }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  const { currentChat } = useSelector((state: RootState) => state.chats);
  const onClickHandler = () => {
    dispatch(setCurrentChat(chatData));
  };
  return (
    <div
      onClick={onClickHandler}
      className={`${
        currentChat?._id === chatData._id
          ? "bg-foreground/20"
          : "bg-secondary hover:bg-foreground/10"
      } w-full px-4 py-2 flex items-center cursor-pointer transition duration-300 border-b border-border`}
    >
      <div className="flex gap-2 w-full ">
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
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="w-full min-w-0 flex">
            <span className="text-lg truncate">
              {chatData.isGroupChat
                ? chatData.chatName
                : getSingleChatName(chatData.members, data?.userId!)}
            </span>
            <span className="text-xs text-zinc-500 whitespace-nowrap ml-auto">
              {chatData?.latestMessage?.createdAt
                ? moment(chatData?.latestMessage?.createdAt).fromNow()
                : moment(chatData.createdAt).format("DD/MM/YYYY")}
            </span>
          </div>
          <div>
            <p className="text-xs text-zinc-500 truncate">
              {chatData?.latestMessage
                ? chatData.latestMessage.content
                : "start chating..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
