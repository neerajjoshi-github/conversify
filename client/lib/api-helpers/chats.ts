import axiosHandler from "./axiosHandler";
import { UserFromDB } from "./user";
import { MessageType } from "./messages";

export type ChatType = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  members: UserFromDB[];
  latestMessage: MessageType;
  groupAdmin: UserFromDB;
  createdAt: string;
  updatedAt: string;
};

type FailedResponse = {
  success: false;
  message: string;
  data: null;
};

type SuccessChatResponse = {
  success: true;
  message: string;
  data: ChatType[];
};

type SuccessAccessChatResponse = {
  success: true;
  message: string;
  data: ChatType;
};

export const getUserChats = async (): Promise<
  SuccessChatResponse | FailedResponse
> => {
  const response = await axiosHandler({
    method: "GET",
    url: "chats",
  });

  return response;
};

export const accessChat = async (
  memberUserId: string
): Promise<SuccessAccessChatResponse | FailedResponse> => {
  const response = await axiosHandler({
    method: "POST",
    url: "chats",
    data: { memberUserId },
  });

  return response;
};

type CreateGroupChatPrams = {
  members: string[];
  chatName: string;
};

export const createGroupChat = async (
  data: CreateGroupChatPrams
): Promise<SuccessAccessChatResponse | FailedResponse> => {
  const response = await axiosHandler({
    method: "POST",
    url: "chats/group",
    data,
  });

  return response;
};

export const updateGroupChat = async (
  newChatName: string
): Promise<SuccessAccessChatResponse | FailedResponse> => {
  const response = await axiosHandler({
    method: "PUT",
    url: "chats/group",
    data: { newChatName },
  });

  return response;
};

type AddToGroupPrams = {
  memberId: string;
  chatId: string;
};
export const addToGroup = async (
  data: AddToGroupPrams
): Promise<SuccessAccessChatResponse | FailedResponse> => {
  const response = await axiosHandler({
    method: "PUT",
    url: "chats/group/add",
    data,
  });

  return response;
};

type RemoveFromGroupPrams = {
  memberId: string;
  chatId: string;
};
export const removeFromGroup = async (
  data: RemoveFromGroupPrams
): Promise<SuccessAccessChatResponse | FailedResponse> => {
  const response = await axiosHandler({
    method: "PUT",
    url: "chats/group/remove",
    data,
  });

  return response;
};
