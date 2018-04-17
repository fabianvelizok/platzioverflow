import { Question } from '../models';
import Debug from 'debug';

const debug = new Debug('Platzioverflow:db-api:question');

export default {

  findAll: () => {
    debug('Finding all questions.');
    return Question.find().populate('answers');
  },

  findById: (_id) => {
    debug(`Finding question with _id: ${_id}`);
    return Question
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
  },

  create: (q) => {
    debug('Creating a new question.');
    const question = new Question(q);
    return question.save(question);
  }
}
