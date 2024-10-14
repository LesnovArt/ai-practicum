import { OpenAI } from 'openai';
import { OpenAIModels } from './models.js';
import {
  CreateChatCompletionProps,
  CreateDalleImageProps,
} from '../types/index.js';

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
    const { model = OpenAIModels['gpt-4o-mini'], messages, ...rest } = body;
    const completion = await this.openai.chat.completions.create({
      model,
      messages,
      ...rest,
    });
    return completion.choices[0].message;
  }

  public async createDalleImage(body: CreateDalleImageProps) {
    const {
      model = OpenAIModels['dall-e-2'],
      prompt,
      size = '256x256',
      quality = 'standard',
      n = 1,
      response_format = 'url',
    } = body;

    const response = await this.openai.images.generate({
      model,
      prompt,
      size,
      quality,
      n,
      response_format,
    });

    return response.data[0].url;
  }
}
