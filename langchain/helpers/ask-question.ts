import { ReadlineInterface } from '../services/index.js';

export const askQuestion = async (question: string, rl: ReadlineInterface) => {
  const result = await rl.askQuestion(question);

  if (question === 'exit') {
    console.log('Have A Good Day !!!');
    rl.close();
  }

  return result;
};
