import { Category } from '~/others/integrateInterface';

interface ListPageProps {
  type: string;
  accountAccessToken: string;
  isReadyForRequestAPI: boolean;
}

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

const isCommunityListData = (list: any): list is CommunityListData[] => {
  return list[0].category !== undefined;
};

const isNoticeListData = (list: any): list is NoticeListData[] => {
  return list[0].expiredDate !== undefined;
};

type ListDataArray = CommunityListData[] | NoticeListData[] | ComplaintListData[];

interface TableDataProps {
  isFirstPage: boolean;
  isLastPage: boolean;
  list: ListDataArray;
}

export {
  ListPageProps,
  ListDataArray,
  TableDataProps,
  CommunityListData,
  NoticeListData,
  ComplaintListData,
  isCommunityListData,
  isNoticeListData,
};
