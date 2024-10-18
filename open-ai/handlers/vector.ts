import { EmbeddingManager } from '../service/index.js';
import { errorHandler } from './error-handler.js';
import { QueryByVectorValuesProps, UpsertProps } from '../types/index.js';

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

export const insertVector = async (props: UpsertProps) => {
  const embManager = EmbeddingManager.getInstance();

  try {
    await embManager.upsertEmbedding(props);
  } catch (error) {
    console.log('Error in insertVector');

    errorHandler(error);
  }
};

export const queryIndexByVector = async (props: QueryByVectorValuesProps) => {
  const embManager = EmbeddingManager.getInstance();

  try {
    await embManager.querySimilar(props);
  } catch (error) {
    console.log('Error in queryIndexByVector');
    errorHandler(error);
  }
};
