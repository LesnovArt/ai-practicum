export interface InputOutputInterface {
  askQuestion(query: string): Promise<string>;
  close(): void;
}
