import { CreateChatCompletionProps } from './openai.js';

export type SendQuestionToAIProps = {
  question: string;
  completionsOptions?: Partial<CreateChatCompletionProps>;
};
