import { Router } from 'express';

import { register, update } from './UsersController.js';

import { Authentication } from '../middlewares/Authentication.js';

const UsersRouter = Router();

UsersRouter.patch('/:id', Authentication, update);
UsersRouter.post('/', Authentication, register);

export default UsersRouter;
