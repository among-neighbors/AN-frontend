import { Obj } from './integrateInterface';

const APIbyType: Obj<string> = {
  notice: `api/v1/notices`,
  complaint: `api/v1/reports`,
  community: `api/v1/communities`,
};

const rangeByType: Obj<string> = {
  ALL: '전체',
  LINE: '라인',
};

const categoryByType: Obj<string> = {
  QNA: '질문글',
  SELLING: '팝니다',
  BUYING: '삽니다',
  PLAIN: '기본글',
};

export { APIbyType, rangeByType, categoryByType };
