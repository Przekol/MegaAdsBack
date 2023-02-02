import express, { json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errorMiddleware, notFoundMiddleware } from './middleware';

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
  }),
);
app.use(json());

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
