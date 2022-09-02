export interface Obj<T> {
  [key: string]: T;
}

interface CommonData {
  [key: string]: string;
  ID: string;
  title: string;
}

export type ColumnId = 'ID' | 'title' | 'type' | 'category' | 'writer' | 'date';

export type Category = 'ALL' | 'QNA' | 'SELLING' | 'BUYING' | 'PLAIN';

export interface NoticeData extends CommonData {
  type: 'ALL' | 'LINE';
  date: string;
  writer: string;
}
export interface ComplaintData extends CommonData {
  date: string;
  writer: string;
}
export interface CommunityData extends CommonData {
  type: 'ALL' | 'LINE';
  category: Category;
  writer: string;
}

export type TypeDataArray = NoticeData[] | ComplaintData[] | CommunityData[];
