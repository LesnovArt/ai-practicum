import { handleError } from '../helpers/index.js';
import { getRegisteredChatPromptTemplate } from '../prompts/index.js';
import { LangChainOpenAI } from '../services/index.js';

export const askWithTemplate = async (templatedInput) => {
  try {
    const openAIClient = LangChainOpenAI.getInstance();
    const chatModel = openAIClient.getModel();
    const prompt = getRegisteredChatPromptTemplate(
      'postSurgeryRecoveryHealthAssistant'
    );
    const chain = prompt.pipe(chatModel);
    const response = await chain.invoke({ input: templatedInput });

    console.log(
      '------------Response with template------------:',
      response?.content
    );
  } catch (error) {
    handleError(error);
  }
};

export const askWithOutTemplate = async (input) => {
  try {
    const openAIClient = LangChainOpenAI.getInstance();
    const chatModel = openAIClient.getModel();
    const response = await chatModel.invoke(input);
    console.log(
      '------------Response without template------------:',
      response?.content
    );
  } catch (error) {
    handleError(error);
  }
};

export const compareAskWithAndWithoutTemplates = async (input: string) => {
  await askWithTemplate(input);
  console.log('------------Next Approach------------:');
  await askWithOutTemplate(input);
};
