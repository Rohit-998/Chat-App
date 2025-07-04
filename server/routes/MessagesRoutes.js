import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddleWare.js";
import { getMessages } from "../controllers/MessageController.js";

const messagesRoute = Router();

messagesRoute.post("/get-messages", verifyToken, getMessages);

export default messagesRoute;
