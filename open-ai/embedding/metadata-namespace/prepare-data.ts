import { ClientVectorResult, ClientInfo, Category } from './types.js';

const flatCategoryItemToPayload = (
  category: string,
  categoryItems: Category[]
): ClientVectorResult => {
  return categoryItems.map(({ description, metadata }) => ({
    id: `client-${metadata.subCategory}`,
    category,
    metadata: { description, subCategory: metadata.subCategory },
    values: [],
  }));
};

export const prepareData = (clientData: ClientInfo): ClientVectorResult => {
  return Object.entries(clientData).reduce(
    (vectorItems, [category, categoryItems]) => {
      const splittedData = flatCategoryItemToPayload(category, categoryItems);

      return [...vectorItems, ...splittedData];
    },
    [] as ClientVectorResult
  );
};
