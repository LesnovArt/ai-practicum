import OpenAI from 'openai';
import { ChatCompletionMessage } from 'openai/resources/index.js';

export type NonStreamAIPayload =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

export type CreateChatCompletionProps = Omit<NonStreamAIPayload, 'model'> & {
  model?: NonStreamAIPayload['model'];
};

export type AIMessages = NonStreamAIPayload['messages'];

export enum AIRoles {
  user = 'user',
  system = 'system',
  assistant = 'assistant',
}

export type AIRolesTypes = `${AIRoles}`;

export type ResultCompletionMsg = ChatCompletionMessage;
