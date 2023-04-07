import express from "express";
import {
  getUserDetails,
  login,
  logout,
  register,
} from "../controllers/usercontroller.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.post("/logout", logout);

//for dynamic id
router.route("/user/me").get(isAuthenticated, getUserDetails);

export default router;
