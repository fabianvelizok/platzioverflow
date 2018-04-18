import { Question, Answer } from '../models';
import Debug from 'debug';

const debug = new Debug('Platzioverflow:db-api:question');

export default {

  findAll: (sort) => {
    debug('Finding all questions.');
    return Question
      .find()
      .sort(sort)
      .populate('answers');
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

  create: (_question) => {
    debug('Creating a new question.');
    const question = new Question(_question);
    return question.save(question);
  },

  createAnswer: async (_question, _answer) => {
    debug(`Creating a new answer for question with id: ${_question._id}`);
    const answer = new Answer(_answer);
    const savedAnswer = await answer.save();
    _question.answers.push(savedAnswer);
    await _question.save();
    return savedAnswer;
  }
}
