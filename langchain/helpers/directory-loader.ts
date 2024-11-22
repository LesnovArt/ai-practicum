import path from 'path';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import {
  JSONLoader,
  JSONLinesLoader,
} from 'langchain/document_loaders/fs/json';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { CSVLoader } from '@langchain/community/document_loaders/fs/csv';
import { getDirname } from './get-dirname.js';

const dirname = getDirname();
const DATA_FOLDER = 'data';

const DEFAULT_FILE_PATH = path.resolve(dirname, `../${DATA_FOLDER}`);

export const directoryLoader = (filePath = DEFAULT_FILE_PATH) =>
  new DirectoryLoader(filePath, {
    '.json': (path) => new JSONLoader(path, '/texts'),
    '.jsonl': (path) => new JSONLinesLoader(path, '/html'),
    '.txt': (path) => new TextLoader(path),
    '.csv': (path) => new CSVLoader(path, 'text'),
  });
