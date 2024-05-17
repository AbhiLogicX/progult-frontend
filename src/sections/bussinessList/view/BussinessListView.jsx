import format from 'date-fns/format';
import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import Iconify from 'src/components/iconify/iconify';
import TableFilterToolBar from 'src/components/ToolBar/tableFilter';
import TableViewBussiness from 'src/components/tableView/TableViewBussiness';

import ContactInfoDialog from 'src/sections/BussinessDetailView/ContactFormDialog';

export default function BussinessListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    fromDate: '',
    toDate: format(new Date(), 'yyyy-MM-dd'),
    vendorId: '',
    activityId: '',
    status: '',
    domain: '',
    state: '',
    city: '',
  });
  const { setTitle } = useContext(TitleContext);
  const urlStr = `bussiness?${filterData.status !== '' ? `status=${filterData.status}` : ''}${
    filterData.domain !== '' ? `&domain=${filterData.domain}` : ''
  }${filterData.activityId !== '' ? `&activityId=${filterData.activityId}` : ''}${
    filterData.state !== '' ? `&state=${filterData.state}` : ''
  }${filterData.city !== '' ? `&city=${filterData.city}` : ''}${
    filterData.fromDate !== '' ? `&fromDate=${filterData.fromDate}` : ''
  }${filterData.toDate !== '' ? `&toDate=${filterData.toDate}` : ''}${
    filterData.vendorId !== '' ? `&vendorId=${filterData.vendorId}` : ''
  }`;
  // console.log(urlStr);
  // bussiness?status=active&domain=661915a88a1d92ba4ba83672&activityId=661aa8d70421b70e3e44ad5e&state=chh&city=Raipur&fromDate=2024-04-15&toDate=2024-04-16&vendorId=6604220d7e2d0d1e0a6c7fee
  useEffect(() => {
    if (!fetchedData) {
      fetchRowData();
    }
    async function fetchRowData() {
      // const result = await getReq('bussiness');
      const result = await getReq(urlStr);
      setRowData(result.data);
      setFetchedData(true);
      setLoading(false);
    }
    fetchRowData();
  }, [fetchedData, urlStr]);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const tableColumns = [
    'Image',
    'Titie',
    'Categoery',
    'City / State',
    'Owner Name',
    'Status',
    'Ratings',
  ];
  const actionCol = ['View'];
  setTitle('Bussinesses');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        sx={{ mb: 5 }}
      >
        <Typography variant="h4">Bussinesses</Typography>
        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Bussinesss
        </Button>
      </Stack> */}

      <Box mb={1} textAlign="right">
        <Button
          onClick={handleDialogOpen}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add New Bussiness
        </Button>
        <ContactInfoDialog
          open={openDialog}
          handleClose={handleDialogClose}
          fromCall="add"
          handleReload={setFetchedData}
        />
      </Box>

      <TableFilterToolBar
        fromCall="bussiness"
        filterData={filterData}
        handleReload={setFetchedData}
        setFilterData={setFilterData}
      />

      {fetchedData ? (
        <TableViewBussiness columns={tableColumns} actionbtn={actionCol} tableData={rowData} />
      ) : (
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
}
