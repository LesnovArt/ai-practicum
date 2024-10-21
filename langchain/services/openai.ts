import { ChatOpenAI, ChatOpenAIFields, ClientOptions } from '@langchain/openai';

export class LangChainOpenAI {
  private static instance: LangChainOpenAI;
  private openai: ChatOpenAI;

  private constructor({
    apiKey = process.env.OPENAI_API_KEY,
    model = 'gpt-3.5-turbo-0125',
    temperature = 0.7,
    maxTokens = 500,
    ...rest
  }: ChatOpenAIFields = {}) {
    this.openai = new ChatOpenAI({
      apiKey,
      model,
      temperature,
      maxTokens,
      ...rest,
    });
  }

  public static getInstance(props?: ChatOpenAIFields): LangChainOpenAI {
    if (!LangChainOpenAI.instance) {
      LangChainOpenAI.instance = new LangChainOpenAI(props);
    }
    return LangChainOpenAI.instance;
  }

  setModel(fields: ChatOpenAIFields, configuration?: ClientOptions) {
    this.openai = new ChatOpenAI(fields, configuration);
  }

  getModel() {
    return this.openai;
  }
}
