import { OpenAIClient } from '../service/index.js';
import { CompletionsRunnerProps } from '../types/handlers.js';
import { ResultCompletionMsg } from '../types/index.js';
import { errorHandler } from './error-handler.js';

const AI = OpenAIClient.getInstance();

export const runCompletion = async ({
  messages,
  /**
   * suggest popular destinations
   */
  temperature,
  /**
   * output is more focused
   */
  top_p,
  /**
   * limit on response length in tokens
   */
  max_tokens = 70,
  /**
   * number of completions generated per prompt
   */
  n = 1,
  /**
   * Discourages repetition in the model’s outputs
   */
  frequency_penalty,
  /**
   * stands to keep results equal
   */
  seed,
}: CompletionsRunnerProps): Promise<ResultCompletionMsg | undefined> => {
  // TODO add log levels and leave it for debug mode
  // console.log('--/-- Start Prompt execution... --/--');

  try {
    const response = await AI.createChatCompletion({
      messages,
      temperature,
      top_p,
      max_tokens,
      n,
      frequency_penalty,
      seed,
    });

    if (!response) {
      throw { status: 'failed', message: 'No response' };
    }

    if (response.refusal !== null) {
      throw {
        status: 'failed',
        message: `Refused. Reason: ${response.refusal}`,
      };
    }

    return response;
  } catch (error: unknown) {
    errorHandler(error);
  } finally {
    // TODO add log levels and leave it for debug mode
    // console.log('--/--Prompt finished execution --/--');
  }
};
