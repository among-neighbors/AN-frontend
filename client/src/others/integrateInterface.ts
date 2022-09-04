interface Obj<T> {
  [key: string]: T;
}

interface ProcessedCommonPostData extends Obj<string> {
  id: string;
  title: string;
  content: string;
  writer: string;
  date: string;
}

type ColumnId = 'id' | 'title' | 'range' | 'category' | 'writer' | 'date';

type Range = 'ALL' | 'LINE';

type Category = 'QNA' | 'SELLING' | 'BUYING' | 'PLAIN';

interface ProcessedNoticePostData extends ProcessedCommonPostData {
  range: Range;
}
interface ProcessedComplaintPostData extends ProcessedCommonPostData {}
interface ProcessedCommunityPostData extends ProcessedCommonPostData {
  range: Range;
  category: Category;
}

const isProcessedNoticePostData = (data: any): data is ProcessedNoticePostData => {
  return data.category === undefined && data.range !== undefined;
};

const isProcessedCommunityPostData = (data: any): data is ProcessedCommunityPostData => {
  return data.category !== undefined;
};

type ProcessedTypePostData =
  | ProcessedNoticePostData
  | ProcessedComplaintPostData
  | ProcessedCommunityPostData;

type ProcessedTypePostDataArray =
  | ProcessedNoticePostData[]
  | ProcessedComplaintPostData[]
  | ProcessedCommunityPostData[];

interface DeliveredCommonPostData {
  id: string;
  title: string;
  content: string;
  createdDate: string;
}

interface DeliveredCommunityPostData extends DeliveredCommonPostData {
  writer: {
    name: string;
    lineName: string;
    houseName: string;
  };
  range: Range;
  category: Category;
  like: number;
}

interface DeliveredNoticePostData extends DeliveredCommonPostData {
  writer: string;
  range: Range;
  expiredDate: string;
  releaseLine: string;
}

interface DeliveredComplaintPostData extends DeliveredCommonPostData {
  writer: {
    lineName: string;
    houseName: string;
  };
}

const isDeliveredCommunityPostData = (post: any): post is DeliveredCommunityPostData => {
  return post.category !== undefined;
};

const isDeliveredNoticePostData = (post: any): post is DeliveredNoticePostData => {
  return post.expiredDate !== undefined;
};

const isDeliveredCommunityPostDataArray = (array: any): array is DeliveredCommunityPostData[] => {
  return array[0].category !== undefined;
};

const isDeliveredNoticePostDataArray = (array: any): array is DeliveredNoticePostData[] => {
  return array[0].expiredDate !== undefined;
};

type DeliverdTypePostData =
  | DeliveredCommunityPostData
  | DeliveredNoticePostData
  | DeliveredComplaintPostData;

type DeliverdTypePostDataArray =
  | DeliveredCommunityPostData[]
  | DeliveredNoticePostData[]
  | DeliveredComplaintPostData[];

interface TableDataProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  list: DeliverdTypePostDataArray;
}

interface CommentData {
  id: number;
  writer: {
    name: string;
    houseName: string;
    lineName: string;
  };
  text: string;
  createdDate: string;
}

export {
  Obj,
  ColumnId,
  Category,
  ProcessedNoticePostData,
  ProcessedComplaintPostData,
  ProcessedCommunityPostData,
  ProcessedTypePostData,
  ProcessedTypePostDataArray,
  isProcessedNoticePostData,
  isProcessedCommunityPostData,
  DeliverdTypePostData,
  DeliverdTypePostDataArray,
  TableDataProps,
  DeliveredCommunityPostData,
  DeliveredNoticePostData,
  DeliveredComplaintPostData,
  isDeliveredCommunityPostData,
  isDeliveredNoticePostData,
  isDeliveredCommunityPostDataArray,
  isDeliveredNoticePostDataArray,
  CommentData,
};
