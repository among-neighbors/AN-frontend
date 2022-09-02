export interface Obj<T> {
  [key: string]: T;
}

interface CommonData {
  ID: string;
  title: string;
}

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
  category: 'ALL' | 'QNA' | 'SELLING' | 'BUYING' | 'PLAIN';
  writer: string;
}
