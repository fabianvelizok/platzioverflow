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

// GET /api/questions
app.get('/', (req, res) => {
  res.status(200).json(fakeQuestions);
});

// GET /api/questions/:id
app.get('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const currentQuestion = fakeQuestions
    .find(fakeQuestion => fakeQuestion._id === id) || {};
  res.status(200).json(currentQuestion);
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
