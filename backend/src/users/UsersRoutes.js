import { Router } from 'express';

import { getAll, register, update } from './UsersController.js';

import { Authentication } from '../middlewares/Authentication.js';

const UsersRouter = Router();

UsersRouter.patch('/:id', Authentication, update);
UsersRouter.post('/', Authentication, register);
UsersRouter.get('/', Authentication, getAll);

export default UsersRouter;
