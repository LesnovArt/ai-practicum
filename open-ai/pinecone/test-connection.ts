// Instantiate a new Pinecone client, which will automatically read the
// env vars: PINECONE_API_KEY which come from
// the Pinecone dashboard at https://app.pinecone.io
import { Pinecone } from '@pinecone-database/pinecone';

export const testConnection = async () => {
  const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || '' });
  const index = pinecone.Index('ai-practice');

  index
    .describeIndexStats()
    .then((response: any) =>
      console.log(`Connection established: ${JSON.stringify(response)}`)
    )
    .catch((err: any) => console.error('Connection failed:', err));
};
