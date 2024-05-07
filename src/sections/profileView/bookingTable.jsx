import * as React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { getReq } from 'src/api/api';

// function createData(
//   bK_Id,
//   bussinessName,
//   bookedOn,
//   bookingAmount,
//   addonAmount,
//   foodAndBevrages,
//   total
// ) {
//   return { bK_Id, bussinessName, bookedOn, bookingAmount, addonAmount, foodAndBevrages, total };
// }

// const rows = [
//   createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
//   createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
//   createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
//   createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
//   createData('115236', 'M Bussiness', '27-02-2024 at 02:00PM', 1200, 500, 300, 2000),
// ];

export default function BookingTable({ usId, fromCall }) {
  const [fetchedData, setFetchedData] = React.useState(false);
  const [fetchedEventData, setFetchedEventData] = React.useState(false);
  const [bussinesBookingData, setBussinesBookingData] = React.useState();
  const [eventBookingData, setEventBookingData] = React.useState();
  React.useEffect(() => {
    if (!fetchedData) {
      fetchBussinessBooking();
    }
    if (!fetchedEventData) {
      fetchEvnetBooking();
    }
    async function fetchBussinessBooking() {
      await getReq(`booking/business?userId=${usId}`).then((res) => {
        if (res.statusCode === 200) {
          setBussinesBookingData(res.data);
          setFetchedData(true);
        }
      });
    }
    async function fetchEvnetBooking() {
      await getReq(`booking/business?userId=${usId}`).then((res) => {
        if (res.statusCode === 200) {
          setEventBookingData(res.data);
          setFetchedEventData(true);
        }
      });
    }
  }, [fetchedData, usId, fetchedEventData]);
  // console.log('eventBookingData', eventBookingData);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>BK Id</TableCell>
            <TableCell>{fromCall === 'bussiness' ? 'Bussiness Name' : 'Event Name'}</TableCell>
            <TableCell>Booked On</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Total Ammount</TableCell>
          </TableRow>
        </TableHead>
        {fromCall === 'bussiness' ? (
          <TableBody>
            {bussinesBookingData?.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row?.bookNo}
                </TableCell>
                <TableCell>{row?.bussinessId?.title}</TableCell>
                <TableCell>{format(new Date(row?.createdAt), 'dd-MMM-yyyy')}</TableCell>
                <TableCell>{row?.status}</TableCell>
                <TableCell>{row?.totalPayable}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
        {fromCall === 'event' ? (
          <TableBody>
            {eventBookingData?.map((row) => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row?.bookNo}
                </TableCell>
                <TableCell>{row?.bussinessId?.title}</TableCell>
                <TableCell>{format(new Date(row?.createdAt), 'dd-MMM-yyyy')}</TableCell>
                <TableCell>{row?.status}</TableCell>
                <TableCell>{row?.totalPayable}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
  );
}

BookingTable.propTypes = {
  usId: PropTypes.string,
  fromCall: PropTypes.string,
};
