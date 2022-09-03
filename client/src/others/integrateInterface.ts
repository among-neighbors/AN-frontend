interface Obj<T> {
  [key: string]: T;
}

interface CommonData {
  [key: string]: string;
  ID: string;
  title: string;
  content: string;
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

type TypeData = NoticeData | ComplaintData | CommunityData;

type TypeDataArray = NoticeData[] | ComplaintData[] | CommunityData[];

interface CommonListData {
  id: string;
  title: string;
  content: string;
  createdDate: string;
}

interface CommunityListData extends CommonListData {
  writer: {
    name: string;
    lineName: string;
    houseName: string;
  };
  range: 'ALL' | 'LINE';
  category: Category;
  like: number;
}

interface NoticeListData extends CommonListData {
  writer: string;
  range: 'ALL' | 'LINE';
  expiredDate: string;
  releaseLine: string;
}

interface ComplaintListData extends CommonListData {
  writer: {
    lineName: string;
    houseName: string;
  };
}

const isCommunityListData = (data: any): data is CommunityListData => {
  return data.category !== undefined;
};

const isNoticeListData = (data: any): data is NoticeListData => {
  return data.expiredDate !== undefined;
};

const isCommunityListArrayData = (list: any): list is CommunityListData[] => {
  return list[0].category !== undefined;
};

const isNoticeListArrayData = (list: any): list is NoticeListData[] => {
  return list[0].expiredDate !== undefined;
};

type ListData = CommunityListData | NoticeListData | ComplaintListData;

type ListDataArray = CommunityListData[] | NoticeListData[] | ComplaintListData[];

interface TableDataProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  list: ListDataArray;
}

export {
  Obj,
  ColumnId,
  Category,
  NoticeData,
  ComplaintData,
  CommunityData,
  TypeData,
  TypeDataArray,
  isNoticeData,
  isCommunityData,
  ListData,
  ListDataArray,
  TableDataProps,
  CommunityListData,
  NoticeListData,
  ComplaintListData,
  isCommunityListData,
  isNoticeListData,
  isCommunityListArrayData,
  isNoticeListArrayData,
};
