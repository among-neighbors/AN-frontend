import { StyledTableRowForComment, StyledTableRowForMobile } from './styled';
import {
  isProcessedNoticePostData,
  isProcessedCommunityPostData,
} from '~/others/integrateInterface';
import { TableRowForMobileProps, TableRowForCommentProps } from './interface';
import { stringByRange, stringByCategory } from '~/others/integrateVariable';

const TableRowForMobile: React.FC<TableRowForMobileProps> = ({ row }) => {
  if (isProcessedNoticePostData(row)) {
    return (
      <StyledTableRowForMobile>
        <div>{row.title}</div>
        <p>{`${row.id} | ${stringByRange[row.range]} | ${row.writer} | ${row.date}`}</p>
      </StyledTableRowForMobile>
    );
  }

  if (isProcessedCommunityPostData(row)) {
    return (
      <StyledTableRowForMobile>
        <div>{row.title}</div>
        <p>{`${row.id} | ${stringByRange[row.range]} | ${stringByCategory[row.category]} | ${
          row.writer
        } | ${row.date}`}</p>
      </StyledTableRowForMobile>
    );
  }

  // Complaint
  return (
    <StyledTableRowForMobile>
      <div>{row.title}</div>
      <p>{`${row.id} | ${row.writer} | ${row.date}`}</p>
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

export { TableRowForMobile, TableRowForComment };
