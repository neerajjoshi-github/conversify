import { RequestHandler } from "express";
import createHttpError from "http-errors";
import UserModel from "../models/userModel";
import { generateJWT } from "../utils/token";
import bcrypt from "bcrypt";

export const register: RequestHandler = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      throw createHttpError(422, "Error: Missing required fields.");
    }
    const existingUserWithUsername = await UserModel.findOne({ username });
    const existingUserWithEmail = await UserModel.findOne({ email });
    if (existingUserWithUsername || existingUserWithEmail) {
      throw createHttpError(
        422,
        "User already exist with this email or username."
      );
    }

    const user = await UserModel.create({
      username,
      email,
      password,
    });

    res.status(200).json({
      data: {
        userId: user._id,
        username: user.username,
        imageURL: user.imageURL,
        email: user.email,
        token: generateJWT(user._id as unknown as string),
      },
      success: true,
      message: "Registration Complete: You're all set, Login in to continue.",
    });
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      throw createHttpError(404, "Invaild email or password.");
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw createHttpError(404, "Invaild email or password.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw createHttpError(404, "Invaild email or password.");
    }

    res.status(200).json({
      data: {
        userId: user._id,
        username: user.username,
        imageURL: user.imageURL,
        email: user.email,
        token: generateJWT(user._id as unknown as string),
      },
      success: true,
      message: "Login successful!!",
    });
  } catch (error) {
    next(error);
  }
};
