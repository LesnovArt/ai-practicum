/**
 * model's description - https://platform.openai.com/docs/models
 */
export enum OpenAIModels {
  /**
   * The latest GPT-3.5 Turbo model with higher accuracy at responding in requested formats and
   * a fix for a bug which caused a text encoding issue for non-English language function calls
   * 16,385 tokens	4,096 tokens	Up to Sep 2021
   */
  ['gpt-3.5-turbo-0125'] = 'gpt-3.5-turbo-0125',
  /**
   * The latest DALL·E model released in Nov 2023.
   */
  ['dall-e-3'] = 'dall-e-3',
  /**
   * The previous DALL·E model released in Nov 2022.
   * The 2nd iteration of DALL·E with more realistic, accurate, and 4x greater resolution images than the original model.
   */
  ['dall-e-2'] = 'dall-e-2',
  /**
   *	The latest text to speech model, optimized for speed.
   */
  ['tts-1'] = 'tts-1',
  /**
   *	tts-1-hd	The latest text to speech model, optimized for quality.
   */
  ['tts-1-hd'] = 'tts-1-hd',
  /**
   * Points to the most recent snapshot of the o1 model: o1-preview-2024-09-12
   */
  ['o1-preview'] = 'o1-preview',
  /**
   * The latest GPT-4 Turbo model with vision capabilities.
   * Vision requests can now use JSON mode and function calling.
   * Currently points to gpt-4-turbo-2024-04-09.
   * 128,000 tokens	32,768 tokens	Up to Oct 2023
   */
  ['gpt-4-turbo'] = 'gpt-4-turbo',
  /**
   * GPT-4o-mini: Our affordable and intelligent small model for fast, lightweight tasks.
   * GPT-4o mini is cheaper and more capable than GPT-3.5 Turbo.
   * Currently points to gpt-4o-mini-2024-07-18.
   * 128,000 tokens	4,096 tokens	Up to Dec 2023
   */
  ['gpt-4o-mini'] = 'gpt-4o-mini',
  /**
   * GPT-4o: Our high-intelligence flagship model for complex, multi-step tasks.
   * GPT-4o is cheaper and faster than GPT-4 Turbo.
   * 128,000 tokens	16,384 tokens	Up to Oct 2023
   */
  ['gpt-4o'] = 'gpt-4o',
  /**
   * 	Preview release for the Realtime API
   * 128,000 tokens	4,096 tokens	Up to Oct 2023
   */
  ['gpt-4o-realtime-preview'] = 'gpt-4o-realtime-preview',
}

export type OpenAIModelsTypes = `${OpenAIModels}`;
