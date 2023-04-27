import { Router } from 'express';

import { justify } from '../controllers';
import { isAuthenticated } from '../middlewares';

export const justifyRouter = Router();

justifyRouter.post('/', isAuthenticated, justify);
