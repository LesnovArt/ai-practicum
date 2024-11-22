import readline, { ReadLineOptions } from 'readline';

export class ReadlineInterface {
  private rl: readline.Interface;

  constructor(
    options: ReadLineOptions = { input: process.stdin, output: process.stdout }
  ) {
    this.rl = readline.createInterface(options);
  }

  async askQuestion(query: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        this.rl.question(query, (answer: string) => {
          resolve(answer);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  close(): void {
    this.rl.close();
  }
}
