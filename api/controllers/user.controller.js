import User from "../models/user.model.js";
import { errorHandelar } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const testAPI = (req, res) => {
  res.json({ message: "api response for you as async is working" });
};

// update user information api
export const updateUserInfo = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
    return next(errorHandelar(403, "Forbidden"));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(
        errorHandelar(400, "Password must be at least 6 characters long")
      );
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username.length > 20) {
      return next(
        errorHandelar(400, "Username must be between 3 to 20 characters")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(errorHandelar(400, "Username cannot contain spaces"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandelar(400, "Username must be lowercase"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandelar(400, "Username can only contain letters and numbers")
      );
    }
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// delete user information api
export const deleteUser = async (req, res, next) => {
  if (req.user.userId !== req.params.userId) {
    return next(
      errorHandelar(403, "you are not allow to delete this user account ")
    );
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json({ message: "User delete successfully" });
  } catch (error) {
    next(error);
  }
};

// sign out from account
export const signOut = async (req, res, next) => {
  try {
    res
      .clearCookie("access_token")
      .status(200)
      .json("user has been sign out successfully.");
  } catch (error) {
    next(error);
  }
};
