import { OpenAIEmbeddings } from '@langchain/openai';
import { PineconeStore } from '@langchain/pinecone';
import { Index, RecordMetadata } from '@pinecone-database/pinecone';
import { determineCategories } from './determine-category';

type DocMetadata = {
  category: string;
  type: string;
  timeStamp: string;
  user: string;
  id?: string;
};

type DocType = {
  pageContent: string;
  metadata: DocMetadata;
  id: string;
};

const getMetaFromDoc = (doc: DocType): DocMetadata => {
  const metaData = doc.metadata;
  const id = doc.id;

  return {
    category: metaData.category,
    type: metaData.type,
    timeStamp: metaData.timeStamp,
    user: metaData.user,
    id: id,
  };
};
export const retrieveContextFromPinecone = async ({
  embeddings,
  pineconeIndex,
  userQuery,
}: {
  embeddings: OpenAIEmbeddings;
  pineconeIndex: Index<RecordMetadata>;
  userQuery: string;
}): Promise<{ context: string; meta: DocMetadata[] }> => {
  // open ai is trying to guess the category to be more targeted
  const categories = await determineCategories(userQuery);

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
  });

  if (!categories.length || categories[0] === 'general') {
    console.log(
      'no categories, we are searching through all DB records. {ALERT LEVEL - HIGH}'
    );
    const results = await vectorStore.similaritySearch(userQuery, 1);
    const context = results.map((document) => document.pageContent).join('\n');
    const doc = results[0] as DocType;
    let meta: DocMetadata[] = [];
    if (!doc) {
      meta = [getMetaFromDoc(doc)];
    }

    return { context, meta };
  } else {
    console.log(
      `We are searching through ${categories.join(', ')} DB records. {ALERT LEVEL - NORMAL}`
    );
    const resultsPromises = categories.map((category) =>
      vectorStore.similaritySearch(userQuery, 1, {
        category,
      })
    );

    const resultsArray = await Promise.all(resultsPromises);

    const uniqueResults = Array.from(new Set(resultsArray));
    const listOfMeta = uniqueResults.reduce<DocMetadata[]>((acc, result) => {
      const doc = result[0] as DocType;
      if (doc) {
        acc.push(getMetaFromDoc(doc));
      }

      return acc;
    }, []);

    return {
      context: uniqueResults
        .flatMap((documents) =>
          documents.flatMap((document) => document.pageContent)
        )
        .join('\n'),
      meta: listOfMeta,
    };
  }
};
