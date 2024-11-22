/* eslint-disable @typescript-eslint/no-explicit-any */
import { RunnableWithMessageHistory } from '@langchain/core/runnables';
import { ReadlineInterface } from '../services/index.js';
import {
  askQuestion,
  handleError,
  loadText,
  createChainWithHistory,
} from '../helpers/index.js';

const TEXT_FILE_NAME = 'context-for-interactive-chat.txt';

const makeChat = async (
  chain: RunnableWithMessageHistory<any, string>,
  rl: ReadlineInterface
) => {
  try {
    const userInput = await askQuestion('----You:---- ', rl);
    const context = await loadText(TEXT_FILE_NAME);

    const config = { configurable: { sessionId: '1' } };
    const output = await chain.invoke({ input: userInput, context }, config);
    console.log('----Assistant:----', output);

    await makeChat(chain, rl);
  } catch (error) {
    handleError(error);
    rl.close();
  }
};

export const askWithTemplateAndContextAndHistory = async () => {
  const rl = new ReadlineInterface();
  const chainWithHistory = createChainWithHistory();

  await makeChat(chainWithHistory, rl);
};
