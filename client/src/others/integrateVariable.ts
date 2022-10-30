import { Obj } from './integrateInterface';

const APIbyType: Obj<string> = {
  notice: `api/v1/notices`,
  complaint: `api/v1/reports`,
  community: `api/v1/communities`,
};

const stringByScope: Obj<string> = {
  ALL: '전체',
  LINE: '단지',
};

const stringByCategory: Obj<string> = {
  QNA: '질문글',
  SELLING: '팝니다',
  BUYING: '삽니다',
  PLAIN: '기본글',
};

const handledDate = (createdDate: string) => {
  return createdDate.substring(0, 10);
};

const ColorsByProfileIndex = [
  '#fff',
  '#E7602A',
  '#EE8933',
  '#E1BA75',
  '#6F8A6A',
  '#265431',
  '#1F4C73',
  '#3B82BF',
  '#F2AE30',
  '#D98D62',
];

const MANAGER_HOUSENAME = '000';

export {
  APIbyType,
  stringByScope,
  handledDate,
  stringByCategory,
  ColorsByProfileIndex,
  MANAGER_HOUSENAME,
};
