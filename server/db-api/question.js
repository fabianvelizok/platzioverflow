import { Question } from '../models';
import Debug from 'debug';

const debug = new Debug('Platzioverflow:db-api:question');

export default {

  findAll: async () => {
    debug('Finding all questions.');
    return await Question.find().populate('answers');
  },

  findById: async (_id) => {
    debug(`Finding question with _id: ${_id}`);
    return await Question
      .findOne({ _id })
      .populate('user') // Add user model
      .populate({
        path: 'answers',
        options: { sort: '-createdAt' },
        populate: {
          path: 'user', // Add user model inside each answer
          model: 'User'
        }
      });

  }
}
