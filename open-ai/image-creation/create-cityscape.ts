import { createDalleImage } from '../handlers/index.js';
// import { OpenAIModels } from '../service/models.js';

const userPrompt = 'Can you make a food in a shape of state of freedom?';
// const userPrompt = 'A futuristic cityscape at sunset';
// const userPrompt = 'Create a cake shaped like a castle';
// const userPrompt =
//   'Create a swimmer, who is jumping from the mountain into the river';

export const createCityScape = async () => {
  return createDalleImage({
    prompt: userPrompt,
    // size: '1024x1024',
    // model: OpenAIModels['dall-e-3'],
  });
};
