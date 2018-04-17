import { Question } from '../models';
import Debug from 'debug';

const debug = new Debug('Platzioverflow:db-api:question');

export default {
  findAll: async () => {
    debug('Finding all questions.');
    return await Question.find().populate('answers');
  }
}
