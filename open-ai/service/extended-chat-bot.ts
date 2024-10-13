/* eslint-disable @typescript-eslint/no-explicit-any */
import { EventEmitter } from 'events';
import {
  CreateChatCompletionProps,
  ResultCompletionMsg,
  SendQuestionToAIProps,
  AIRoles,
} from '../types/index.js';
import { runCompletion } from '../handlers/index.js';
import { InputOutputInterface } from './input-output/index.js';
import { ChatBot } from './base-chat-bot.js';

type SupportedEvents = 'onAsk' | 'onAISent' | 'onAIAnswer' | 'chatClosed';

export class ExtendedChatBot extends ChatBot {
  private eventEmitter: EventEmitter;

  constructor(inputOutput: InputOutputInterface) {
    super(inputOutput);
    this.eventEmitter = new EventEmitter();
  }

  on(event: SupportedEvents, listener: (...args: any[]) => void) {
    this.eventEmitter.on(event, listener);
  }

  off(event: SupportedEvents, listener: (...args: any[]) => void) {
    this.eventEmitter.off(event, listener);
  }

  async askQuestion(query: string): Promise<string> {
    const question = await super.askQuestion(query);
    /**
     * occurs after readline pass the data
     */
    this.eventEmitter.emit('onAsk', question);
    return question;
  }

  async sendQuestionToAI({
    question = '',
    completionsOptions,
  }: SendQuestionToAIProps): Promise<ResultCompletionMsg | undefined> {
    const body: CreateChatCompletionProps = {
      messages: [{ role: AIRoles.user, content: question }],
      ...completionsOptions,
    };
    /**
     * occurs before sending to AI completions
     */
    this.eventEmitter.emit('onAISent', body);
    const response = await runCompletion(body);
    /**
     * occurs after receiving from AI completions
     */
    this.eventEmitter.emit('onAIAnswer', response);
    return response;
  }

  close(): void {
    this.eventEmitter.emit('chatClosed');
    this.eventEmitter.removeAllListeners();
    super.close();
  }
}
