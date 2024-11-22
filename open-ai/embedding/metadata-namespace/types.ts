export type Metadata = {
  subCategory: string;
};

export interface Category {
  description: string;
  metadata: Metadata;
}

export interface ClientInfo {
  [category: string]: Category[];
}

export type ClientVectorResultItem = {
  id: string;
  category: string;
  metadata: Metadata & { description: string };
  values: number[];
};

export type ClientVectorResult = ClientVectorResultItem[];
