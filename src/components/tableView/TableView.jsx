import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

export default function TableView({ columns, actionbtn, tableData }) {
  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }

  return (
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
                        <Button variant="contained" sx={{ mr: 2 }}>
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
  );
}

TableView.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
};
