import { RequestHandler } from "express";
import UserModel from "../models/userModel";
import mongoose from "mongoose";

export const getUsersWithUsernameOrEmail: RequestHandler = async (
  req,
  res,
  next
) => {
  const searchQuery = req.query.search;
  const userId = req.body.userId;
  let searchParams = {};
  if (searchQuery) {
    searchParams = {
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { email: { $regex: searchQuery, $options: "i" } },
      ],
    };
  }
  try {
    const users = await UserModel.find(searchParams).find({
      _id: { $ne: new mongoose.Types.ObjectId(userId) },
    });

    res.status(200).json({
      data: users,
      message: "Found users successfully!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
