import { Router } from "express";
import { getUsersWithUsernameOrEmail } from "../controllers/userControllers";

const router = Router();

router.get("/", getUsersWithUsernameOrEmail);

export default router;
