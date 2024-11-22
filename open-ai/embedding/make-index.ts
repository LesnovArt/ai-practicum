import { createIndex } from '../handlers/index.js';

const INDEX_NAME = 'ai-practice';

export const makeIndex = async () => {
  await createIndex(INDEX_NAME);
};
