import Router from "express";
import {
  acccessChat,
  addToGroup,
  createGroupChat,
  fetchUserChats,
  removeFromGrouop,
  updateGroupChat,
} from "../controllers/chatControllers";

const router = Router();

router.post("/", acccessChat);
router.get("/", fetchUserChats);

router.post("/group", createGroupChat);
router.put("/group", updateGroupChat);
router.put("/group/add", addToGroup);
router.put("/group/remove", removeFromGrouop);

export default router;
