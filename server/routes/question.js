import express from 'express';

import {
  requireMiddleware,
  questionMiddleware,
  questionsMiddleware,
} from '../middlewares';

const app = express.Router();

// GET /api/questions
app.get('/', questionsMiddleware, (req, res) => {
  const questions = req.questions;
  res.status(200).json(questions);
});

// GET /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {
  const question = req.question;
  res.status(200).json(question);
});

// POST /api/questions
app.post('/', requireMiddleware, questionsMiddleware, (req, res) => {
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
app.post('/:id/answers', requireMiddleware, questionMiddleware, (req, res) => {
  const question = req.question;
  const newAnswer = req.body;

  newAnswer.createdAt = new Date();
  newAnswer.user = req.user;

  question.answers.push(newAnswer);

  res.status(201).json(newAnswer);
});

export default app;
