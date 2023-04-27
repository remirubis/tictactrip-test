import { Router } from 'express';

import { generateAccessToken } from '../controllers';

export const tokenRouter = Router();

tokenRouter.post('/', generateAccessToken);
