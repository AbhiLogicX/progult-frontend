import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { RouterLink } from 'src/routes/components';

export default function TableView({ columns, actionbtn, tableData }) {
  const location = useLocation().pathname.split('/');
  console.log(location);

  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }

  return (
    <Paper elevation={3} sx={{ width: 1400 }}>
      <TableContainer component={Box} sx={{ width: 1400 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((colItem) => (
                <TableCell>{colItem}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {actionbtn
              ? tableData.map((row) => (
                  <TableRow
                    key={row.fullName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fullName}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    {columns.includes('City/State') && (
                      <TableCell>{`${row?.address?.city || ' '} , ${
                        row?.address?.state || ' '
                      }`}</TableCell>
                    )}
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      {actionbtn.map((btnItm) => {
                        if (btnItm === 'Delete') {
                          return (
                            <Button variant="contained" sx={{ mr: 2 }} color="error">
                              {btnItm}
                            </Button>
                          );
                        }
                        return (
                          <Button
                            variant="contained"
                            sx={{ mr: 2 }}
                            component={RouterLink}
                            href={`/${location[1]}/detail/${row._id}`}
                          >
                            {btnItm}
                          </Button>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                ))
              : tableData.map((row) => (
                  <TableRow
                    key={row.fullName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fullName}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

TableView.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
};
