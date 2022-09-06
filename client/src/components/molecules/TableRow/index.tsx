import { StyledTableRowForComment, StyledTableRowForMobile } from './styled';
import {
  isProcessedNoticePostData,
  isProcessedCommunityPostData,
} from '~/others/integrateInterface';
import { TableRowForMobileProps, TableRowForCommentProps } from './interface';
import { stringByScope, stringByCategory, handledDate } from '~/others/integrateVariable';

const TableRowForMobile: React.FC<TableRowForMobileProps> = ({ row }) => {
  if (isProcessedNoticePostData(row)) {
    return (
      <StyledTableRowForMobile>
        <div>{row.title}</div>
        <p>{`${row.id} | ${stringByScope[row.scope]} | ${row.writer} | ${row.date}`}</p>
      </StyledTableRowForMobile>
    );
  }

  if (isProcessedCommunityPostData(row)) {
    return (
      <StyledTableRowForMobile>
        <div>{row.title}</div>
        <p>{`${row.id} | ${stringByScope[row.scope]} | ${stringByCategory[row.category]} | ${
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
  const {
    writer: { name, houseName, lineName },
    text,
    createdDate,
  } = commentData;
  return (
    <StyledTableRowForComment>
      <div>{text}</div>
      <p>{`${lineName}동 ${houseName}호  ${name} | ${handledDate(createdDate)}`}</p>
    </StyledTableRowForComment>
  );
};

export { TableRowForMobile, TableRowForComment };
