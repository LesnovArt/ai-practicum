import { OpenAIClient } from '../service/index.js';
import { errorHandler } from './error-handler.js';

export const makeVector = async (input: string) => {
  const openai = OpenAIClient.getInstance();

  try {
    const vector = await openai.getVector({ input });

    console.log(
      `Vector was successfully created! Total Tokens: ${vector.usage.total_tokens}`
    );
    return vector;
  } catch (error) {
    console.log('Error in makeVector');
    errorHandler(error);
  }
};
