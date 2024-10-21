// TASK 1
// import { compareAskWithAndWithoutTemplates } from './scripts/index.js';

// const question =
// 'Can you suggest a set of exercises for someone with lower back pain?';

// compareAskWithAndWithoutTemplates(question);

// TASK 2
import { askWithTemplateAndContext } from './scripts/index.js';

const question =
  'Can you suggest a set of exercises for someone with lower back pain?';
const context =
  'Patient is recovering from spinal surgery and needs gentle exercises. He is 60 years old and has issues with a blood pressure';

askWithTemplateAndContext(question, context);
