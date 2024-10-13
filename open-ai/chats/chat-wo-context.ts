import { ReadLineOptions } from 'readline';
import { ChatBot, ReadlineInterface } from '../service/index.js';

const initialOptions = {
  input: process.stdin,
  output: process.stdout,
};

const completionsOptions = {
  temperature: 0.5,
  top_p: 0.9,
  max_tokens: 70,
  frequency_penalty: 0.5,
};

export const makeChatWithOutContext = async (
  chatOptions: ReadLineOptions = initialOptions
) => {
  const inputOutput = new ReadlineInterface(chatOptions);
  const chat = new ChatBot(inputOutput);

  try {
    const passedQuestion = await chat.askQuestion('Ask question: ');
    const aiResponse = await chat.sendQuestionToAI({
      question: passedQuestion,
      completionsOptions,
    });
    return { chat, aiResponse };
  } catch (error) {
    return { chat, error };
  } finally {
    chat.close();
  }
};
