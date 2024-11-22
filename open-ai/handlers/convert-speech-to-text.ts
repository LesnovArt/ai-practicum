import path from 'path';

import { OpenAIClient } from '../service/index.js';
import { STTCreateProps } from '../types/index.js';
import { errorHandler } from './error-handler.js';
import { getDirname, readFile } from '../utils/index.js';
import { Mp3Folder } from '../constants.js';

const AI = OpenAIClient.getInstance();

const dirname = getDirname();
const DEFAULT_FILE_TO_READ = path.resolve(dirname, `../${Mp3Folder}/test.mp3`);

export const convertSpeechToText = async ({
  sttConfig,
  filePath = DEFAULT_FILE_TO_READ,
}: {
  sttConfig?: Partial<STTCreateProps>;
  filePath: string;
}) => {
  // TODO add log levels and leave it for debug mode
  // console.log('--/-- Start STT Prompt execution... --/--');

  try {
    const getStream = (filePath: string) => readFile(filePath);
    const transcription = await AI.speechToText({
      ...sttConfig,
      file: getStream(filePath),
    });

    console.log('Speech-to-text:');
    console.log(`Transcription: ${transcription}`);
    return transcription;
  } catch (error: unknown) {
    errorHandler(error);
  } finally {
    // TODO add log levels and leave it for debug mode
    // console.log('--/-- STT Prompt finished execution --/--');
  }
};
