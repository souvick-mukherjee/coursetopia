import express, { Application } from 'express';
import { connectMongoDB } from './connections';
import dotenv from 'dotenv';
dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT || '7000');

import adminRoute from './routes/admin';
import userRoute from './routes/user';

connectMongoDB(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.use(express.json());
    app.use('/api/admin', adminRoute);
    app.use('/api/user', userRoute);

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });