"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("../controllers/tasks");
const authenticate_1 = require("../middleware/authenticate");
exports.default = (router) => {
    router.post('/api/v1/tasks', authenticate_1.isAuthenticated, tasks_1.createTask);
    router.get('/api/v1/tasks', authenticate_1.isAuthenticated, tasks_1.getTasks);
    router.get('/api/v1/tasks/:taskid', authenticate_1.isAuthenticated, tasks_1.getTasksById);
    router.put('/api/v1/tasks/:taskid', authenticate_1.isAuthenticated, tasks_1.updateTask);
    router.delete('/api/v1/tasks/:taskid', authenticate_1.isAuthenticated, tasks_1.deleteTask);
};
