import express from "express";
import { verifyUserToken } from "../utils/processOnUserToken.js";
import {
  create,
  getALLposts,
  deletepost,
} from "../controllers/post.controller.js";

const router = express.Router();
router.post("/create", verifyUserToken, create);
router.get("/getposts", getALLposts);
router.delete("/deletepost/:postId/:userId", verifyUserToken, deletepost);

export default router;
