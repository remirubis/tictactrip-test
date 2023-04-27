import cors from 'cors';
import type { Application } from 'express';
import express from 'express';

import router from './router';

const app: Application = express();

app.use(cors());
app.use(express.text());
app.use('/api', router);

export default app;
