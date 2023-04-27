import cors from 'cors';
import express, { Router } from 'express';

const PORT: string | number = process.env.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(Router().get('/', (req, res) => res.send('Hello World!')));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
