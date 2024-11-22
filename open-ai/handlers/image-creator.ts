import { OpenAIClient } from '../service/index.js';
import { CreateDalleImageProps } from '../types/index.js';
import { errorHandler } from './error-handler.js';

const AI = OpenAIClient.getInstance();

export const createDalleImage = async (props: CreateDalleImageProps) => {
  // TODO add log levels and leave it for debug mode
  console.log('--/-- Start Image Prompt execution... --/--');

  try {
    const response = await AI.createDalleImage(props);

    if (!response) {
      throw { status: 'failed', message: 'No response' };
    }

    return response;
  } catch (error: unknown) {
    errorHandler(error);
  } finally {
    // TODO add log levels and leave it for debug mode
    console.log('--/--Image Prompt finished execution --/--');
  }
};
