import { Router } from 'express';

import { authentication } from './SessionController.js';

const SessionRouter = Router();

SessionRouter.post('/auth', authentication);

export default SessionRouter;
