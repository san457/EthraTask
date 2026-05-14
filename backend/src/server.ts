import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';
import cors from 'cors';

import { connectToDB } from './db/db';

import auth from './routes/auth';
import projects from './routes/projects';
import tasks from './routes/tasks';

const app = express();

const PORT = Number(process.env.PORT) || 3000;

const server = http.createServer(app);

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
  });
});

app.use('/auth', auth);
app.use('/projects', projects);
app.use('/tasks', tasks);

async function startServer() {
  await connectToDB();

  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();