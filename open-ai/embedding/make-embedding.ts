import { insertVector, makeVector } from '../handlers/index.js';

const clientInfo = `John Doe, 52-year-old male, has a stable condition of hypertension managed with medication. 
    Post knee surgery, he experiences occasional stiffness and mild pain. 
    He prefers low-impact exercises, including water aerobics and stationary cycling, to aid his knee recovery. 
    He is also incorporating flexibility and balance exercises, such as gentle yoga and tai chi, into his routine to enhance mobility and reduce the risk of falls.
`;

const INDEX_NAME = 'ai-practice';

export const makeEmbedding = async () => {
  const vector = await makeVector(clientInfo);

  if (!vector) {
    throw new Error('Vector creation failed');
  }

  await insertVector({
    indexName: INDEX_NAME,
    upsertPayload: [
      {
        values: vector.data.embedding,
        id: 'client_info',
        metadata: { text: 'John Doe' },
      },
    ],
  });
};
