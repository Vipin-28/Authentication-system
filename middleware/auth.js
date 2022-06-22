import jwt from "jsonwebtoken";
import { User } from "../models/users.js";

// verify middleware
export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies; //used cookie parser to access this

    if (!token) {//token not present in the cookies
      return res.status(401).json({ success: false, message: "Login First" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();// middleware callback
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
