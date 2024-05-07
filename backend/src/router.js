import { Router } from 'express';

import UsersRouter from './users/UsersRoutes.js';
import SessionRouter from './session/SessionRouter.js';

const routes = Router();

routes.get('/', (req, res) => res.status(200).send('hello world!'))
routes.use('/session', SessionRouter);
routes.use('/users', UsersRouter);

export default routes;

