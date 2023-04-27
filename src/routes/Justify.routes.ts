import { Router } from 'express';

import { justify } from '../controllers';

export const justifyRouter = Router();

justifyRouter.post('/', justify);
