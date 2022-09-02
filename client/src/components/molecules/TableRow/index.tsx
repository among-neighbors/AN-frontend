import { StyledTableRowForComment, StyledTableRowForMobile } from './styled';
import { isNoticeData, isCommunityData, Obj } from '~/others/integrateInterface';
import { TableRowForMobileProps, TableRowForCommentProps } from './interface';

const TableRowForMobile: React.FC<TableRowForMobileProps> = ({ row }) => {
  if (isNoticeData(row)) {
    return (
      <StyledTableRowForMobile>
        <div>{row.title}</div>
        <p>{`${row.ID} | ${row.type === 'ALL' ? '전체' : '라인'} | ${row.writer} | ${row.date}`}</p>
      </StyledTableRowForMobile>
    );
  }

  if (isCommunityData(row)) {
    return (
      <StyledTableRowForMobile>
        <div>{row.title}</div>
        <p>{`${row.ID} | ${row.type === 'ALL' ? '전체' : '라인'} | ${
          categoryByType[row.category]
        } | ${row.writer} | ${row.date}`}</p>
      </StyledTableRowForMobile>
    );
  }

  // Complaint
  return (
    <StyledTableRowForMobile>
      <div>{row.title}</div>
      <p>{`${row.ID} | ${row.writer} | ${row.date}`}</p>
    </StyledTableRowForMobile>
  );
};

const TableRowForComment: React.FC<TableRowForCommentProps> = ({ commentData }) => {
  const { comment, writer, date } = commentData;
  return (
    <StyledTableRowForComment>
      <div>{comment}</div>
      <p>{`${writer} | ${date}`}</p>
    </StyledTableRowForComment>
  );
};

const categoryByType: Obj<string> = {
  QNA: '질문글',
  SELLING: '팝니다',
  BUYING: '삽니다',
  PLAIN: '기본글',
};

export { TableRowForMobile, TableRowForComment };
