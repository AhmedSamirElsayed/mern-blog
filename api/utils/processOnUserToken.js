import jwt from "jsonwebtoken";
import { errorHandelar } from "./error.js";

const generateUserToken = (validUser) => {
  const token = jwt.sign(
    { userId: validUser._id, isAdmin: validUser.isAdmin },
    process.env.JWT_SECRT
  );
  return token;
};

const verifyUserToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandelar(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRT, (err, user) => {
    if (err) {
      return next(errorHandelar(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

export { generateUserToken, verifyUserToken };
