import { Router } from "express";
import {
  getAllMessagesForAChat,
  sendMessage,
} from "../controllers/messageControllers";

const router = Router();

router.post("/", sendMessage);

router.get("/chat/:chatId", getAllMessagesForAChat);

export default router;
