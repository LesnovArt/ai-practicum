import { makeVector } from '../../handlers/index.js';
import { clientInfo } from './mock.js';
import { prepareData } from './prepare-data.js';
import { ClientVectorResultItem } from './types.js';

const getClientDataWithEmbedding = async (
  dataSet: ClientVectorResultItem
): Promise<ClientVectorResultItem> => {
  const vector = await makeVector(dataSet.metadata.description);

  if (!vector) {
    return dataSet;
  }

  return {
    ...dataSet,
    values: vector.data.embedding,
  };
};

export const makeEmbeddings = async () => {
  const preparedData = prepareData(clientInfo);
  const vectorPromises = preparedData.map(getClientDataWithEmbedding);

  return Promise.all(vectorPromises);
};
