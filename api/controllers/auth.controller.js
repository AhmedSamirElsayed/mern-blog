import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandelar } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    // return res.status(400).json({ message: "All fields are required" });
    next(errorHandelar(400, "All fields are required"));
  }

  const hashPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({ username, email, password: hashPassword });

  try {
    await newUser.save();
    res.json({ message: "Sign Up successfully" });
  } catch (error) {
    // res.status(500).json({ ErrorMessage: error.message });
    next(error); //use midleWare
  }
};

// // handle log in controller
export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === "" || password === "") {
    return next(errorHandelar(400, "All fields are required"));
  }

  try {
    // 1- check validate of email
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandelar(404, "User not found"));
    }
    // 2- check validate of password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandelar(400, "Invalid email or password"));
    }

    // if user valid generate token to send it with respons in cookie . to auth user
    const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRT);
    // Exclude the password from the response
    const { password: pass, ...rest } = validUser._doc;

    // console.log(validUser);
    // console.log("------------------------------------");
    // console.log(rest);
    return (
      res
        .status(200)
        .cookie("access_token", token, { httpOnly: true })
        // .json(validUser);
        .json(rest)
    );
  } catch (error) {
    next(error);
  }
};

// export const signin = async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password || email === "" || password === "") {
//     return next(errorHandelar(400, "All fields are required"));
//   }

//   try {
//     // 1- Check if the email exists
//     const validUser = await User.findOne({ email });
//     if (!validUser) {
//       return next(errorHandelar(404, "User not found"));
//     }

//     // 2- Check if the password is correct
//     const validPassword = bcryptjs.compareSync(password, validUser.password);
//     if (!validPassword) {
//       return next(errorHandelar(400, "Invalid email or password"));
//     }

//     // If the user is valid, generate a token and send it in the response
//     const token = jwt.sign({ userId: validUser._id }, process.env.JWT_SECRT);
//     const { password: pass, ...rest } = validUser._doc;
//     return res
//       .status(200)
//       .cookie("access_token", token, { httpOnly: true })
//       .json(rest);
//   } catch (error) {
//     return next(error);
//   }
// };
