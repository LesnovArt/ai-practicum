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

export type IndexNameSpace = {
  namespaceName?: IndexName;
};

export type QueryByIdProps = QueryByRecordId & IndexNameType & IndexNameSpace;

export type QueryByVectorValuesProps = QueryByVectorValues &
  IndexNameType &
  IndexNameSpace;

export type QueryRequestResult = Promise<QueryResponse<RecordMetadata>>;
