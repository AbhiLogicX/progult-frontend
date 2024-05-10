import format from 'date-fns/format';
import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import TableView from 'src/components/tableView';
import TableFilterToolBar from 'src/components/ToolBar/tableFilter';

export default function CustomerListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
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

  const urlStr = `user/all?${
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
      const result = await getReq(urlStr);
      setRowData(result.data);
      setFetchedData(true);
    }
  }, [fetchedData, urlStr]);
  const tableColumns = ['Name', 'Email', 'Mobile', 'City/State', 'Status'];
  const actionCol = ['View', 'Delete'];
  setTitle('Customer');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box mb={2}>{/* <Typography variant="h4">Customer</Typography> */}</Box>

      <TableFilterToolBar
        fromCall="customer"
        filterData={filterData}
        handleReload={setFetchedData}
        setFilterData={setFilterData}
      />
      {fetchedData ? (
        <TableView
          fromCall="user"
          handleReload={setFetchedData}
          columns={tableColumns}
          actionbtn={actionCol}
          tableData={rowData}
        />
      ) : null}
    </Container>
  );
}
