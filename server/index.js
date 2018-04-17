import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl } from './config';

const PORT = 3000;
const debug = new Debug('Platzioverflow:root');

// Use ES2015 Promise system
mongoose.Promise = global.Promise;

async function startConnection() {
  await mongoose.connect(mongoUrl);

  app.listen(PORT, () => {
    debug(`Server is running on port ${PORT}`);
  });
}

startConnection();

