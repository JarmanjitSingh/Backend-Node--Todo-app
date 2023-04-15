import { UserModel } from "../models/usermodel.js";
import bcrypt from "bcrypt";
import { setcookie } from "../utils/features.js";

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "Invalid Email or Password." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
    return res
    .status(404)
    .json({ success: false, message: "Invalid Email or Password." });
    setcookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await UserModel.findOne({ email });
    if (user)
      return res
        .status(404)
        .json({ success: false, message: "User Already Exist" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await UserModel.create({ name, email, password: hashedPassword });

    setcookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
export const logout = (req, res) => {
  const { token } = req.cookies;

  if (!token)
    return res.status(409).json({ success: false, message: "Login first" });

  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "devlopment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "devlopment" ? false : true,
    })
    .json({ success: true, message: "logged out" });
};
