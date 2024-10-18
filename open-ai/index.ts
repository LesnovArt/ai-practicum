// import {
// fixBackPain,
// roleBasedBackPainAdvice,
// requestWithParams,
// } from './simple-completions/index.js';

import {
  queryByVectorWithFilter,
  // queryByVector,
  // makeEmbedding,
  // makeIndex,
  // upsertEmbeddingsByNamespace,
} from './embedding/index.js';

// import { testConnection } from './pinecone/index.js';

// import { makeTranscription, makeSpeech } from './tts-stt/index.js';

// import {
// makeChatWithOutContext,
// startComplexChat,
// } from './chats/index.js';
// import { createCityScape } from './image-creation/index.js';

// Module 1
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
// startComplexChat();

// Task 6
// createCityScape().then((url) => {
//   console.log('Image Url', url);
// });

// Task 7
// makeSpeech().then(async () => {
//   await makeTranscription();
// });

// Module 2

// Task 1
// testConnection();

// Task 2
// makeIndex()
//   .then(async () => {
//     await makeEmbedding();
//     console.log(
//       'Creation Index and Insert a vector from OPEN AI passed successfully'
//     );
//   })

// Task 3
// upsertEmbeddingsByNamespace()
//   .then(() => {
//     console.log('Data upsert completed successfully!');
//   })

// Task 4
// queryByVector()
//   .then(() => {
//     console.log('Data queried successfully!');
//   })

// Task 5
queryByVectorWithFilter('workEnvironment').then(() => {
  console.log('Data queried successfully!');
});
