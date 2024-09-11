import express from "express";
import { verifyUserToken } from "../utils/processOnUserToken.js";
import { create } from "../controllers/post.controller.js";

const router = express.Router();
router.post("/create", verifyUserToken, create);

export default router;
