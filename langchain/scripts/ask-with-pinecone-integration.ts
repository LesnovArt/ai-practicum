import { PineconeStore } from '@langchain/pinecone';
import type { Document } from '@langchain/core/documents';
import path from 'path';
import {
  getEmbeddingModel,
  getPineconeIndex,
  directoryLoader,
  getDirname,
  handleError,
} from '../helpers/index.js';

// TODO switch to directory loader
async function createDocs(): Promise<Document[]> {
  const dirname = getDirname();
  const DATA_FOLDER = 'embeddings';
  const filePath = path.resolve(dirname, `../${DATA_FOLDER}`);

  const loader = directoryLoader(filePath);
  return await loader.load();
}

export const storeEmbeddings = async () => {
  try {
    console.log('----/ creating index /-------');
    const pineconeIndex = getPineconeIndex();
    console.log('----/ creating embedding /-------');

    const embeddingModel = getEmbeddingModel();
    console.log('----/ loading doc /-------');
    const docs = await createDocs();
    console.log('----/ storing data /-------');
    await PineconeStore.fromDocuments(docs, embeddingModel, {
      pineconeIndex,
      maxConcurrency: 5, // Maximum number of batch requests to allow at once. Each batch is 1000 vectors.
    });
  } catch (error) {
    handleError(error);
  }
};
