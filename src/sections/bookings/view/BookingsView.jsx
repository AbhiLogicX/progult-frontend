import format from 'date-fns/format';
import { useLocation } from 'react-router-dom';
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
  const [rowBussinessData, setRowBussinessData] = useState([]);
  const [rowEventData, setRowEventData] = useState([]);
  const [fetchedBussinessData, setFetchedBussinessData] = useState(false);
  const [fetchedEventData, setFetchedEventData] = useState(false);
  const { setTitle } = useContext(TitleContext);

  const location = useLocation().pathname.split('/')[2];
  const [filterData, setFilterData] = useState({
    fromDate: '',
    toDate: format(new Date(), 'yyyy-MM-dd'),
    vendorId: '',
    activityId: '',
    domain: '',
    state: '',
    city: '',
    bussinessId: '',
    userId: '',
    hostName: '',
  });

  const bussinessUrlStr = `booking/business?${
    filterData.bussinessId !== '' ? `bussinessId=${filterData.bussinessId}` : ''
  }${filterData.activityId !== '' ? `&activityId=${filterData.activityId}` : ''}${
    filterData.state !== '' ? `&state=${filterData.state}` : ''
  }${filterData.city !== '' ? `&city=${filterData.city}` : ''}${
    filterData.fromDate !== '' ? `&fromDate=${filterData.fromDate}` : ''
  }${filterData.toDate !== '' ? `&toDate=${filterData.toDate}` : ''}
  ${filterData.domain !== '' ? `&domain=${filterData.domain}` : ''}
  ${filterData.userId !== '' ? `&userId=${filterData.userId}` : ''}${
    filterData.vendorId !== '' ? `&vendorId=${filterData.vendorId}` : ''
  }`;

  const eventUrlStr = `booking/event?${
    filterData.bussinessId !== '' ? `bussinessId=${filterData.bussinessId}` : ''
  }${filterData.activityId !== '' ? `&activityId=${filterData.activityId}` : ''}${
    filterData.state !== '' ? `&state=${filterData.state}` : ''
  }${filterData.city !== '' ? `&city=${filterData.city}` : ''}${
    filterData.fromDate !== '' ? `&fromDate=${filterData.fromDate}` : ''
  }${filterData.toDate !== '' ? `&toDate=${filterData.toDate}` : ''}
  ${filterData.domain !== '' ? `&domain=${filterData.domain}` : ''}
  ${filterData.userId !== '' ? `&userId=${filterData.userId}` : ''}${
    filterData.vendorId !== '' ? `&vendorId=${filterData.vendorId}` : ''
  }${filterData.hostName !== '' ? `&hostName=${filterData.hostName}` : ''}`;

  const tableColumnsBussiness = [
    'Booking No.',
    'Customer',
    'Bussiness',
    'Date Booked',
    'Amount',
    'Pay Status',
  ];
  const tableColumnsEvent = [
    'Booking No.',
    'Customer',
    'Evnet',
    'Date Booked',
    'Amount',
    'Pay Status',
  ];
  const actionCol = ['View'];

  useEffect(() => {
    if (
      (!fetchedBussinessData && location === 'bussiness') ||
      (!fetchedEventData && location === 'event')
    ) {
      fetchBookings();
    }
    async function fetchBookings() {
      if (location === 'bussiness') {
        await getReq(bussinessUrlStr).then((res) => {
          if (res.statusCode === 200) {
            // console.log('controll', res.data[0]);

            setRowBussinessData(res.data);
            setFetchedBussinessData(true);
          }
          if (res.response.data.statusCode === 404) {
            setRowBussinessData([]);
            setFetchedBussinessData(true);
          }
        });
      }
      if (location === 'event') {
        await getReq(eventUrlStr).then((res) => {
          if (res.statusCode === 200) {
            // console.log('controll', res.data[0]);

            setRowEventData(res.data);
            setFetchedEventData(true);
          }
          if (res.response.data.statusCode === 404) {
            setRowEventData([]);
            setFetchedEventData(true);
          }
        });
      }
    }
  }, [location, bussinessUrlStr, fetchedBussinessData, fetchedEventData, eventUrlStr]);

  const handleReload = () => {
    // console.log('reload called');
    setFetchedEventData(false);
    setFetchedBussinessData(false);
  };

  // console.log(rowData);
  setTitle(location === 'bussiness' ? 'Bussiness Bookings' : 'Event Bookings');
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
      <TableFilterToolBar
        fromCall="bookings"
        filterData={filterData}
        setFilterData={setFilterData}
        handleReload={handleReload}
      />

      <TableViewBooking
        columns={location === 'bussiness' ? tableColumnsBussiness : tableColumnsEvent}
        tableData={location === 'bussiness' ? rowBussinessData : rowEventData}
        actionbtn={actionCol}
        fromCall={location}
      />
    </Container>
  );
}
