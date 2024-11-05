import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

import authRouter from './routes/auth-router';

const app = express();
const port = process.env.PORT;

// CORS middleware
app.use(cors({origin: `http://localhost:${process.env.CLIENT_PORT || 5173}`}));

// Auth routes
app.use('/auth', authRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
