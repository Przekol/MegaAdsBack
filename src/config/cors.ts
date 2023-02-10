import cors from 'cors';

export const corsInit = cors({
  origin: 'http://localhost:3000',
  methods: ['POST', 'PUT', 'GET', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
});
