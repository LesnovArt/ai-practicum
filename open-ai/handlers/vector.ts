import { PineconeRecord, RecordMetadata } from '@pinecone-database/pinecone';
import { EmbeddingManager } from '../service/index.js';
import { errorHandler } from './error-handler.js';

export const createIndex = async (name: string) => {
  const embManager = EmbeddingManager.getInstance();

  try {
    const indexModel = await embManager.createIndex({ name });

    console.log(`Index was created. DETAILS: ${indexModel}`);
    return indexModel;
  } catch (error) {
    errorHandler(error);
  }
};

export const insertVector = async ({
  indexName,
  upsertPayload,
}: {
  indexName: string;
  upsertPayload: PineconeRecord<RecordMetadata>[];
}) => {
  const embManager = EmbeddingManager.getInstance();

  try {
    await embManager.upsertEmbedding({ indexName, upsertPayload });
  } catch (error) {
    console.log('Error in insertVector');

    errorHandler(error);
  }
};
