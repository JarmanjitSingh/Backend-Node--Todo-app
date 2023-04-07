import { UserModel } from "../models/usermodel.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  const { token } = await req.cookies;

  console.log(token);
  if (!token)
    return res.status(404).json({ success: false, message: "login first" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await UserModel.findById(decoded._id);
  next();
};
