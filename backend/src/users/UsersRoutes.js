import { Router } from 'express';

import { getAll, register, update, remove } from './UsersController.js';

import { Authentication } from '../middlewares/Authentication.js';

const UsersRouter = Router();

UsersRouter.patch('/:id', Authentication, update);
UsersRouter.post('/', Authentication, register);
UsersRouter.get('/', Authentication, getAll);
UsersRouter.delete('/:id', Authentication, remove);

export default UsersRouter;
