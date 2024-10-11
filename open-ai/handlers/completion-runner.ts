import { OpenAIClient } from '../service/index.js';
import { AIMessages, ResultCompletionMsg } from '../types/index.js';
import { errorHandler } from './error-handler.js';

const AI = OpenAIClient.getInstance();

export type CompletionsRunnerProps = {
  messages: AIMessages;
  onSuccess?: (response: ResultCompletionMsg) => void | ResultCompletionMsg;
  onFailure?: (error: string) => string | void;
};

export const runCompletion = async ({
  messages,
  onSuccess,
  onFailure,
}: CompletionsRunnerProps): Promise<ResultCompletionMsg | undefined> => {
  console.log('--/-- Start Prompt execution... --/--');
  const response = await AI.createChatCompletion({ messages });

  try {
    if (!response) {
      throw { status: 'failed', message: 'No response' };
    }

    if (response.refusal !== null) {
      throw {
        status: 'failed',
        message: `Refused. Reason: ${response.refusal}`,
      };
    }

    console.log(response);
    onSuccess?.(response);

    return response;
  } catch (error: unknown) {
    errorHandler(error, onFailure);
  } finally {
    console.log('--/--Prompt finished execution --/--');
  }
};
