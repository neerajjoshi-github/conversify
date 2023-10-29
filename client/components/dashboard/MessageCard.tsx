"use client";
import { MessageType } from "@/lib/api-helpers/messages";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/reduxStore/store";
import moment from "moment";
import ProfileImage from "./ProfileImage";

type MessageCardProps = {
  message: MessageType;
  isLastMessage?: boolean;
  isGroupChat?: boolean;
};

const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isLastMessage = false,
  isGroupChat = false,
}) => {
  const { data } = useSelector((state: RootState) => state.user);
  const isMessageByCurrentUser = data?.userId === message.sender._id;
  return (
    <div
      className={`relative ${
        isGroupChat ? (isMessageByCurrentUser ? "mx-4" : "mx-9") : "mx-4"
      }`}
    >
      {isGroupChat && isLastMessage && !isMessageByCurrentUser && (
        <div className="absolute -left-[2.2rem] -bottom-2 rounded-full">
          <ProfileImage size="sm" imageURL={message.sender.imageURL} />
        </div>
      )}
      <div
        className={`${
          isMessageByCurrentUser ? "-right-[13px] flip" : " -left-[13px]"
        } absolute top-0 z-[1]`}
      >
        <svg
          viewBox="0 0 8 13"
          height="32.5"
          width="20"
          version="1.1"
          x="0px"
          y="0px"
        >
          <path
            opacity="0.13"
            fill="#0000000"
            d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"
          ></path>
          <path
            className={
              isMessageByCurrentUser ? "fill-primary" : "fill-secondary"
            }
            d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"
          ></path>
        </svg>
      </div>
      <div
        className={` ${
          isMessageByCurrentUser
            ? "bg-primary text-white ml-auto shadow-primary-message"
            : "bg-secondary shadow-message"
        } pt-1 px-1 pb-3 relative z-[10] max-w-[90%] sm:max-w-[80%] w-fit rounded-lg min-w-[80px]`}
      >
        <p className="text-sm p-1">{message.content}</p>
        <span
          className={`${
            isMessageByCurrentUser ? "text-zinc-300 " : "text-zinc-500"
          } absolute bottom-0 right-1 text-xxs`}
        >
          {moment(message.updatedAt).format("h:mm a")}
        </span>
      </div>
    </div>
  );
};

export default MessageCard;
