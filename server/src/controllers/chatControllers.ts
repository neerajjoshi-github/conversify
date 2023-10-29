import { RequestHandler } from "express";
import createHttpError from "http-errors";
import ChatModel from "../models/chatModel";
import UserModel from "../models/userModel";

export const acccessChat: RequestHandler = async (req, res, next) => {
  const userId = req.body.userId;
  const memberUserId = req.body.memberUserId;
  console.log("BODY DATA FROM ACCESS CHAT : ", req.body);
  try {
    if (!memberUserId)
      throw createHttpError(
        404,
        "You need atleast one more participant to create a chat."
      );

    const chat = await ChatModel.find({
      isGroupChat: false,
      $and: [
        { members: { $elemMatch: { $eq: userId } } },
        { members: { $elemMatch: { $eq: memberUserId } } },
      ],
    })
      .populate("members", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "usename imageURL email",
        },
      });

    if (chat.length > 0) {
      res.status(200).json({
        success: true,
        message: "Chat found successfully!!",
        data: chat[0],
      });
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        members: [userId, memberUserId],
      };

      const createdChat = await (
        await ChatModel.create(chatData)
      ).populate("members", "-password");

      res.status(200).json({
        success: true,
        message: "Chat created successfully!!",
        data: createdChat,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const fetchUserChats: RequestHandler = async (req, res, next) => {
  const userId = req.body.userId;
  try {
    const chats = await ChatModel.find({
      members: { $elemMatch: { $eq: userId } },
    })
      .populate("members", "-password")
      .populate("groupAdmin", "-password")
      .populate({
        path: "latestMessage",
        populate: {
          path: "sender",
          select: "usename imageURL email",
        },
      })
      .sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      message: "User chats found successfully!!",
      data: chats,
    });
  } catch (error) {
    next(error);
  }
};

export const createGroupChat: RequestHandler = async (req, res, next) => {
  const userId = req.body.userId;
  const { chatName, members, imageURL } = req.body;
  try {
    if (!chatName || !members) {
      throw createHttpError(404, "Please fill all the required fields.");
    }

    if (members.length < 2)
      throw createHttpError(
        404,
        "At least 2 more members are required other than you to form a group!!"
      );

    const createdGroupChat = await ChatModel.create({
      isGroupChat: true,
      groupAdmin: userId,
      members: [userId, ...members],
      chatName,
      imageURL,
    });

    const data = await ChatModel.findById(createdGroupChat._id)
      .populate("members", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({
      success: true,
      data,
      message: "Group created successfully!!",
    });
  } catch (error) {
    next(error);
  }
};

export const updateGroupChat: RequestHandler = async (req, res, next) => {
  const { newChatName, chatId } = req.body;

  try {
    if (!newChatName) {
      throw createHttpError(404, "Please provide a valid name.");
    }

    const chat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        chatName: newChatName,
      },
      {
        new: true,
      }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");

    if (!chat) {
      throw createHttpError(
        404,
        "Invalid request!! No chat exist with this id!!"
      );
    }

    res.status(200).json({
      success: true,
      data: chat,
      message: "Group updated successfully!!",
    });
  } catch (error) {
    next(error);
  }
};

export const addToGroup: RequestHandler = async (req, res, next) => {
  const { memberId, chatId } = req.body;
  try {
    const memeber = await UserModel.findById(memberId);
    if (!memeber) throw createHttpError(400, "User does not exist!!");

    const chat = await ChatModel.findById(chatId);
    if (!chat) throw createHttpError(400, "Chat does not exist!!");

    const alreadyAMember = !!chat.members.find((existingMember) =>
      existingMember.equals(memberId)
    );

    if (alreadyAMember) {
      throw createHttpError(400, "User is already a member of this group.");
    }

    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $push: { members: memeber._id },
      },
      { new: true }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({
      success: true,
      data: updatedChat,
      message: "Added new member successfully!",
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromGrouop: RequestHandler = async (req, res, next) => {
  const { memberId, chatId } = req.body;
  try {
    const memeber = await UserModel.findById(memberId);
    if (!memeber) throw createHttpError(400, "User does not exist!!");

    const updatedChat = await ChatModel.findByIdAndUpdate(
      chatId,
      {
        $pull: { members: memeber._id },
      },
      { new: true }
    )
      .populate("members", "-password")
      .populate("groupAdmin", "-password");

    if (!updatedChat) throw createHttpError(400, "Chat does not exist!!");
    res.status(200).json({
      success: true,
      data: updatedChat,
      message: "Removed member successfully!",
    });
  } catch (error) {
    next(error);
  }
};
