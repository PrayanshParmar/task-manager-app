"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("../controllers/tasks");
exports.default = (router) => {
    router.post('/api/v1/tasks', tasks_1.createTask);
    router.get('/api/v1/tasks', tasks_1.getTask);
    router.put('/api/v1/tasks/:id', tasks_1.updateTask);
    router.delete('/api/v1/tasks/:id', tasks_1.deleteTask);
};
