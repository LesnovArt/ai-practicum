import { getEncoding, Tiktoken } from 'js-tiktoken';

import {
  CreateChatCompletionProps,
  ResultCompletionMsg,
  SendQuestionToAIProps,
  AIMessage,
  AIRoles,
  AIRolesTypes,
  ChatBotConstructor,
} from '../types/index.js';
import { runCompletion } from '../handlers/index.js';
import { InputOutputInterface } from './input-output/index.js';

export class ChatBot {
  // optimize stored context to prevent overprice under sanding that as a part of request
  private history: AIMessage[] = [];
  private inputOutput: InputOutputInterface;
  private encoder: Tiktoken;
  private maxTokensAllowed: number | null = null;
  private maxHistoryDepth: number | null = null;
  private totalTokensUsed = 0;

  constructor({
    inputOutput,
    maxTokensAllowed,
    maxHistoryDepth,
  }: ChatBotConstructor) {
    this.inputOutput = inputOutput;
    this.encoder = getEncoding('gpt2');

    if (maxTokensAllowed) {
      this.maxTokensAllowed = maxTokensAllowed;
    }
    if (maxHistoryDepth) {
      this.maxHistoryDepth = maxHistoryDepth;
    }
  }

  // History
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
    this.totalTokensUsed = 0;
  }

  buildMessage(role: AIRolesTypes, content?: string | null): AIMessage {
    return {
      role,
      content: content || '<invalid content>',
    };
  }

  // Tokens management
  private countTokens(messages: AIMessage[]): number {
    return messages.reduce((total, msg) => {
      // TODO handle Array in msg
      const msgContent = typeof msg.content === 'string' ? msg.content : '';
      const msgTokenCount = this.encoder.encode(msgContent).length;
      const roleTokenCount = this.encoder.encode(msg.role).length;

      return total + msgTokenCount + roleTokenCount;
    }, 0);
  }

  checkTheLimitExceeded(): boolean {
    return (
      this.maxTokensAllowed !== null &&
      this.totalTokensUsed > this.maxTokensAllowed
    );
  }

  protected handleTokenLimitExceeded(): void {
    console.log('Token limit exceeded. The chat will be closed.');
    this.close();
  }

  protected updateTokenUsage(messages: AIMessage[]): void {
    const tokenCount = this.countTokens(messages);
    this.totalTokensUsed += tokenCount;

    console.log('this.totalTokensUsed', this.totalTokensUsed);
    if (this.checkTheLimitExceeded()) {
      this.handleTokenLimitExceeded();
    }
  }

  protected updateTokenUsageWithAutoClearing(messages: AIMessage[]): void {
    const tokenCount = this.countTokens(messages);
    this.totalTokensUsed += tokenCount;

    while (this.checkTheLimitExceeded()) {
      const removedMessage = this.history.shift();
      if (removedMessage) {
        this.totalTokensUsed -= this.countTokens([removedMessage]);
      }
    }
  }

  summarizeOldMessages(): void {
    if (this.maxHistoryDepth === null) {
      console.log('Provide maxHistoryDepth value to make summarization');
      return;
    }

    if (this.history.length > this.maxHistoryDepth) {
      const olderMessages = this.history.slice(0, -this.maxHistoryDepth);
      const summaryContent = olderMessages.map((msg) => msg.content).join(' ');

      const summaryMessage: AIMessage = {
        role: AIRoles.assistant,
        content: `Summary of previous conversation: ${summaryContent}`,
      };

      this.history = [
        summaryMessage,
        ...this.history.slice(-this.maxHistoryDepth),
      ];
    }
  }

  getTotalTokensUsed(): number {
    return this.totalTokensUsed;
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
    this.clearHistory();
    this.inputOutput.close();
  }
}
