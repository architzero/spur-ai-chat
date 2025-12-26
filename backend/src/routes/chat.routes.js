import express from "express";
import { handleChatMessage } from "../controllers/chat.controller.js";

const router = express.Router();

router.post("/message", handleChatMessage);

export default router;
