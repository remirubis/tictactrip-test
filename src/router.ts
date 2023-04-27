import { Router } from 'express';

import routes from './routes';

const router = Router();

router.use('/justify', routes.justifyRouter);
router.use('/token', routes.tokenRouter);

export default router;
