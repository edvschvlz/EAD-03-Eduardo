import { Router } from 'express';

import { authentication, sessionUser } from '../controllers/SessionController.js';

import { Authentication } from '../middlewares/Authentication.js';

const SessionRouter = Router();

SessionRouter.post('/auth', authentication);
SessionRouter.get('/auth', Authentication, (req, res) => res.status(200).send(req.user));
SessionRouter.get('/user', Authentication, sessionUser);

export default SessionRouter;
