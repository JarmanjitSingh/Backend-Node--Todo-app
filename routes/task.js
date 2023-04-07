import express from "express";
import { deleteTask, getMyTasks, newTask, updateTask } from "../controllers/task.js";
import {isAuthenticated} from "../middlewares/auth.js"

const router = express.Router();

router.post("/newTask", isAuthenticated , newTask);
router.get("/mytasks", isAuthenticated , getMyTasks);

router.route("/:id").put(isAuthenticated, updateTask).delete(isAuthenticated, deleteTask);


export default router;