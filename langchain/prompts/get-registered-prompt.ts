import { ChatPromptTemplate } from '@langchain/core/prompts';

import { registeredChatPromptTemplates } from './registered-chat-prompt-templates.js';
import { ChatFromTemplateList } from '../types/index.js';

export const getRegisteredChatPromptTemplate = (
  name: ChatFromTemplateList
): ChatPromptTemplate => {
  const searchedTemplate = registeredChatPromptTemplates[name];

  if (!searchedTemplate) {
    console.warn('Unregistered template name, please check the list');
    throw new Error('Unregistered template name');
  }

  return searchedTemplate;
};
