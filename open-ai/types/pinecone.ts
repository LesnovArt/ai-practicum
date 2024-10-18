import {
  IndexName,
  PineconeRecord,
  QueryByRecordId,
  QueryByVectorValues,
  QueryResponse,
  RecordMetadata,
} from '@pinecone-database/pinecone';

export type UpsertProps = {
  indexName: string;
  upsertPayload: PineconeRecord<RecordMetadata>[];
  namespaceName?: string;
};

export type IndexNameType = {
  indexName: IndexName;
};

export type QueryByIdProps = QueryByRecordId & IndexNameType;

export type QueryByVectorValuesProps = QueryByVectorValues & IndexNameType;

export type QueryRequestResult = Promise<QueryResponse<RecordMetadata>>;
