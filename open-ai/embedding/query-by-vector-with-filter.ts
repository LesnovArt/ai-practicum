import { makeVector, queryIndexByVector } from '../handlers/index.js';

const relevantInput = 'occasionally exacerbated';
// const relevantInput = 'discomfort from prolonged';
// const relevantInput = 'remote software developer';
const INDEX_NAME = 'ai-practice';

export const queryByVectorWithFilter = async (spaceName: string) => {
  const vector = await makeVector(relevantInput);

  if (!vector) {
    throw new Error('Vector creation failed');
  }
  console.log(`Vector: ${vector.data.embedding}`);

  const filter = {
    subCategory: { $ne: 'backPain' },
  };

  const results = await queryIndexByVector({
    namespaceName: spaceName,
    indexName: INDEX_NAME,
    vector: vector.data.embedding,
    topK: 20,
    includeValues: false,
    includeMetadata: true,
    filter,
  });

  console.log(`Query results in namespace ${spaceName}:`, results?.matches);
  return results;
};
