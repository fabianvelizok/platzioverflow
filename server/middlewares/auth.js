import Debug from 'debug';
import jwt from 'jsonwebtoken';

import { secret } from '../config';

const debug = new Debug('Platzioverflow:authMiddleware');

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
