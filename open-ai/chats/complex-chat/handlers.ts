/* eslint-disable @typescript-eslint/no-unused-vars */
import { errorHandler } from '../../handlers/index.js';
import { ExtendedChatBot } from '../../service/index.js';
import {
  AIMessage,
  CreateChatCompletionProps,
  ResultCompletionMsg,
} from '../../types/index.js';
import { completionsOptions, DEFAULT_MAX_CONTEXT_DEPTH } from './constants.js';

type PromptResult = {
  aiResponse: null | AIMessage;
  error: null | unknown;
};

export const promptUserForInput = async ({
  chat,
}: {
  chat: ExtendedChatBot;
}): Promise<PromptResult> => {
  const result: PromptResult = { aiResponse: null, error: null };

  try {
    const question = await chat.askQuestion('Enter your message: ');
    const userMsg = chat.buildMessage('user', question);
    chat.updateHistory(userMsg);

    const msgWithHistory = chat.getSlicedHistory(DEFAULT_MAX_CONTEXT_DEPTH);
    const aiResponse = await chat.sendQuestionToAI({
      completionsOptions: { ...completionsOptions, messages: msgWithHistory },
    });

    const aiMsg = chat.buildMessage('assistant', aiResponse?.content);
    chat.updateHistory(aiMsg);
    result.aiResponse = aiMsg;
  } catch (error) {
    errorHandler(error);
    result.error = error;
  }

  return result;
};

export const handleAsk = (chat: ExtendedChatBot) => (query: string) => {
  console.log(`You asked: ${query}`);
  if (query === 'exit') {
    chat.close();
  }
};

// TODO add log levels and leave it for debug mode
export const handleAiSent = (_body: CreateChatCompletionProps) => {
  // console.log(`Sent to AI: ${JSON.stringify(body)}`);
};

export const handleAiAnswer =
  (chat: ExtendedChatBot) =>
  async (response: ResultCompletionMsg | undefined) => {
    console.log(`AI says: ${response?.content}`);
    const { error } = await promptUserForInput({ chat });

    if (error) {
      chat.close();
    }
  };

export const handleChatClosed = () => {
  console.log('Chat was closed. Have a Good Day! Bye Bye!');
};
