import { convertTextToSpeech } from '../handlers/index.js';
import { TTSCreateProps } from '../types/index.js';

const ttsConfig: TTSCreateProps = {
  voice: 'onyx',
  input: 'Hello, how are you today?',
  response_format: 'mp3',
};

const fileName = 'output.mp3';

export const makeSpeech = async () => convertTextToSpeech(ttsConfig, fileName);
