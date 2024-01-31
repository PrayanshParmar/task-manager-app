import express from 'express';

import { login, register, logout } from '../controllers/authentication';
import validateRequest from '../middleware/validate-request';

export default (router: express.Router) => {
  router.post('/api/v1/register', validateRequest, register);
  router.post('/api/v1/login',validateRequest, login);
  router.get('/api/v1/logout', logout);

};