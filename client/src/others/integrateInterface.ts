interface Obj<T> {
  [key: string]: T;
}

interface CommonData {
  [key: string]: string;
  ID: string;
  title: string;
  writer: string;
  date: string;
}

type ColumnId = 'ID' | 'title' | 'type' | 'category' | 'writer' | 'date';

type Category = 'QNA' | 'SELLING' | 'BUYING' | 'PLAIN';

interface NoticeData extends CommonData {
  type: 'ALL' | 'LINE';
}
interface ComplaintData extends CommonData {}
interface CommunityData extends CommonData {
  type: 'ALL' | 'LINE';
  category: Category;
}

const isNoticeData = (data: any): data is NoticeData => {
  return data.category === undefined && data.type !== undefined;
};

const isCommunityData = (data: any): data is CommunityData => {
  return data.category !== undefined;
};

type TypeDataArray = NoticeData[] | ComplaintData[] | CommunityData[];

export {
  Obj,
  ColumnId,
  Category,
  NoticeData,
  ComplaintData,
  CommunityData,
  TypeDataArray,
  isNoticeData,
  isCommunityData,
};
