import express from "express";
import { testAPI, updateUserInfo } from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/processOnUserToken.js";

const router = express.Router();

// routes
router.get("/test", testAPI);
router.put("/update/:userId", verifyUserToken, updateUserInfo);

export default router;
