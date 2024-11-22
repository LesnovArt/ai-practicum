import { OpenAIClient } from '../service/index.js';
import { AIRoles, AIMessages } from '../types/index.js';

const AI = OpenAIClient.getInstance();

const messages: AIMessages = [
  {
    role: AIRoles.user,
    content: 'Provide me advise what exercises should I do for my back pain?',
  },
];

export const fixBackPain = async () => {
  try {
    const response = await AI.createChatCompletion({ messages });

    if (!response) {
      throw 'no response';
    }

    console.log(response);
  } catch (error) {
    console.error('Error creating completion:', error);
  }
};
