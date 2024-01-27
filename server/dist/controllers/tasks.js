"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.getTasksById = exports.getTasks = exports.createTask = void 0;
const taskSchema_1 = require("../models/taskSchema");
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, due_date } = req.body;
        if (!title || !description || !due_date) {
            return res.sendStatus(400);
        }
        const userData = req.user;
        if (!userData) {
            return res.sendStatus(403);
        }
        const existingTitle = yield (0, taskSchema_1.getTaskByTitle)(title);
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
        yield (0, taskSchema_1.createTaskData)({
            title,
            description,
            due_date: dateObject,
            author_id: userData.id,
        });
        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
});
exports.createTask = createTask;
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        if (!userData) {
            return res.sendStatus(403);
        }
        const tasks = yield (0, taskSchema_1.getTaskByAuthorId)(userData.id);
        if (tasks.length === 0) {
            return res.sendStatus(404);
        }
        const reversTask = tasks.reverse();
        return res.status(200).json(reversTask);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getTasks = getTasks;
const getTasksById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        if (!userData) {
            return res.sendStatus(403);
        }
        const taskId = req.params.taskid;
        if (!taskId) {
            return res.sendStatus(400);
        }
        const checkValidUser = yield (0, taskSchema_1.getTaskById)(taskId, userData.id);
        if (!checkValidUser) {
            return res.sendStatus(403);
        }
        const task = yield (0, taskSchema_1.getTaskById)(taskId, userData.id);
        if (!task) {
            return res.sendStatus(404);
        }
        return res.status(200).json(task);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.getTasksById = getTasksById;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        if (!userData) {
            return res.sendStatus(403);
        }
        const taskId = req.params.taskid;
        if (!taskId) {
            return res.sendStatus(400);
        }
        const checkValidUser = yield (0, taskSchema_1.getTaskById)(taskId, userData.id);
        if (!checkValidUser) {
            return res.sendStatus(401);
        }
        if (!req.body.title && !req.body.description && !req.body.due_date) {
            return res.sendStatus(400);
        }
        const taskToUpdate = yield (0, taskSchema_1.updateTaskById)(taskId, req.body);
        if (!taskToUpdate) {
            return res.sendStatus(404);
        }
        return res.status(200).json(taskToUpdate);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.user;
        if (!userData) {
            return res.sendStatus(403);
        }
        const taskId = req.params.taskid;
        if (!taskId) {
            return res.sendStatus(400);
        }
        const checkValidUser = yield (0, taskSchema_1.getTaskById)(taskId, userData.id);
        if (!checkValidUser) {
            return res.sendStatus(403);
        }
        const taskTodelete = yield (0, taskSchema_1.deleteTaskById)(taskId);
        if (!taskTodelete) {
            return res.sendStatus(404);
        }
        return res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
});
exports.deleteTask = deleteTask;
