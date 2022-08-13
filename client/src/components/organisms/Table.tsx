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
  align?: 'center';
  format?: (value: boolean) => string;
}

const columns = (labels: string[]): Column[] => {
  return [
    { id: 'ID', label: `${labels[0]}`, minWidth: 80, align: 'center' },
    { id: 'title', label: `${labels[1]}`, minWidth: 300 },
    {
      id: 'type',
      label: `${labels[2]}`,
      minWidth: 90,
      align: 'center',
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
      label: `${labels[3]}`,
      minWidth: 110,
      align: 'center',
    },
    {
      id: 'date',
      label: `${labels[4]}`,
      minWidth: 150,
      align: 'center',
    },
  ];
};

interface Data {
  ID: string;
  title: string;
  type: boolean;
  writer: string;
  date: string;
}

interface TableProps {
  labels: string[];
  rows: Data[];
}

const StickyHeadTable = ({ labels, rows }: TableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //display: { md: 'block', sm: 'none', xs: 'none' },
  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
      }}
    >
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns(labels).map((column) => (
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
                  {columns(labels).map((column) => {
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
