import { Router } from 'express';

export const adRouter = Router();
adRouter.get('/', async (req, res) => {
  res.json({ ok: true });
});