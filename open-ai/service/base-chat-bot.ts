import {
  CreateChatCompletionProps,
  ResultCompletionMsg,
  SendQuestionToAIProps,
  AIMessage,
  AIRoles,
  AIRolesTypes,
} from '../types/index.js';
import { runCompletion } from '../handlers/index.js';
import { InputOutputInterface } from './input-output/index.js';

export class ChatBot {
  // optimize stored context to prevent overprice under sanding that as a part of request
  private history: AIMessage[] = [];
  private inputOutput: InputOutputInterface;

  constructor(inputOutput: InputOutputInterface) {
    this.inputOutput = inputOutput;
  }

  updateHistory(message: AIMessage): void {
    this.history.push(message);
  }

  getFullHistory(): AIMessage[] {
    return [...this.history];
  }

  getSlicedHistory(historyLength: number): AIMessage[] {
    const start = Math.max(0, this.history.length - historyLength);
    return this.history.slice(start);
  }

  clearHistory(): void {
    this.history = [];
  }

  buildMessage(role: AIRolesTypes, content?: string | null): AIMessage {
    return {
      role,
      content: content || '<invalid content>',
    };
  }

  async askQuestion(query: string): Promise<string> {
    return this.inputOutput.askQuestion(query);
  }

  async sendQuestionToAI({
    question = '',
    completionsOptions,
  }: SendQuestionToAIProps): Promise<ResultCompletionMsg | undefined> {
    const body: CreateChatCompletionProps = {
      messages: [{ role: AIRoles.user, content: question }],
      ...completionsOptions,
    };

    return runCompletion(body);
  }

  close(): void {
    this.inputOutput.close();
  }
}
