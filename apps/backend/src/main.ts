import express, { Application } from 'express';

import mongoose from 'mongoose';
import cors from 'cors';
import { incrementCounter, getUserData, createOrGetUser } from './jobs/main';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI as string;
mongoose.set('strictQuery', false);
mongoose
  .connect(MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.post('/increment', incrementCounter);
app.get('/user/:id', getUserData);
app.post('/create-user', createOrGetUser);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
