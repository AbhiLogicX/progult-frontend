import { useState, useEffect, useContext } from 'react';
// import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

import Container from '@mui/material/Container';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import TableFilterToolBar from 'src/components/ToolBar/tableFilter';
import TableViewBooking from 'src/components/tableView/TableViewBooking';
// import { Tab } from '@mui/material';

export default function BookingsView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const { setTitle } = useContext(TitleContext);

  const tableColumns = [
    'Booking No.',
    'Customer',
    'Bussiness',
    'Date Booked',
    'Amount',
    'Pay Status',
  ];
  const actionCol = ['View'];
  setTitle('Bookings');
  useEffect(() => {
    if (!fetchedData) {
      fetchBookings();
    }
    async function fetchBookings() {
      await getReq(`booking/business`).then((res) => {
        if (res.statusCode === 200) {
          // console.log('controll', res.data[0]);
          setRowData(res.data);
          setFetchedData(true);
        }
      });
    }
  });

  // console.log(rowData);

  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        sx={{ mb: 5 }}
      >
        {/* <Typography variant="h4">TitleContext</Typography> */}

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Bussinesss
          </Button> */}
      </Stack>
      <TableFilterToolBar fromCall="bookings" />

      <TableViewBooking columns={tableColumns} tableData={rowData} actionbtn={actionCol} />
    </Container>
  );
}
