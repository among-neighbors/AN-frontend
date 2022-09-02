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
import { Obj, ColumnId, TypeDataArray } from '~/others/integrateInterface';

interface Column {
  id: ColumnId;
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: Function;
}

interface TableProps {
  type: string;
  rows: TypeDataArray;
  isFirstPage: boolean;
  isLastPage: boolean;
}

const BoardTable: React.FC<TableProps> = ({ type, rows, isFirstPage, isLastPage }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}>
              {columns(type).map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, whiteSpace: 'nowrap' }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => {
              return (
                <React.Fragment key={index}>
                  <TableRow
                    component={Link}
                    to={`${row.ID}`}
                    style={{ textDecoration: 'none' }}
                    hover
                    tabIndex={-1}
                    sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}
                  >
                    {columns(type).map((column) => {
                      const value = row[column.id];
                      console.log(value);
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
                    to={`${row.ID}`}
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
      <TablePagination
        rowsPerPageOptions={[10]}
        component='div'
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

interface typeData {
  labels: string[];
  Ids: ColumnId[];
  minWidths: number[];
  formats: (Function | undefined)[];
}

const dataOfTypes: Obj<typeData> = {
  notice: {
    labels: ['공지 ID', '제목', '공지 유형', '작성자', '등록일'],
    Ids: ['ID', 'title', 'type', 'writer', 'date'],
    minWidths: [80, 300, 90, 110, 150],
    formats: [undefined, undefined, undefined, undefined, undefined],
  },
  community: {
    labels: ['게시글 ID', '제목', '게시글 유형', '카테고리', '작성자', '등록일'],
    Ids: ['ID', 'title', 'type', 'category', 'writer', 'date'],
    minWidths: [80, 300, 90, 100, 110, 150],
    formats: [
      undefined,
      undefined,
      (value: string) => {
        if (value === 'ALL') return '전체';
        return '라인';
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
      undefined,
      undefined,
    ],
  },
  complaint: {
    labels: ['민원 ID', '제목', '작성자', '등록일'],
    Ids: ['ID', 'title', 'type', 'date'],
    minWidths: [80, 300, 110, 150],
    formats: [undefined, undefined, undefined, undefined],
  },
};

const columns = (type: string): Column[] => {
  const data = dataOfTypes[type];
  return data.labels.map((label, index): Column => {
    return {
      id: data.Ids[index],
      label: label,
      minWidth: data.minWidths[index],
      align: label === '제목' ? undefined : 'center',
      format: data.formats[index],
    };
  });
};

export default BoardTable;
