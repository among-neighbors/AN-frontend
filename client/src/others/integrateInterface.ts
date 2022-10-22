import { AxiosResponse } from 'axios';

interface Obj<T> {
  [key: string]: T;
}

interface CustomAxiosResponse extends AxiosResponse {
  data: {
    message: string;
    status: number;
  };
}

interface ProcessedCommonPostData extends Obj<string> {
  id: string;
  title: string;
  content: string;
  writer: string;
  date: string;
}

type ColumnId = 'id' | 'title' | 'scope' | 'category' | 'writer' | 'date';

type Scope = 'ALL' | 'LINE';

type Category = 'QNA' | 'SELLING' | 'BUYING' | 'PLAIN';

interface ProcessedNoticePostData extends ProcessedCommonPostData {
  scope: Scope;
}

interface ProcessedComplaintPostData extends ProcessedCommonPostData {}

interface ProcessedCommunityPostData extends ProcessedCommonPostData {
  scope: Scope;
  category: Category;
}

const isProcessedNoticePostData = (data: any): data is ProcessedNoticePostData => {
  return data.category === undefined && data.scope !== undefined;
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
    id: number;
    name: string;
    lineName: string;
    houseName: string;
  };
  scope: Scope;
  category: Category;
  like: number;
}

interface DeliveredNoticePostData extends DeliveredCommonPostData {
  writer: {
    id: number;
    name: string;
  };
  scope: Scope;
  expiredDate: string;
  releaseLine: string;
}

interface DeliveredComplaintPostData extends DeliveredCommonPostData {
  writer: {
    id: number;
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
    id: number;
    name: string;
    houseName: string;
    lineName: string;
  };
  text: string;
  createdDate: string;
}

export {
  Obj,
  CustomAxiosResponse,
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
  Scope,
};
