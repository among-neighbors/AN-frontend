import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
  id: 'ID' | 'title' | 'type' | 'writer' | 'date';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: boolean) => string;
}

const columns: readonly Column[] = [
  { id: 'ID', label: 'ID', minWidth: 170 },
  { id: 'title', label: 'title', minWidth: 100 },
  {
    id: 'type',
    label: 'type',
    minWidth: 170,
    align: 'right',
    format: (value: boolean) => {
      if (value === false) {
        return '단지';
      } else {
        return '라인';
      }
    },
  },
  {
    id: 'writer',
    label: 'writer',
    minWidth: 170,
    align: 'right',
  },
  {
    id: 'date',
    label: 'date',
    minWidth: 170,
    align: 'right',
  },
];

interface Data {
  ID: string;
  title: string;
  type: boolean;
  writer: string;
  date: string;
}

function createData(ID: string, title: string, type: boolean, writer: string, date: string): Data {
  return { ID, title, type, writer, date };
}

const rows = [
  createData('India', 'IN', true, '1324171354', '3287263'),
  createData('China', 'CN', false, '1403500365', '9596961'),
  createData('Italy', 'IT', false, '60483973', '301340'),
  createData('United States', 'US', true, '327167434', '9833520'),
  createData('Canada', 'CA', false, '37602103', '9984670'),
  createData('Australia', 'AU', true, '25475400', '7692024'),
  createData('Germany', 'DE', true, '83019200', '357578'),
  createData('India', 'IN', true, '1324171354', '3287263'),
  createData('China', 'CN', false, '1403500365', '9596961'),
  createData('Italy', 'IT', false, '60483973', '301340'),
  createData('United States', 'US', true, '327167434', '9833520'),
  createData('Canada', 'CA', false, '37602103', '9984670'),
  createData('Australia', 'AU', true, '25475400', '7692024'),
  createData('Germany', 'DE', true, '83019200', '357578'),
  createData('India', 'IN', true, '1324171354', '3287263'),
  createData('China', 'CN', false, '1403500365', '9596961'),
  createData('Italy', 'IT', false, '60483973', '301340'),
  createData('United States', 'US', true, '327167434', '9833520'),
  createData('Canada', 'CA', false, '37602103', '9984670'),
  createData('Australia', 'AU', true, '25475400', '7692024'),
  createData('Germany', 'DE', true, '83019200', '357578'),
];

const StickyHeadTable = () => {
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
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'boolean' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
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

export default StickyHeadTable;
