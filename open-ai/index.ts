import {
  // fixBackPain,
  roleBasedBackPainAdvice,
} from './simple-completions/role-based-request.js';

console.log('Hello world from OpenAI course!');
// fixBackPain().then(() => {
//   console.log('Fix back request SUCCEEDED !!!');
// });

roleBasedBackPainAdvice().then(() => {
  console.log('Advice with Roles request SUCCEEDED !!!');
});
