import { StyledTableRowForComment, StyledTableRowForMobile } from './styled';
import {
  isProcessedNoticePostData,
  isProcessedCommunityPostData,
} from '~/others/integrateInterface';
import { TableRowForMobileProps, TableRowForCommentProps } from './interface';
import { stringByScope, stringByCategory, handledDate } from '~/others/integrateVariable';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';

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
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'inherit !important' }}>
        {text.split('\n').map((str, index) => {
          return <Typography key={index}>{str}</Typography>;
        })}
      </Box>
      <p>{`${lineName === '000' ? '' : `${lineName} ${houseName}`}  ${name} | ${handledDate(
        createdDate,
      )}`}</p>
    </StyledTableRowForComment>
  );
};

export { TableRowForMobile, TableRowForComment };
