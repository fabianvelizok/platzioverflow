import { question } from '../db-api';
import { handleError } from '../utils';

export const questionMiddleware = async (req, res, next) => {
  try {
    const currentQuestion = await question.findById(req.params.id);
    req.question = currentQuestion;
    next();
  } catch (error) {
    handleError(error, res);
  }
};
