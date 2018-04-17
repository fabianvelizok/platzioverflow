import express from 'express';
import Debug from 'debug';
import jwt from 'jsonwebtoken';
import {
  hashSync as hash,
  compareSync as comparePasswords
} from 'bcryptjs';

import { secret } from '../config';
import { User } from '../models';
import { handleError } from '../utils';

const debug = new Debug('Platzioverflow:auth');
const app = express();

// Error messages
const loginFailedError = 'Wrong email or password.';
const loginFailedMessage = 'Login failed.';

const generateToken = (user) => {
  const token = jwt.sign({ user }, secret, { expiresIn: 86400 });
  return token;
};

// POST /api/auth/signin
app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    debug(`User with email: ${email} not found.`);
    return handleError(loginFailedError, res, loginFailedMessage, 401);
  }

  const match = comparePasswords(password, user.password);

  if (!match) {
    debug(`Passwords don't match.`);
    return handleError(loginFailedError, res, loginFailedMessage, 401);
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
app.post('/signup', async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  const newUser = new User({
    email,
    password: hash(password, 10),
    firstName,
    lastName
  });

  const user = await newUser.save();

  debug('User created successfully.');

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
