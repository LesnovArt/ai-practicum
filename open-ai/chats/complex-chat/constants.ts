export const DEFAULT_MAX_CONTEXT_DEPTH = 5;

export const completionsOptions = {
  temperature: 0.5,
  top_p: 0.9,
  max_tokens: 70,
  frequency_penalty: 0.5,
};

export const initialOptions = {
  input: process.stdin,
  output: process.stdout,
};
