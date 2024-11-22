import path from 'path';

import { OpenAIClient } from '../service/index.js';
import { TTSCreateProps, AcceptableBuffer } from '../types/index.js';
import { errorHandler } from './error-handler.js';
import { getDirname, writeBufferFile } from '../utils/index.js';
import { Mp3Folder } from '../constants.js';

const AI = OpenAIClient.getInstance();

export const convertTextToSpeech = async (
  props: TTSCreateProps,
  audioFileName?: string
) => {
  // TODO add log levels and leave it for debug mode
  // console.log('--/-- Start TTS Prompt execution... --/--');

  try {
    const buffer = (await AI.textToSpeech({
      ...props,
      returnBuffer: true,
    })) as AcceptableBuffer;

    if (!buffer) {
      throw { status: 'failed', message: 'No response' };
    }

    const currentDate = new Date().toISOString();
    const dirName = getDirname();
    const pathName = path.resolve(dirName, `../${Mp3Folder}/`);
    const fileName = audioFileName ?? `${currentDate}_speech.mp3`;

    await writeBufferFile({ path: pathName, fileName, buffer });

    console.log('Text-to-speech:');
    console.log(`Audio content written to file: ${fileName}`);
    return buffer;
  } catch (error: unknown) {
    errorHandler(error);
  } finally {
    // TODO add log levels and leave it for debug mode
    // console.log('--/-- TTS Prompt finished execution --/--');
  }
};
