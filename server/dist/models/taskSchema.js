"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTaskById = exports.updateTaskById = exports.createTaskData = exports.getTaskByAuthorId = exports.getTaskByTitle = exports.getTaskById = exports.TaskModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Task Config
const TaskSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true, },
    description: { type: String, required: true },
    due_date: { type: Date, required: true },
    author_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'user', required: true }
}, { timestamps: true });
exports.TaskModel = mongoose_1.default.model('Task', TaskSchema);
// Task Actions
const getTaskById = (_id, author_id) => exports.TaskModel.findOne({ _id, author_id });
exports.getTaskById = getTaskById;
const getTaskByTitle = (title) => exports.TaskModel.find({ title });
exports.getTaskByTitle = getTaskByTitle;
const getTaskByAuthorId = (author_id) => exports.TaskModel.find({ author_id });
exports.getTaskByAuthorId = getTaskByAuthorId;
const createTaskData = (values) => new exports.TaskModel(values).save().then((task) => task.toObject());
exports.createTaskData = createTaskData;
const updateTaskById = (_id, update) => exports.TaskModel.findByIdAndUpdate(_id, update, { new: true });
exports.updateTaskById = updateTaskById;
const deleteTaskById = (_id) => exports.TaskModel.findByIdAndDelete(_id);
exports.deleteTaskById = deleteTaskById;
