import { ChatPromptTemplate } from '@langchain/core/prompts';
import { FROM_MESSAGE_MAPPER } from './from-messages-mapper.js';
import { ChatFromTemplateList } from '../types/index.js';

export const registeredChatPromptTemplates = Object.entries(
  FROM_MESSAGE_MAPPER
).reduce(
  (templates, [key, messages]) => {
    templates[key] = ChatPromptTemplate.fromMessages(messages);

    return templates;
  },
  {} as Record<ChatFromTemplateList, ChatPromptTemplate>
);
