export type DataType = 'public' | 'private' | 'sensitive';
export type DataTypeAbbreviations = 'pu' | 'pr' | 's';
export type DataTypeMapper = Record<DataTypeAbbreviations, DataType>;
