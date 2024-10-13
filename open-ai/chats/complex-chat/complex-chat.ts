import { ReadlineInterface, ExtendedChatBot } from '../../service/index.js';
import { initialOptions } from './constants.js';
import {
  handleAiAnswer,
  handleAiSent,
  handleAsk,
  handleChatClosed,
  promptUserForInput,
} from './handlers.js';

export const startComplexChat = async (chatOptions = initialOptions) => {
  console.log(`Welcome to a New Chat.`);
  console.log(`To stop it, please enter 'exit' through 'Enter your message:'`);

  const inputOutput = new ReadlineInterface(chatOptions);
  const chat = new ExtendedChatBot(inputOutput);

  chat.on('onAsk', handleAsk(chat));
  chat.on('onAISent', handleAiSent);
  chat.on('onAIAnswer', handleAiAnswer(chat));
  chat.on('chatClosed', handleChatClosed);

  await promptUserForInput({ chat });
};
