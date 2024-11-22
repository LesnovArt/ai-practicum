import { insertVector } from '../../handlers/index.js';
import { makeEmbeddings } from './make-embeddings.js';
import { ClientVectorResultItem } from './types.js';

const INDEX_NAME = 'ai-practice';

export const upsertEmbeddingItemByNameSpace = async ({
  category,
  ...payload
}: ClientVectorResultItem) => {
  console.log(
    `Data upserted into namespace: ${category} for subCategory: ${payload.id}`
  );

  await insertVector({
    indexName: INDEX_NAME,
    upsertPayload: [payload],
    namespaceName: category,
  });
};

export const upsertEmbeddingsByNamespace = async () => {
  const clientDataWithEmbeddings = await makeEmbeddings();

  const upsertEmbeddingPromises = clientDataWithEmbeddings.map(
    upsertEmbeddingItemByNameSpace
  );

  return Promise.all(upsertEmbeddingPromises);
};
