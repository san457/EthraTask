import express, { Request, Response } from 'express';
import cookieParser from 'cookie-parser';
import http from 'http';

import { connectToDB } from './db/db';
import auth from './routes/auth';
import projects from "./routes/projects";
import tasks from "./routes/tasks";
import cors from 'cors';

const app = express();
const PORT = 3000;
const server = http.createServer(app);

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running...');
});


app.use('/auth', auth);
app.use('/projects', projects);
app.use('/tasks', tasks);



async function startServer() {
  await connectToDB();

  server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

startServer();
