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
};

const comparePasswords = (enteredPassword, userPassword) => {
  return enteredPassword === userPassword;
};

const handleLoginError = (res) => {
  return res.status(401).json({
    message: 'Login failed.',
    error: 'Wrong email or password.'
  });
};

const generateToken = (user) => {
  const secret = 'secret'; // I'll move this soon.
  const token = jwt.sign({ user }, secret, { expiresIn: 86400 });
  return token;
};

// POST /api/auth/signin
app.post('/signin', (req, res) => {
  const { email, password } = req.body;
  const user = findUserByEmail(email);

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
  const token = generateToken(user);

  res.status(200).json({
    message: 'Login succeded',
    token,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  });
});

// POST /api/auth/signup
app.post('/signup', (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const user = {
    _id: new Date.getTime(),
    email,
    password,
    firstName,
    lastName,
  };

  fakeUsers.push(user);

  debug(`User created successfully`);

  const token = generateToken(user);

  res.status(201).json({
    message: 'Signup succeded',
    token,
    user: {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    }
  });
});

export default app;
