import path from 'path';

import { convertSpeechToText } from '../handlers/index.js';
import { getDirname } from '../utils/get-dirname.js';
import { Mp3Folder } from '../constants.js';

const fileName = 'output.mp3';
const dirname = getDirname();
const filePath = path.resolve(dirname, `../${Mp3Folder}/${fileName}`);

export const makeTranscription = async () => convertSpeechToText({ filePath });
