import express from 'express';
import bodyParser from 'body-parser';
// Routes
import {
  question,
  auth,
} from './routes';

const app = express();

// Understand json format
app.use(bodyParser.json());
// Understand utf-8 format
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept')
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
  });
}

app.use('/api/questions', question);
app.use('/api/auth', auth);

export default app;
