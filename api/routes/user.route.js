import express from "express";
import {
  testAPI,
  updateUserInfo,
  deleteUser,
  signOut,
} from "../controllers/user.controller.js";
import { verifyUserToken } from "../utils/processOnUserToken.js";

const router = express.Router();

// routes
router.get("/test", testAPI);
router.put("/update/:userId", verifyUserToken, updateUserInfo);
router.delete("/delete/:userId", verifyUserToken, deleteUser);
router.post("/signout", signOut);

export default router;
