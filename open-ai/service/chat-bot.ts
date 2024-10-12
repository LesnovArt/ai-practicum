import readline from 'readline';

import {
  CreateChatCompletionProps,
  ResultCompletionMsg,
  SendQuestionToAIProps,
} from '../types/index.js';
import { runCompletion } from '../handlers/index.js';

export class ChatBot extends readline.Interface {
  constructor(options: readline.ReadLineOptions) {
    super(options);
  }

  async askQuestion(query: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.question(query, (answer: string) => {
          resolve(answer);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async sendQuestionToAI({
    question,
    completionsOptions,
  }: SendQuestionToAIProps): Promise<ResultCompletionMsg | undefined> {
    const body: CreateChatCompletionProps = {
      messages: [{ role: 'user', content: question }],
      ...completionsOptions,
    };

    return runCompletion(body);
  }
}
