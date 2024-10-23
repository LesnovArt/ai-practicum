import { ChatMessageHistory } from '@langchain/community/stores/message/in_memory';
import { StringOutputParser } from '@langchain/core/output_parsers';

import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { LangChainOpenAI } from '../services/index.js';
import { getRegisteredChatPromptTemplate } from '../prompts/index.js';

const MODEL_PARAMS = {
  apiKey: process.env.OPEN_AI_KEY,
  model: 'gpt-4-turbo-preview',
  temperature: 0.7,
  maxTokens: 2000,
};

export const createChainWithHistory = () => {
  const openAIClient = LangChainOpenAI.getInstance(MODEL_PARAMS);
  const chatModel = openAIClient.getModel();
  const prompt = getRegisteredChatPromptTemplate(
    'dedicatedHealthAssistantWithContextAndHistory'
  );
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
