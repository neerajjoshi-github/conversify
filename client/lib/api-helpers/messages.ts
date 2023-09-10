import axiosHandler from "./axiosHandler";
import { ChatType } from "./chats";
import { UserFromDB } from "./user";

export type MessageType = {
  sender: UserFromDB;
  content: string;
  chat: ChatType;
  _id: string;
  createdAt: string;
  updatedAt: string;
};

type SendMessagePrams = {
  content: string;
  chatId: string;
};

type SuccessMessageResponse = {
  success: true;
  message: string;
  data: MessageType;
};

type FailedResponse = {
  success: false;
  message: string;
  data: null;
};

export const sendMessage = async (
  data: SendMessagePrams
): Promise<SuccessMessageResponse | FailedResponse> => {
  const response = await axiosHandler({
    method: "POST",
    url: "messages",
    data: data,
  });

  return response;
};

type SuccessMessagesResponse = {
  success: true;
  message: string;
  data: MessageType[];
};

export const getAllMessagesForAChat = async (
  chatId: string
): Promise<SuccessMessagesResponse | FailedResponse> => {
  const response = await axiosHandler({
    method: "GET",
    url: `messages/chat/${chatId}`,
  });

  return response;
};
