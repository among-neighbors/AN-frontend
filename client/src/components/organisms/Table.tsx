import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import { TableRowForMobile } from '../molecules/TableRow';
import { Obj, ColumnId, ProcessedTypePostDataArray } from '~/others/integrateInterface';
import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { parse } from 'query-string';

interface Column {
  id: ColumnId;
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: Function;
}

interface TableProps {
  type: string;
  rows: ProcessedTypePostDataArray | null;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const BoardTable: React.FC<TableProps> = ({ type, rows, isFirstPage, isLastPage }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryObj = Object(parse(location.search));
  const page = queryObj.page ?? '1';

  const handleChangePage = (event: unknown, newPage: number) => {
    event;
    queryObj['page'] = (Number(page) + newPage - (page === '1' ? 0 : 1)).toString();
    const queryStr = new URLSearchParams(queryObj).toString();
    navigate({
      pathname: location.pathname,
      search: queryStr,
    });
  };

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        maxWidth: '1500px',
      }}
    >
      <TableContainer>
        <Table
          stickyHeader
          aria-label='sticky table'
          sx={{ borderTop: '4px solid #333', borderCollapse: 'collapse' }}
        >
          <TableHead>
            <TableRow sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}>
              {columns(type).map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  sx={{
                    minWidth: column.minWidth,
                    whiteSpace: 'nowrap',
                    color: '#4f4f4f',
                    fontSize: '14px',
                    fontWeight: '700',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.map((row, index) => {
              return (
                <React.Fragment key={index}>
                  <TableRow
                    component={Link}
                    to={`${row.id}`}
                    hover
                    tabIndex={-1}
                    sx={{
                      display: { xs: 'none', sm: 'none', md: 'table-row' },
                      textDecoration: 'none',
                      borderTop: '2px solid #e0e0e0',
                      borderBottom: '2px solid #e0e0e0',
                    }}
                  >
                    {columns(type).map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  <TableRow
                    component={Link}
                    to={`${row.id}`}
                    style={{ textDecoration: 'none' }}
                    hover
                    tabIndex={-1}
                    sx={{
                      display: { xs: 'table-row', sm: 'table-row', md: 'none' },
                    }}
                  >
                    <TableRowForMobile row={row} />
                  </TableRow>
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            left: 'calc(50% + 5px)',
            background: '#d9d9d9',
            width: '30px',
            height: '30px',
            borderRadius: '100% 100%',
          }}
        >
          {page}
        </Typography>
        <TablePagination
          sx={{
            '& p': {
              display: 'none',
            },
            '& button': {
              margin: '0 20px',
            },
          }}
          rowsPerPageOptions={[10]}
          component='div'
          count={isLastPage ? 20 - (isFirstPage ? 10 : 0) : 21 - (isFirstPage ? 10 : 0)}
          rowsPerPage={10}
          page={isFirstPage ? 0 : 1}
          onPageChange={handleChangePage}
        ></TablePagination>
        <Button
          component={Link}
          to={`/${type}/writing`}
          variant='text'
          sx={{ position: 'absolute', right: '20px' }}
        >
          {buttonTextByType[type]}
        </Button>
      </Box>
    </Paper>
  );
};

const buttonTextByType: Obj<string> = {
  complaint: '민원 작성',
  community: '글쓰기',
};

interface TypeInfoData {
  labels: string[];
  ids: ColumnId[];
  minWidths: number[];
  formats: (Function | undefined)[];
}

const dataOfTypes: Obj<TypeInfoData> = {
  notice: {
    labels: ['번호', '제목', '유형', '작성자', '등록일'],
    ids: ['id', 'title', 'scope', 'writer', 'date'],
    minWidths: [80, 300, 90, 110, 150],
    formats: [
      undefined,
      undefined,
      (value: string) => {
        if (value === 'ALL') return '전체';
        return '단지';
      },
    ],
  },
  community: {
    labels: ['번호', '제목', '유형', '카테고리', '작성자', '등록일'],
    ids: ['id', 'title', 'scope', 'category', 'writer', 'date'],
    minWidths: [80, 300, 90, 100, 110, 150],
    formats: [
      undefined,
      undefined,
      (value: string) => {
        if (value === 'ALL') return '전체';
        return '단지';
      },
      (value: string) => {
        switch (value) {
          case 'ALL':
            return '전체';
          case 'QNA':
            return '질문글';
          case 'SELLING':
            return '팝니다';
          case 'BUYING':
            return '삽니다';
          case 'PLAIN':
            return '기본글';
        }
      },
    ],
  },
  complaint: {
    labels: ['번호', '제목', '작성자', '등록일'],
    ids: ['id', 'title', 'writer', 'date'],
    minWidths: [80, 300, 110, 150],
    formats: [],
  },
};

const columns = (type: string): Column[] => {
  const data = dataOfTypes[type];
  return data.labels.map((label, index): Column => {
    return {
      id: data.ids[index],
      label: label,
      minWidth: data.minWidths[index],
      align: 'center',
      format: data.formats[index],
    };
  });
};

export default BoardTable;
