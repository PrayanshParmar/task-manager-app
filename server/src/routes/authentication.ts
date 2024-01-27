import express from 'express';

import { login, register, logout } from '../controllers/authentication';

export default (router: express.Router) => {
  router.post('/api/v1/register', register);
  router.post('/api/v1/login', login);
  router.get('/api/v1/logout', logout);

};