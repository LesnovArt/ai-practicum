import { OpenAI } from 'openai';
import { OpenAIModels } from './models.js';
import {
  CreateChatCompletionProps,
  CreateDalleImageProps,
  EmbeddingCreateProps,
  EmbeddingResult,
  STTCreateProps,
  TTSCreateProps,
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

  public async textToSpeech({ returnBuffer = true, ...body }: TTSCreateProps) {
    const { model = 'tts-1', voice = 'alloy', ...rest } = body;
    const audio = await this.openai.audio.speech.create({
      model,
      voice,
      ...rest,
    });

    if (returnBuffer) {
      const buffer = Buffer.from(await audio.arrayBuffer());

      return buffer;
    }

    return audio;
  }

  public async speechToText({ ...body }: STTCreateProps) {
    const { model = 'whisper-1', ...rest } = body;
    const transcription = (await this.openai.audio.transcriptions.create({
      model,
      ...rest,
    })) as unknown as { text: string };

    return transcription.text;
  }

  public async getVector(
    props: EmbeddingCreateProps
  ): Promise<EmbeddingResult> {
    const {
      model = 'text-embedding-3-small',
      encoding_format = 'float',
      dimensions = 768,
    } = props;

    const vector = await this.openai.embeddings.create({
      model,
      encoding_format,
      dimensions,
      ...props,
    });

    return { data: vector.data[0], usage: vector.usage };
  }
}
