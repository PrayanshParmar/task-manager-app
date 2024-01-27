import express from 'express';

import { createTask, getTasks,getTasksById, updateTask, deleteTask } from '../controllers/tasks'; 
import { isAuthenticated } from '../middleware/authenticate';

export default (router: express.Router) => {
  router.post('/api/v1/tasks',isAuthenticated,createTask);
  router.get('/api/v1/tasks',isAuthenticated,getTasks);
  router.get('/api/v1/tasks/:taskid',isAuthenticated,getTasksById);
  router.put('/api/v1/tasks/:taskid',isAuthenticated,updateTask);
  router.delete('/api/v1/tasks/:taskid',isAuthenticated,deleteTask);
  
};