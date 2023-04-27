import { Router } from 'express';

import { justify } from '../controllers';
import { isAuthenticated, rateLimit } from '../middlewares';

export const justifyRouter = Router();

justifyRouter.post('/', [isAuthenticated, rateLimit], justify);
