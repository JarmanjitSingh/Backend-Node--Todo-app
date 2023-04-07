import ErrorHandler from "../middlewares/errorMiddleware.js";
import { task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    await task.create({ title, description, user: req.user });
    res.status(200).json({ success: true, message: "Task added Successfully" });
  } catch (error) {
    next(error);
  }
};

export const getMyTasks = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const tasks = await task.find({ user: userId });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updTask = await task.findById(id);

    if (!updTask) return next(new ErrorHandler("Task not found", 404));

    updTask.isCompleted = !updTask.isCompleted;

    updTask.save();

    res.status(200).json({ success: true, message: "task updated" });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const delTask = await task.findById(id);

    if (!delTask) return next(new ErrorHandler("Task not found", 404));

    await delTask.deleteOne();

    res.status(200).json({ success: true, message: "task deleted" });
  } catch (error) {
    next(error);
  }
};
