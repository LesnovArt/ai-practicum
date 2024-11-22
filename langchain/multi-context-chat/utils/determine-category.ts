import { LangChainOpenAI } from '../../services';
import { PatientRecordCategory } from '../../types';
import { PatientCategoriesList } from '../constants';

export const determineCategories = async (
  userQuery: string
): Promise<PatientRecordCategory[]> => {
  const openAI = LangChainOpenAI.getInstance().getModel();

  try {
    const response = await openAI.invoke([
      {
        role: 'user',
        content: `Based on the following query, respond with only the most relevant categories, separated by commas: "${userQuery}". Select only from these categories: ${PatientCategoriesList.join(', ')}. Return only the category names, without additional explanation or formatting.`,
      },
    ]);

    return typeof response.content === 'string'
      ? response.content
          .split(',')
          .reduce<PatientRecordCategory[]>((acc, category) => {
            if (category && typeof category === 'string') {
              acc.push(category.trim() as PatientRecordCategory);
            }

            return acc;
          }, [])
      : response.content.map((item) => item.type === 'text' && item.text);
  } catch (error) {
    console.error('Error determining categories:', error);
    return [];
  }
};
