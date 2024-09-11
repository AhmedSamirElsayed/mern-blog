import express from "express";
import { verifyUserToken } from "../utils/processOnUserToken.js";
import { create, getALLposts } from "../controllers/post.controller.js";

const router = express.Router();
router.post("/create", verifyUserToken, create);
router.get("/getposts", getALLposts);

export default router;
