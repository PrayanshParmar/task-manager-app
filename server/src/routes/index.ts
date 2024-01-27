import express from 'express';

import authentication from './authentication';
import tasks from './tasks'


const router = express.Router();

export default (): express.Router => {
  authentication(router);
  tasks(router);

  return router;
};