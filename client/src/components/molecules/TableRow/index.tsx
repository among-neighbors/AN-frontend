import { StyledTableRowForComment, StyledTableRowForMobile } from './styled';
import { ComplaintData, NoticeData, CommunityData } from '~/others/integrateInterface';

interface TableRowForMobileProps {
  row: NoticeData | ComplaintData | CommunityData;
}

const TableRowForMobile: React.FC<TableRowForMobileProps> = ({ row }) => {
  return (
    <StyledTableRowForMobile>
      <div>{row.title}</div>
      <p>{`${row.ID} | ${row.type ? '라인' : '단지'} | ${row.writer} | ${row.date}`}</p>
    </StyledTableRowForMobile>
  );
};

interface Comment {
  writer: string;
  comment: string;
  date: string;
}

interface TableRowForCommentProps {
  commentData: Comment;
}

const TableRowForComment: React.FC<TableRowForCommentProps> = ({ commentData }) => {
  const { comment, writer, date } = commentData;
  return (
    <StyledTableRowForComment>
      <div>{comment}</div>
      <p>{`${writer} | ${date}`}</p>
    </StyledTableRowForComment>
  );
};

export { TableRowForMobile, TableRowForComment };
