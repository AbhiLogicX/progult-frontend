import * as React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import { Box, Typography } from '@mui/material';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

export default function FeedbackTable({ tableData, tableCol }) {
  // console.log('tabledata', tableData);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableCol?.map((cols) => (
              <TableCell>{cols}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData?.map((row) => (
            <TableRow
              key={row.complaintNo}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row?.complaintNo}
              </TableCell>
              <TableCell>{row?.description}</TableCell>
              <TableCell>{row?.owner?.fullName}</TableCell>
              <TableCell>
                <Box>
                  <Typography>{row?.bussinessId?.title}</Typography>
                  <Typography variant="caption">{row?.bussinessId?.uniqCode}</Typography>
                </Box>
              </TableCell>
              <TableCell>{format(new Date(row.createdAt), 'dd-MMM-yyyy')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

FeedbackTable.propTypes = {
  tableData: PropTypes.array,
  tableCol: PropTypes.array,
};
