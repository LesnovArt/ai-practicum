import {
  getEmbeddingModel,
  getPineconeIndex,
  askQuestion,
  createChainWithHistory,
  generateSessionId,
} from '../helpers/index.js';

import { LangChainOpenAI, ReadlineInterface } from '../services/index.js';
import { retrieveContextFromPinecone } from './utils/index.js';

// let's define the model we will use
const MODEL_PARAMS = {
  apiKey: process.env.OPEN_AI_KEY,
  model: 'gpt-4-turbo-preview',
  temperature: 0.7,
  maxTokens: 2000,
};
LangChainOpenAI.getInstance().setModel(MODEL_PARAMS);
// init pinecone
const pineconeIndex = getPineconeIndex();
// get embedding from OpenAIEmbeddings class
const embeddings = getEmbeddingModel();
// create chat interface
const rl = new ReadlineInterface();
const sessionId = generateSessionId();

export const makeEnhancedChat = async () => {
  const userQuery = await askQuestion('You: ', rl);
  console.log('/ -------------------------- / / -------------------------- /');
  if (userQuery === 'buy') {
    rl.close();

    return { status: 'finish' };
  }

  const { context, meta } = await retrieveContextFromPinecone({
    embeddings,
    pineconeIndex,
    userQuery,
  });

  const config = { configurable: { sessionId } };
  const chainWithHistory = createChainWithHistory({
    chatName: 'dedicatedPersonalAssistantWithContextAndHistory',
  });
  const output = await chainWithHistory.invoke(
    { input: userQuery, context },
    config
  );
  console.log(
    '/ -------------------------- / Execution Details Start / -------------------------- /'
  );
  console.log('Context Context:', context);

  console.log('Context Categories:', meta.map((m) => m.category).join(', '));
  console.log('Context Users:', meta.map((m) => m.user).join(', '));
  console.log(
    '/ -------------------------- / Execution Details End / -------------------------- /'
  );
  console.log('Assistant:', output);
  console.log('/ -------------------------- / / -------------------------- /');

  await makeEnhancedChat();
};
