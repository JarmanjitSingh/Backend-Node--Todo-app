import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env"
})

//middleware
app.use(express.json()); // to access data from req.body and always write it in first
app.use(cookieParser()); //to read cookies from cookie storage
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/task", taskRouter);

//Apis
app.get("/", (req, res) => {
  res.send("We are here to learn node apis");
});

//using errormiddleware
app.use(errorMiddleware)


