import { InputOutputInterface } from '../service/index.js';
import { CreateChatCompletionProps } from './openai.js';

export type SendQuestionToAIProps = {
  question?: string;
  completionsOptions?: Partial<CreateChatCompletionProps>;
};

export type ChatBotConstructor = {
  inputOutput: InputOutputInterface;
  maxTokensAllowed?: number;
  maxHistoryDepth?: number;
};
