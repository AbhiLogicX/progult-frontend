import format from 'date-fns/format';
import { useState, useEffect, useContext } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import Iconify from 'src/components/iconify';
import TableFilterToolBar from 'src/components/ToolBar/tableFilter';
import TableViewEvent from 'src/components/tableView/TableViweEvent';

import EventInfoDialogForm from 'src/sections/eventDetailView/EditEventDialogInfoForm';

export default function EventListView() {
  const [rowData, setRowData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setTitle } = useContext(TitleContext);
  const [filterData, setFilterData] = useState({
    fromDate: '',
    toDate: format(new Date(), 'yyyy-MM-dd'),
    vendorId: '',
    activityId: '',
    status: '',
    domain: '',
    state: '',
    city: '',
    bussinessId: '',
    host: '',
  });
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const eventUrlStr = `event?${
    filterData.bussinessId !== '' ? `bussinessId=${filterData.bussinessId}` : ''
  }${filterData.status !== '' ? `status=${filterData.status}` : ''}${
    filterData.activityId !== '' ? `&activityId=${filterData.activityId}` : ''
  }${filterData.state !== '' ? `&state=${filterData.state}` : ''}${
    filterData.city !== '' ? `&city=${filterData.city}` : ''
  }${filterData.fromDate !== '' ? `&fromDate=${filterData.fromDate}` : ''}${
    filterData.toDate !== '' ? `&toDate=${filterData.toDate}` : ''
  }${filterData.host !== '' ? `&hostName=${filterData.host}` : ''}`;
  useEffect(() => {
    if (!fetchedData) {
      fetchRowData();
    }
    async function fetchRowData() {
      const result = await getReq(eventUrlStr);
      setRowData(result.data);
      setFetchedData(true);
      setLoading(false);
    }
  }, [fetchedData, eventUrlStr]);
  const tableColumns = [
    'Image',
    'Titie',
    'City / State',
    'Owner Name',
    'Host Name',
    'Status',
    'Rating/ReviewCount',
  ];
  const actionCol = ['View'];
  setTitle('Events');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box mb={2} width="100%" textAlign="right">
        {/* <Typography variant="h4">Events</Typography> */}

        <Button
          onClick={handleDialogOpen}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Event
        </Button>
        <EventInfoDialogForm
          openDialog={openDialog}
          handleClose={handleDialogClose}
          handleReload={setFetchedData}
          fromCall="add"
        />
      </Box>

      <TableFilterToolBar
        fromCall="event"
        filterData={filterData}
        handleReload={setFetchedData}
        setFilterData={setFilterData}
      />

      {fetchedData ? (
        <TableViewEvent columns={tableColumns} actionbtn={actionCol} tableData={rowData} />
      ) : (
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
}
