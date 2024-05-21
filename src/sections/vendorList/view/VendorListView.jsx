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
import TableView from 'src/components/tableView';
import TableFilterToolBar from 'src/components/ToolBar/tableFilter';

export default function VendorListView() {
  const [rowData, setRowData] = useState([]);
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

  const urlStr = `vendor/all?${
    filterData.bussinessId !== '' ? `bussinessId=${filterData.bussinessId}` : ''
  }${filterData.status !== '' ? `status=${filterData.status}` : ''}${
    filterData.activityId !== '' ? `&activityId=${filterData.activityId}` : ''
  }${filterData.state !== '' ? `&state=${filterData.state}` : ''}${
    filterData.city !== '' ? `&city=${filterData.city}` : ''
  }${filterData.fromDate !== '' ? `&fromDate=${filterData.fromDate}` : ''}${
    filterData.toDate !== '' ? `&toDate=${filterData.toDate}` : ''
  }${filterData.host !== '' ? `&hostName=${filterData.host}` : ''}`;

  useEffect(() => {
    async function fetchRowData() {
      const result = await getReq(urlStr);
      setRowData(result.data);
      setFetchedData(true);
      setLoading(false);
    }

    if (!fetchedData) {
      fetchRowData();
    }
  }, [fetchedData, urlStr]);

  const tableColumns = ['Name', 'Email', 'Mobile', 'Status'];
  const actionCol = ['View', 'Delete'];
  setTitle('Associate Partners');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box mb={2} textAlign="right">
        {/* <Typography variant="h4">Associate Partners</Typography> */}

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Vendor
        </Button>
      </Box>

      <TableFilterToolBar
        fromCall="vendor"
        filterData={filterData}
        handleReload={setFetchedData}
        setFilterData={setFilterData}
      />

      {fetchedData ? (
        <TableView
          columns={tableColumns}
          actionbtn={actionCol}
          tableData={rowData}
          fromCall="vendor"
          handleReload={setFetchedData}
        />
      ) : (
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
}
