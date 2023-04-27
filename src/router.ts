import { Router } from 'express';

import routes from './routes';

const router = Router();

router.use('/justify', routes.justifyRouter);

export default router;
