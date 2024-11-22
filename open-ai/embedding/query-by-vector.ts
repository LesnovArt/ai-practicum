import { makeVector, queryIndexByVector } from '../handlers/index.js';

const clientInfo = `John`;

const INDEX_NAME = 'ai-practice';

export const queryByVector = async () => {
  const vector = await makeVector(clientInfo);

  if (!vector) {
    throw new Error('Vector creation failed');
  }
  console.log(`Vector: ${vector.data.embedding}`);

  const results = await queryIndexByVector({
    indexName: INDEX_NAME,
    vector: vector.data.embedding,
    topK: 5,
    includeValues: true,
  });

  console.log(`Results: ${results}`);
  return results;
};
