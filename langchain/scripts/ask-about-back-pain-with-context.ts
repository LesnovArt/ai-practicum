import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence } from '@langchain/core/runnables';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { ChatOpenAI } from '@langchain/openai';

import { handleError } from '../helpers/index.js';
import { getRegisteredChatPromptTemplate } from '../prompts/index.js';
import { LangChainOpenAI } from '../services/index.js';

const getChain = (
  promptTemplate: ChatPromptTemplate,
  chatModel: ChatOpenAI
) => {
  return RunnableSequence.from([
    promptTemplate,
    chatModel,
    new StringOutputParser(),
  ]);
};

export const askWithTemplateAndContext = async (
  templatedInput: string,
  context?: string
) => {
  try {
    const openAIClient = LangChainOpenAI.getInstance();
    const chatModel = openAIClient.getModel();
    const prompt = getRegisteredChatPromptTemplate(
      'dedicatedHealthAssistantWithContext'
    );
    const chain = getChain(prompt, chatModel);
    const response = await chain.invoke({ input: templatedInput, context });

    console.log(
      '------------Response with template and context------------:',
      response
    );
  } catch (error) {
    handleError(error);
  }
};
