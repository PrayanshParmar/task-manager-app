import express from "express";
import {
  getTaskByTitle,
  createTaskData,
  getTaskByAuthorId,
  getTaskById,
  updateTaskById,
  deleteTaskById,
} from "../models/taskSchema";

export const createTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, description, due_date } = req.body;

    if (!title || !description || !due_date) {
      return res.sendStatus(400);
    }
    const userData = (req as any).user;

    if (!userData) {
      return res.sendStatus(403);
    }

    const existingTitle = await getTaskByTitle(title);

    if (existingTitle.length !== 0) {
      return res.sendStatus(400);
    }

    const [day, month, year] = due_date.split("/").map(Number);

    const dateObject = new Date(year, month - 1, day);

    const currentDate = new Date();

    if (dateObject <= currentDate) {
      return res
        .status(400)
        .json({ error: "Entered date must be after the current date." });
    }
    await createTaskData({
      title,
      description,
      due_date: dateObject,
      author_id: userData.id,
    });

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

export const getTasks = async (req: express.Request, res: express.Response) => {
  try {
    const userData = (req as any).user;

    if (!userData) {
      return res.sendStatus(403);
    }

    const tasks = await getTaskByAuthorId(userData.id);
    if (tasks.length === 0) {
      return res.sendStatus(404);
    }
    const reversTask = tasks.reverse();

    return res.status(200).json(reversTask);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getTasksById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userData = (req as any).user;

    if (!userData) {
      return res.sendStatus(403);
    }

    const taskId = req.params.taskid;

    if (!taskId) {
      return res.sendStatus(400);
    }

    const checkValidUser = await getTaskById(taskId, userData.id);

    if (!checkValidUser) {
      return res.sendStatus(403);
    }

    const task = await getTaskById(taskId, userData.id);
    if (!task) {
      return res.sendStatus(404);
    }
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const updateTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userData = (req as any).user;

    if (!userData) {
      return res.sendStatus(403);
    }

    const taskId = req.params.taskid;

    if (!taskId) {
      return res.sendStatus(400);
    }

    const checkValidUser = await getTaskById(taskId, userData.id);

    if (!checkValidUser) {
      return res.sendStatus(401);
    }

    if (!req.body.title && !req.body.description && !req.body.due_date) {
      return res.sendStatus(400);
    }

    const taskToUpdate = await updateTaskById(taskId, req.body);

    if (!taskToUpdate) {
      return res.sendStatus(404);
    }
    return res.status(200).json(taskToUpdate);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteTask = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const userData = (req as any).user;

    if (!userData) {
      return res.sendStatus(403);
    }

    const taskId = req.params.taskid;

    if (!taskId) {
      return res.sendStatus(400);
    }

    const checkValidUser = await getTaskById(taskId, userData.id);

    if (!checkValidUser) {
      return res.sendStatus(403);
    }

    const taskTodelete = await deleteTaskById(taskId);

    if (!taskTodelete) {
      return res.sendStatus(404);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
