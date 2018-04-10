import express from 'express';

const app = express.Router();

// Fake data
const fakeUser = {
  _id: 1,
  firstName: 'Fabián',
  lastName: 'Veliz',
  email: 'velizfabianhoracio@gmail.com',
  password: '123123123'
}

const fakeUsers = new Array(10).fill(fakeUser);

const fakeQuestion = {
  _id: 1,
  title: 'New question about android',
  description: 'Some description about Android.manifest',
  createdAt: new Date(),
  icon: 'devicon-android-plain colored',
  answers: [],
  user: fakeUser,
};

const fakeQuestions = new Array(10).fill(fakeQuestion);

// Middlewares

function questionMiddleware(req, res, next) {
  const id = parseInt(req.params.id, 10);
  const currentQuestion = fakeQuestions
    .find(fakeQuestion => fakeQuestion._id === id) || {};
  req.question = currentQuestion;

  next();
}

function userMiddleware(req, res, next) {
  const id = parseInt(req.params.id, 10) || 1;
  const currentUser = fakeUsers
    .find(fakeUser => fakeUser._id === id) || {};
  req.user = currentUser;

  next();
}

// Endpoints

// GET /api/questions
app.get('/', (req, res) => {
  res.status(200).json(fakeQuestions);
});

// GET /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question);
});

// POST /api/questions
app.post('/', userMiddleware, (req, res) => {
  const date = new Date();
  const newQuestion = req.body;

  newQuestion._id = date.getTime();
  newQuestion.createdAt = date;
  newQuestion.answers = [];
  newQuestion.user = req.user;

  fakeQuestions.unshift(newQuestion);

  res.status(201).json(newQuestion);
});

// POST /api/questions/:id/answers
app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
  const question = req.question;
  const newAnswer = req.body;

  newAnswer.createdAt = new Date();
  newAnswer.user = req.user;

  question.answers.push(newAnswer);

  res.status(201).json(newAnswer);
});

export default app;
