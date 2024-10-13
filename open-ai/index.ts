// import {
// fixBackPain,
// roleBasedBackPainAdvice,
// requestWithParams,
// } from './simple-completions/index.js';

import {
  // makeChatWithOutContext,
  startComplexChat,
} from './chats/index.js';

console.log('Hello world from OpenAI course!');
// TASk 1

// fixBackPain().then(() => {
//   console.log('Fix back request SUCCEEDED !!!');
// });

// TASk 2
// roleBasedBackPainAdvice().then(() => {
//   console.log('Advice with Roles request SUCCEEDED !!!');
// });

// TASK 3 - change parameter to check other cases
// requestWithParams('highTopP').then(({ key, parameters }) => {
//   console.log(
//     `Parameter [${key}] with PARAMETERS: [${JSON.stringify(parameters)}] request SUCCEEDED !!!`
//   );
// });

// Task 4
// makeChatWithOutContext().then(async ({ chat, aiResponse, error }) => {
//   if (!error && !!aiResponse) {
//     console.log('aiResponse', aiResponse.content);
//   } else {
//     console.error('Smth went wrong!!!');
//   }

//   chat.close();
// });

// Task 5
startComplexChat();
