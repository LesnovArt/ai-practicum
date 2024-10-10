import { OpenAI } from 'openai';
import { OpenAIModels } from './models.js';
import { CreateChatCompletionProps } from '../types/index.js';

export class OpenAIClient {
  private static instance: OpenAIClient;
  private openai: OpenAI;

  private constructor() {
    this.openai = new OpenAI();
  }

  public static getInstance(): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient();
    }
    return OpenAIClient.instance;
  }

  public async createChatCompletion(body: CreateChatCompletionProps) {
    const { model = OpenAIModels['gpt-4o-mini'], messages } = body;
    const completion = await this.openai.chat.completions.create({
      model,
      messages,
    });
    return completion.choices[0].message;
  }
}
