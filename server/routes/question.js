import express from 'express';
import Debug from 'debug';

import { requireMiddleware, questionMiddleware } from '../middlewares';
import { question } from '../db-api';
import { handleError } from '../utils';
import { User } from '../models';

const app = express.Router();
const debug = new Debug('Platzioverflow:routes');

// GET /api/questions
app.get('/', async (req, res) => {
  try {
    const { sort } = req.query;
    const questions = await question.findAll(sort);
    res.status(200).json(questions);
  } catch (error) {
    handleError(error, res);
  }
});

// GET /api/questions/:id
app.get('/:id', questionMiddleware, async (req, res) => {
  try {
    const currentQuestion = req.question;
    res.status(200).json(currentQuestion);
  } catch (error) {
    handleError(error, res);
  }
});

// POST /api/questions
app.post('/', requireMiddleware, async (req, res) => {
  const { title, description, icon } = req.body;

  const questionObject = {
    title,
    description,
    icon,
    user: req.user._id
  };

  try {
    const newQuestion = await question.create(questionObject);
    res.status(201).json(newQuestion);
  } catch (error) {
    handleError(error, res);
  }
});

// POST /api/questions/:id/answers
app.post('/:id/answers', requireMiddleware, questionMiddleware, async (req, res) => {
  const currentQuestion = req.question;
  const answer = req.body;

  answer.createdAt = new Date();
  answer.user = new User(req.user);

  try {
    const newAnswer = await question.createAnswer(currentQuestion, answer);
    res.status(201).json(newAnswer);
  } catch (error) {
    handleError(error, res);
  }

});

export default app;
