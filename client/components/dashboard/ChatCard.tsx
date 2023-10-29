"use client";
import { ChatType } from "@/lib/api-helpers/chats";
import { setCurrentChat } from "@/lib/reduxStore/slices/chatsSlice";
import { getSingleChatImage, getSingleChatName } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { RootState } from "@/lib/reduxStore/store";
import ProfileImage from "./ProfileImage";

type ChatCardProps = {
  chatData: ChatType;
};

const ChatCard: React.FC<ChatCardProps> = ({ chatData }) => {
  const [currentChatUnreadMessages, setCurrentChatUnreadMessages] = useState(0);
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.user);
  const { currentChat } = useSelector((state: RootState) => state.chats);
  const onClickHandler = () => {
    dispatch(setCurrentChat(chatData));
  };
  const { unreadMessages } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    const messages = unreadMessages.filter(
      (msg) => msg.chat._id === chatData._id
    );
    setCurrentChatUnreadMessages(messages.length);
  }, [unreadMessages]);

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
        <ProfileImage
          imageURL={
            chatData.isGroupChat
              ? chatData.imageURL!
              : getSingleChatImage(chatData.members, data?.userId!)
          }
        />
        <div className="flex-1 min-w-0 flex flex-col">
          <div className="w-full min-w-0 flex">
            <span className="text-lg truncate">
              {chatData.isGroupChat
                ? chatData.chatName
                : getSingleChatName(chatData.members, data?.userId!)}
            </span>
            <div className="ml-auto flex flex-col gap-1">
              <span className="text-xs text-zinc-500 whitespace-nowrap">
                {chatData?.latestMessage?.createdAt
                  ? moment(chatData?.latestMessage?.createdAt).fromNow()
                  : moment(chatData.createdAt).format("DD/MM/YYYY")}
              </span>
            </div>
          </div>
          <div className="flex">
            <p className="text-xs text-zinc-500 truncate flex-1">
              {chatData?.latestMessage
                ? chatData.latestMessage.content
                : "start chating..."}
            </p>
            {currentChatUnreadMessages > 0 && (
              <div className="ml-auto rounded-full bg-primary text-secondary text-xs font-mono w-5 h-5 flex items-center justify-center">
                {currentChatUnreadMessages}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
