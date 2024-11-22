import { TextLoader } from 'langchain/document_loaders/fs/text';
import path from 'path';
import { getDirname } from './get-dirname';

const DATA_FOLDER = 'data';

export const loadText = async (fileName: string) => {
  const dirname = getDirname();
  const filePath = path.resolve(dirname, `../${DATA_FOLDER}/${fileName}`);
  const loader = new TextLoader(filePath);
  const documents = await loader.load();
  const textContentArray = documents.map((document) => document.pageContent);

  return textContentArray.join('\n');
};
