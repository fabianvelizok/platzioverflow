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

export const questionsMiddleware = (req, res, next) => {
  req.questions = fakeQuestions;
  next();
};

export const questionMiddleware = (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const currentQuestion = fakeQuestions
    .find(fakeQuestion => fakeQuestion._id === id) || {};
  req.question = currentQuestion;

  next();
};
