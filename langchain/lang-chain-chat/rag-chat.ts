import { getPineconeIndex, getEmbeddingModel } from '../helpers/index.js';
import { ReadlineInterface } from '../services/index.js';

// 1 init pinecone
const pineconeIndex = getPineconeIndex();

// console.log('pineconeIndex', pineconeIndex.query('John Doe'));
// 2 get embedding
const embeddings = getEmbeddingModel();

// 4 get content from pinecone
import { retrieveContextFromPinecone } from './utils/index.js';

// 5 add interface for interaction
import { askQuestion } from '../helpers/ask-question.js';
const rl = new ReadlineInterface();

// 3 init ai model
// 6 get prompt template
// 7 get chain with history
import { createChainWithHistory } from '../helpers/create-chain-with-history.js';

// add chat runner
export const makeRAGchat = async () => {
  // Configuration for the chain
  // TODO - check for improvements
  // TODO - try pass callbacks
  const config = { configurable: { sessionId: '1' } };
  // Load context from Pinecone
  const context = await retrieveContextFromPinecone({
    embeddings,
    pineconeIndex,
  });
  // Get the chat chain with history
  const chainWithHistory = createChainWithHistory();
  const userInput = await askQuestion('You: ', rl);
  console.log('/ -------------------------- / / -------------------------- /');

  // Invoke the chain with the user input and context
  const output = await chainWithHistory.invoke(
    { input: userInput, context },
    config
  );
  console.log('Assistant:', output);
  console.log('/ -------------------------- / / -------------------------- /');
  if (userInput === 'buy') {
    rl.close();

    return { status: 'finish' };
  }

  // Recursive call to continue the chat
  await makeRAGchat();
};
