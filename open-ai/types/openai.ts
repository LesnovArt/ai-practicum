import OpenAI from 'openai';
import { SpeechModel } from 'openai/resources/audio/speech';
import { TranscriptionCreateParams } from 'openai/resources/audio/transcriptions';
import {
  ChatCompletionMessage,
  ChatCompletionMessageParam,
} from 'openai/resources/index.js';

export type NonStreamAIPayload =
  OpenAI.Chat.Completions.ChatCompletionCreateParamsNonStreaming;

export type CreateChatCompletionProps = Omit<NonStreamAIPayload, 'model'> & {
  model?: NonStreamAIPayload['model'];
};

export type DalleImageParams = OpenAI.Images.ImageGenerateParams;

export type CreateDalleImageProps = Omit<DalleImageParams, 'model'> & {
  model?: DalleImageParams['model'];
};

export type TTSCreateParams = OpenAI.Audio.Speech.SpeechCreateParams;

export type TTSExtraParams = {
  returnBuffer?: boolean;
};

export type TTSCreateProps = Omit<TTSCreateParams, 'model' | 'voice'> & {
  model?: SpeechModel;
  voice?: TTSCreateParams['voice'];
} & TTSExtraParams;

export type STTCreateParams = TranscriptionCreateParams<'srt' | 'vtt' | 'text'>;
export type STTCreateProps = Omit<STTCreateParams, 'model'> & {
  model?: STTCreateParams['model'];
};

export type AIMessage = ChatCompletionMessageParam;
export type AIMessages = NonStreamAIPayload['messages'];

export enum AIRoles {
  user = 'user',
  system = 'system',
  assistant = 'assistant',
}

export type AIRolesTypes = `${AIRoles}`;

export type ResultCompletionMsg = ChatCompletionMessage;
