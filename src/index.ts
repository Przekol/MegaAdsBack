import * as dotenv from 'dotenv';
dotenv.config();
import express, { json } from 'express';
import 'express-async-errors';
import { corsInit, limiter } from './config';
import { errorMiddleware, notFoundMiddleware } from './middleware';

const app = express();
app.use(corsInit);
app.use(json());
app.use(limiter);

app.get('/', async (req, res) => {
  res.json('strona głowna');
});
app.get('/user', async (req, res) => {
  res.json({ user: 'Przemek' });
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);
app.listen(3001, '0.0.0.0', () => {
  console.log('Listening on http://localhost:3001');
});
