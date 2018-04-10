import express from 'express';

const app = express.Router();

// Fake data
const fakeUser = {
  firstName: 'Fabián',
  lastName: 'Veliz',
  email: 'velizfabianhoracio@gmail.com',
  password: '123123123'
}

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

// Endpoints

// GET /api/questions
app.get('/', (req, res) => {
  res.status(200).json(fakeQuestions);
});

// GET /api/questions/:id
app.get('/:id', questionMiddleware, (req, res) => {
  res.status(200).json(req.question);
});

app.post('/', (req, res) => {
  const date = new Date();
  const currentQuestion = req.body;

  currentQuestion._id = date.getTime();
  currentQuestion.createdAt = date;
  currentQuestion.answers = [];
  currentQuestion.user = fakeUser;

  fakeQuestions.unshift(currentQuestion);

  res.status(201).json(currentQuestion);
})

export default app;
