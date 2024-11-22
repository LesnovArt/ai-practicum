import { OpenAIEmbeddings } from '@langchain/openai';

export const getEmbeddingModel = (model = 'text-embedding-3-large') => {
  return new OpenAIEmbeddings({
    model,
    apiKey: process.env.OPEN_AI_KEY,
  });
};
