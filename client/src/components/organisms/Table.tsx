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

  return (
    <Paper
      sx={{
        width: '100%',
        overflow: 'hidden',
        marginBottom: '40px',
        maxWidth: '1500px',
      }}
    >
      <TableContainer>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}>
              {columns(labels).map((column) => (
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
              return (
                <>
                  <TableRow
                    component={Link}
                    to={`${row.ID}`}
                    style={{ textDecoration: 'none' }}
                    hover
                    tabIndex={-1}
                    key={index}
                    sx={{ display: { xs: 'none', sm: 'none', md: 'table-row' } }}
                  >
                    {columns(labels).map((column) => {
                      const value = row[column.id];
                      console.log(column, value);
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {column.format && typeof value === 'boolean'
                            ? column.format(value)
                            : value}
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
                </>
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
