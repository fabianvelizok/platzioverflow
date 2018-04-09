import express from 'express';

const app = express.Router();

// Fake question
const question = {
  _id: 1,
  title: 'New question about android',
  description: 'Some description about Android.manifest',
  createdAt: new Date(),
  icon: 'devicon-android-plain colored',
  answers: [],
  user: {
    firstName: 'Fabián',
    lastName: 'Veliz',
    email: 'velizfabianhoracio@gmail.com',
    password: '123123123'
  }
};

const questions = new Array(10).fill(question);

// /api/questions
app.get('/', (req, res) => {
  res.status(200).json(questions);
});

// /api/questions/:id
app.get('/:id', (req, res) => {
  res.status(200).json(question);
});

export default app;
