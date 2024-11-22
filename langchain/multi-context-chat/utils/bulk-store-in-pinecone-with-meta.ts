import { PineconeStore } from '@langchain/pinecone';
import { Document } from '@langchain/core/documents';
import path from 'path';
import {
  getEmbeddingModel,
  getPineconeIndex,
  directoryLoader,
  getDirname,
  handleError,
} from '../../helpers/index.js';
import {
  DataTypeAbbreviations,
  DataTypeMapper,
  PatientRecordCategory,
  PatientRecordMetadata,
  UserName,
} from '../../types/index.js';

const DataTypeMapper: DataTypeMapper = {
  pu: 'public',
  pr: 'private',
  s: 'sensitive',
};

const generateMetadata = (fileName: string): PatientRecordMetadata => {
  const [_, type, user, category] = fileName.split('_') as [
    string,
    DataTypeAbbreviations,
    UserName,
    string,
  ];

  return {
    user: user || 'unknown',
    category: (category.split('.')?.[0] as PatientRecordCategory) || 'general',
    timeStamp: Date.now(),
    type: DataTypeMapper[type ?? 'pu'],
  };
};

const createDocs = async (): Promise<Document[]> => {
  const dirname = getDirname();
  const DATA_FOLDER = 'john-doe';
  const filePath = path.resolve(dirname, `../${DATA_FOLDER}`);

  const loader = directoryLoader(filePath);
  const files = await loader.load();

  return files.map((file) => {
    const metadata = generateMetadata(file.metadata.source);
    return new Document({
      pageContent: file.pageContent,
      metadata,
    });
  });
};

export const storeEmbeddingsWithMultiContext = async () => {
  try {
    console.log('----/ retrieving index /-------');
    const pineconeIndex = getPineconeIndex();

    console.log('----/ retrieving embedding /-------');
    const embeddingModel = getEmbeddingModel();

    console.log('----/ creating docs with metadata /-------');
    const docs = await createDocs();

    console.log('----/ storing data /-------');
    await PineconeStore.fromDocuments(docs, embeddingModel, {
      pineconeIndex,
      maxConcurrency: 5,
    });
  } catch (error) {
    handleError(error);
  }
};
