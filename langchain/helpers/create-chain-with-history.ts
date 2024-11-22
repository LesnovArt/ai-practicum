import { ChatMessageHistory } from '@langchain/community/stores/message/in_memory';
import { StringOutputParser } from '@langchain/core/output_parsers';

import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { LangChainOpenAI } from '../services/index.js';
import { getRegisteredChatPromptTemplate } from '../prompts/index.js';
import { ChatFromTemplateList } from '../types/index.js';

type CreateChainWithHistoryProps = {
  chatName?: ChatFromTemplateList;
};

export const createChainWithHistory = ({
  chatName = 'dedicatedHealthAssistantWithContextAndHistory',
}: CreateChainWithHistoryProps = {}) => {
  const chatModel = LangChainOpenAI.getInstance().getModel();
  const prompt = getRegisteredChatPromptTemplate(chatName);
  const chain = prompt.pipe(chatModel).pipe(new StringOutputParser());
  const messageHistory = new ChatMessageHistory();
  return new RunnableWithMessageHistory({
    runnable: chain,
    inputMessagesKey: 'input',
    historyMessagesKey: 'history',
    // that can be used to store data for example into Redis - new UpstashRedisChatMessageHistory({...})
    getMessageHistory: (_sessionId) => messageHistory,
  });
};
