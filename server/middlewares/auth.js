import Debug from 'debug';
import jwt from 'jsonwebtoken';

import { secret } from '../config';

const debug = new Debug('Platzioverflow:authMiddleware');

// Fake data
const fakeUser = {
  _id: 1,
  firstName: 'Fabián',
  lastName: 'Veliz',
  email: 'velizfabianhoracio@gmail.com',
  password: '123123123'
}

export const fakeUsers = new Array(10).fill(fakeUser);

export const findUserByEmail = (email) => {
  const currentUser = fakeUsers.find(user => user.email === email);
  return currentUser;
};

export const requireMiddleware = (req, res, next) => {
  jwt.verify(req.query.token, secret, (err, token) => {
    if (err) {
      debug('Jwt failed.');
      return res.status(401).json({
        message: 'Unauthorized',
        error: err
      });
    }

    debug(`Token verified ${token}`);
    req.user = token.user;
    next();
  });
};
