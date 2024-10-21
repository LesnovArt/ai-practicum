import {
  BaseMessagePromptTemplateLike,
  ChatPromptTemplate,
} from '@langchain/core/prompts';
import { InputValues } from 'langchain/memory';
import { ChatFromTemplateList } from '../types/index.js';

export const FROM_MESSAGE_MAPPER = {
  postSurgeryRecoveryHealthAssistant: [
    [
      'system',
      "As a health assistant specializing in post-surgery recovery, your role is to provide structured exercise advice tailored to users' needs. Each exercise recommendation should follow this format: 'Exercise name: ...', 'Execution steps: ...', 'Duration/Repetition: ...'. Ensure that responses are clear and detailed, focusing strictly on exercise guidance relevant to post-surgery recovery.",
    ],
    ['user', '{input}'],
  ],
  dedicatedHealthAssistantWithContext: [
    [
      'system',
      "You are a dedicated health assistant tasked with providing tailored advice on nutrition, exercises, and general health. Each response should be a direct recommendation that is relevant and specific to the provided context: {context}. Focus solely on delivering actionable advice without additional commentary. Each exercise recommendation should follow this format: 'Exercise name: ...', 'Execution steps: ...', 'Duration/Repetition: ...'.",
    ],
    ['user', '{input}'],
  ],
} as Record<
  ChatFromTemplateList,
  (ChatPromptTemplate<InputValues, string> | BaseMessagePromptTemplateLike)[]
>;
