import { RequestHandler } from "express";
import createHttpError from "http-errors";
import MessageModel from "../models/messageModel";
import UserModel from "../models/userModel";
import ChatModel from "../models/chatModel";

export const sendMessage: RequestHandler = async (req, res, next) => {
  const currentUserId = req.body.userId;
  const { content, chatId } = req.body;

  try {
    if (!content || !chatId) {
      throw createHttpError(404, "Missing required fields");
    }

    const newMessage = {
      sender: currentUserId,
      content,
      chat: chatId,
    };
    let createdMessaage = await MessageModel.create(newMessage);

    createdMessaage = await createdMessaage.populate(
      "sender",
      "username imageURL"
    );
    createdMessaage = await createdMessaage.populate("chat");
    const message = await UserModel.populate(createdMessaage, {
      path: "chat.members",
      select: "username imageURL email",
    });

    await ChatModel.findByIdAndUpdate(chatId, {
      latestMessage: message._id,
    });

    res.status(200).json({
      data: message,
      success: true,
      message: "Message send successfully!!",
    });
  } catch (error) {
    next(error);
  }
};
export const getAllMessagesForAChat: RequestHandler = async (
  req,
  res,
  next
) => {
  const currentUserId = req.body.userId;
  const { chatId } = req.params;

  try {
    if (!chatId) {
      throw createHttpError(404, "Missing required fields");
    }

    const messages = await MessageModel.find({
      chat: chatId,
    })
      .populate("sender", "username imageURL email")
      .populate("chat");

    res.status(200).json({
      data: messages,
      success: true,
      message: "Message send successfully!!",
    });
  } catch (error) {
    next(error);
  }
};
