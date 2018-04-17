import express from 'express';

import { requireMiddleware } from '../middlewares';
import { question } from '../db-api';
import Debug from 'debug';

const debug = new Debug('Platzioverflow:routes');

const app = express.Router();

// GET /api/questions
app.get('/', async (req, res) => {
  try {
    const questions = await question.findAll();
    res.status(200).json(questions);
  } catch (error) {
    debug(error);
    res.status(500).json({
      message: 'An error ocurred.',
      error
    })
  }
});

// GET /api/questions/:id
app.get('/:id', (req, res) => {
  const question = req.question;
  res.status(200).json(question);
});

// POST /api/questions
app.post('/', requireMiddleware, (req, res) => {
  const date = new Date();
  const questions = req.questions;
  const newQuestion = req.body;

  newQuestion._id = date.getTime();
  newQuestion.createdAt = date;
  newQuestion.answers = [];
  newQuestion.user = req.user;

  questions.unshift(newQuestion);

  res.status(201).json(newQuestion);
});

// POST /api/questions/:id/answers
app.post('/:id/answers', requireMiddleware, (req, res) => {
  const question = req.question;
  const newAnswer = req.body;

  newAnswer.createdAt = new Date();
  newAnswer.user = req.user;

  question.answers.push(newAnswer);

  res.status(201).json(newAnswer);
});

export default app;
