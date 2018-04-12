import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';

const debug = new Debug('Platzioverflow:auth');
const app = express();

// Fake data
const fakeUser = {
  _id: 1,
  firstName: 'Fabián',
  lastName: 'Veliz',
  email: 'velizfabianhoracio@gmail.com',
  password: '123123123'
}

const fakeUsers = new Array(10).fill(fakeUser);

const findUserByEmail = (email) => {
  const currentUser = fakeUsers.find(user => user.email === email);
  return currentUser;
}

const comparePasswords = (enteredPassword, userPassword) => {
  return enteredPassword === userPassword;
}

const handleLoginError = (res) => {
  return res.status(401).json({
    message: 'Login failed.',
    error: 'Wrong email or password.'
  });
}

app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);
  const secret = 'secret'

  if (!user) {
    debug(`User with email: ${email} not found.`);
    return handleLoginError(res);
  }

  const match = comparePasswords(password, user.password);

  if (!match) {
    debug(`Passwords don't match.`);
    return handleLoginError(res);
  }

  // Generate token
  const token = jwt.sign({ user }, secret, { expiresIn: 86400 });
  res.status(200).json({
    message: 'Login succeded',
    token,
    user: {
      _id,
      firstName,
      lastName,
      email,
    }
  });
});

export default app;
