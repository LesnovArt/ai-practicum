// TASK 1
// import { compareAskWithAndWithoutTemplates } from './scripts/index.js';

import { makeEnhancedChat } from './multi-context-chat/index.js';

// const question =
// 'Can you suggest a set of exercises for someone with lower back pain?';

// compareAskWithAndWithoutTemplates(question);

// TASK 2
// import { askWithTemplateAndContext } from './scripts/index.js';

// const question =
//   'Can you suggest a set of exercises for someone with lower back pain?';
// const context =
//   'Patient is recovering from spinal surgery and needs gentle exercises. He is 60 years old and has issues with a blood pressure';

// askWithTemplateAndContext(question, context);

// TASK 3
// import { askWithTemplateAndContextAndHistory } from './scripts/index.js';

// askWithTemplateAndContextAndHistory();

// TASK 4
// import { storeEmbeddings } from './scripts/index.js';

// storeEmbeddings();

// TASK 5
// import { makeRAGchat } from './lang-chain-chat/rag-chat.js';

// makeRAGchat()
//   .then((data?: { status: string }) => {
//     if (data?.status === 'finish') {
//       console.log('/ --- Chat was closed. --- /');
//     }
//   })
//   .catch(() => {
//     console.log('/ --- Error while chat processing --- /');
//   });

// TASK 6

// store embeddings with metadata
// storeEmbeddingsWithMultiContext();
makeEnhancedChat()
  .then((data?: { status: string }) => {
    if (data?.status === 'finish') {
      console.log('/ --- Chat was closed. --- /');
    }
  })
  .catch((error) => {
    console.log('/ --- Error while chat processing --- /', error);
  });
