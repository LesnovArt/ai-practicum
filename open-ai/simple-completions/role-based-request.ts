import { AIRoles, AIMessages, ResultCompletionMsg } from '../types/index.js';
import { runCompletion } from '../handlers/index.js';

const systemMsg = 'You are a health coach and fitness trainer';
const userMsg =
  'Provide me advise what exercises should I do for my back pain?';

const messages: AIMessages = [
  {
    role: AIRoles.system,
    content: systemMsg,
  },
  {
    role: AIRoles.user,
    content: userMsg,
  },
];

const handleSuccess = (response: ResultCompletionMsg) => {
  console.log(
    `Here can be some code on success processing...! ROLE: ${response.role}`
  );
};

const handleFailure = (errorMsg: string) => {
  console.log(
    `Here can be some code on failure processing...: ${errorMsg || 'Unknown Error'}`
  );
};

export const roleBasedBackPainAdvice = async () => {
  await runCompletion({
    messages,
    onSuccess: handleSuccess,
    onFailure: handleFailure,
  });
};
