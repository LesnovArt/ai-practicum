import { ReadlineInterface } from '../services/index.js';

export const askQuestion = async (question: string, rl: ReadlineInterface) => {
  const result = await rl.askQuestion(question);

  return result;
};
