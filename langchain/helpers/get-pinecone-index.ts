import { Pinecone } from '@pinecone-database/pinecone';

const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY as string,
});

export const getPineconeIndex = (
  indexName: string = process.env.PINECONE_INDEX || ''
) => {
  return pinecone.Index(indexName);
};
