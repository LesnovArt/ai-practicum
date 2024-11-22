import { AIRoles, AIMessages } from '../types/index.js';
import { runCompletion } from '../handlers/index.js';

const userTMsg = 'Tell me something interesting about space.';
const tMessages: AIMessages = [
  {
    role: AIRoles.user,
    content: userTMsg,
  },
];

const userTopPMsg = 'Explain the importance of recycling.';
const topPMessages: AIMessages = [
  {
    role: AIRoles.user,
    content: userTopPMsg,
  },
];

const userMaxTokensMsg = 'Describe the process of photosynthesis.';
const maxTokensMessages: AIMessages = [
  {
    role: AIRoles.user,
    content: userMaxTokensMsg,
  },
];

const userNMsg = 'What are the benefits of meditation?';
const nMessages: AIMessages = [
  {
    role: AIRoles.user,
    content: userNMsg,
  },
];

const userFrequencyPenaltyMsg = 'Write a short poem about the ocean.';
const frequencyPenaltyMessages: AIMessages = [
  {
    role: AIRoles.user,
    content: userFrequencyPenaltyMsg,
  },
];

const userSeedMsg = 'What is artificial intelligence?';
const seedMessages: AIMessages = [
  {
    role: AIRoles.user,
    content: userSeedMsg,
  },
];

const messagesAndPromptsMapper = {
  lowTemperature: {
    body: {
      messages: tMessages,
      temperature: 0.2,
    },
  },
  highTemperature: {
    body: {
      messages: tMessages,
      temperature: 0.8,
    },
  },
  lowTopP: {
    body: {
      messages: topPMessages,
      top_p: 0.2,
    },
  },
  highTopP: {
    body: {
      messages: topPMessages,
      top_p: 0.9,
    },
  },
  lowMaxTokens: {
    body: {
      messages: maxTokensMessages,
      max_tokens: 50,
    },
  },
  highMaxTokens: {
    body: {
      messages: maxTokensMessages,
      max_tokens: 150,
    },
  },
  lowN: {
    body: {
      messages: nMessages,
      n: 1,
    },
  },
  highN: {
    body: {
      messages: nMessages,
      n: 3,
    },
  },
  lowFrequencyPenalty: {
    body: {
      messages: frequencyPenaltyMessages,
      frequency_penalty: 0.0,
    },
  },
  highFrequencyPenalty: {
    body: {
      messages: frequencyPenaltyMessages,
      frequency_penalty: 1.5,
    },
  },
  fixedSeed: {
    body: {
      messages: seedMessages,
      seed: 42,
    },
  },
};

export type MessagesAndPromptsMapperKeys =
  keyof typeof messagesAndPromptsMapper;

export const requestWithParams = async (key: MessagesAndPromptsMapperKeys) => {
  const { body } = messagesAndPromptsMapper[key];

  await runCompletion(body);

  return { key, parameters: body };
};
