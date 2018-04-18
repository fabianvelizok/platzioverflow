import Debug from 'debug';
import app from './app';
import mongoose from 'mongoose';
import { mongoUrl, port } from './config';

const debug = new Debug('Platzioverflow:root');

// Use ES2015 Promise system
mongoose.Promise = global.Promise;

async function startConnection() {
  await mongoose.connect(mongoUrl);

  app.listen(port, () => {
    debug(`Server is running on port ${port}`);
  });
}

startConnection();

