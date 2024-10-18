import {
  CreateIndexOptions,
  IndexModel,
  Pinecone,
} from '@pinecone-database/pinecone';
import {
  CreateIndexSpec,
  IndexName,
} from '@pinecone-database/pinecone/dist/control';
import {
  QueryByIdProps,
  QueryByVectorValuesProps,
  QueryRequestResult,
  UpsertProps,
} from '../../types/index.js';

export class EmbeddingManager {
  private static instance: EmbeddingManager;
  private pcone: Pinecone;

  constructor() {
    this.pcone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY || '' });
  }

  public static getInstance() {
    if (!EmbeddingManager.instance) {
      EmbeddingManager.instance = new EmbeddingManager();
    }

    return EmbeddingManager.instance;
  }

  async createIndex(
    props: Partial<CreateIndexOptions> = {}
  ): Promise<void | IndexModel> {
    const initialServerlessSpec: CreateIndexSpec = {
      serverless: {
        cloud: 'aws',
        region: 'us-east-1',
      },
      /**
      pod: {
        environment: '',
        replicas: 1,
        shards: 2,
// The type of pod to use. One of `s1`, `p1`, or `p2` appended with `.` and one of `x1`, `x2`, `x4`, or `x8`.
        podType: 'p1',
        pods: 1,
// Configuration for the behavior of Pinecone's internal metadata index. By default, all metadata is indexed;
//when `metadataConfig` is present, only specified metadata fields are indexed. These configurations are only valid
// for use with pod-based indexes.
        metadataConfig: { indexed: [] },
// The name of the collection to be used as the source for the index.
        sourceCollection: '',
        },
       */
    };
    const {
      name = 'new index',
      dimension = 768,
      metric = 'euclidean',
      spec = initialServerlessSpec,
      waitUntilReady = true,
    } = props;

    return this.pcone.createIndex({
      name,
      dimension,
      metric,
      waitUntilReady,
      spec,
    });
  }

  async deleteIndex(indexName: IndexName): Promise<void> {
    await this.pcone.deleteIndex(indexName);
  }

  async upsertEmbedding({
    indexName,
    upsertPayload,
    namespaceName,
  }: UpsertProps): Promise<void> {
    const index = this.pcone.Index(indexName);
    if (namespaceName) {
      return index.namespace(namespaceName).upsert(upsertPayload);
    }

    return index.upsert(upsertPayload);
  }

  async queryById(props: QueryByIdProps): QueryRequestResult {
    const {
      indexName,
      id,
      topK = 1,
      includeValues = false,
      includeMetadata = true,
      filter,
    } = props;

    const index = this.pcone.Index(indexName);
    return await index.query({
      id,
      topK,
      includeValues,
      includeMetadata,
      filter,
    });
  }

  async querySimilar(props: QueryByVectorValuesProps): QueryRequestResult {
    const {
      indexName,
      vector,
      topK = 1,
      includeValues = false,
      includeMetadata = true,
      filter,
      sparseVector,
    } = props;

    const index = this.pcone.Index(indexName);

    return index.query({
      vector,
      topK,
      includeMetadata,
      includeValues,
      filter,
      sparseVector,
    });
  }
}
