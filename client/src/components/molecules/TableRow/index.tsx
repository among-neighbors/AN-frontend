import { StyledTableRowForComment, StyledTableRowForMobile } from './styled';
import {
  isProcessedNoticePostData,
  isProcessedCommunityPostData,
} from '~/others/integrateInterface';
import { TableRowForMobileProps, TableRowForCommentProps } from './interface';
import { categoryByType, rangeByType } from '~/others/integrateVariable';

const TableRowForMobile: React.FC<TableRowForMobileProps> = ({ row }) => {
  if (isProcessedNoticePostData(row)) {
    return (
      <StyledTableRowForMobile>
        <div>{row.title}</div>
        <p>{`${row.id} | ${rangeByType[row.type]} | ${row.writer} | ${row.date}`}</p>
      </StyledTableRowForMobile>
    );
  }

  if (isProcessedCommunityPostData(row)) {
    return (
      <StyledTableRowForMobile>
        <div>{row.title}</div>
        <p>{`${row.id} | ${rangeByType[row.type]} | ${categoryByType[row.category]} | ${
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
