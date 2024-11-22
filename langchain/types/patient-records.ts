import { DataType } from './shared';

export type PatientRecordCategory =
  | 'bad-habits'
  | 'food'
  | 'life'
  | 'health'
  | 'hobbies'
  | 'work'
  | 'general';
export type UserName = string;
export type PatientRecordMetadata = {
  category: PatientRecordCategory;
  user: UserName;
  timeStamp: number;
  type: DataType;
};
