import * as React from 'react';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

function createData(
  bK_Id,
  bussinessName,
  bookedOn,
  bookingAmount,
  addonAmount,
  foodAndBevrages,
  total
) {
  return { bK_Id, bussinessName, bookedOn, bookingAmount, addonAmount, foodAndBevrages, total };
}

const rows = [
  createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
  createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
  createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
  createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
  createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
];

export default function BookingTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>BK Id</TableCell>
            <TableCell>Bussiness Name</TableCell>
            <TableCell>Booked On</TableCell>
            <TableCell>Booking Amount</TableCell>
            <TableCell>Addon Amount</TableCell>
            <TableCell>Food & Bevrages Amount</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {row.bK_Id}
              </TableCell>
              <TableCell>{row.bussinessName}</TableCell>
              <TableCell>{row.bookedOn}</TableCell>
              <TableCell>{row.bookingAmount}</TableCell>
              <TableCell>{row.addonAmount}</TableCell>
              <TableCell>{row.foodAndBevrages}</TableCell>
              <TableCell>{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
