import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Index, RecordMetadata } from '@pinecone-database/pinecone';

export const retrieveContextFromPinecone = async ({
  embeddings,
  pineconeIndex,
}: {
  embeddings: OpenAIEmbeddings;
  pineconeIndex: Index<RecordMetadata>;
}): Promise<string> => {
  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });
  // data was place in
  // ../../scripts/ask-with-pinecone-integration.ts
  const results = await vectorStore.similaritySearch('John Doe', 1, {
    source:
      '/Users/Artem_Liesnov/Desktop/ai-practice/langchain/embeddings/client.txt',
  });
  return results.map((document) => document.pageContent).join('\n');
};
