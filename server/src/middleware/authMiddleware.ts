import jwt from "jsonwebtoken";
import { RequestHandler } from "express";
import createHttpError from "http-errors";
import env from "../utils/vaildateEnv";

interface JwtPayload {
  id: string;
}

export const authMiddleware: RequestHandler = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      throw createHttpError(
        404,
        "Invaild request!! You have to be logged in to proceeded!!"
      );
    }
    const decryptedData = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.body.userId = decryptedData.id;
    next();
  } catch (error) {
    next(error);
  }
};
