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

  useEffect(() => {
    if (!fetchedData) {
      fetchRowData();
    }
    async function fetchRowData() {
      const result = await getReq('user/all');
      setRowData(result.data);
      setFetchedData(true);
    }
  }, [fetchedData]);
  const tableColumns = ['Name', 'Email', 'Mobile', 'City/State', 'Status'];
  const actionCol = ['View', 'Delete'];
  setTitle('Customer');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box mb={2}>{/* <Typography variant="h4">Customer</Typography> */}</Box>

      <TableFilterToolBar fromCall="customer" />
      {fetchedData ? (
        <TableView
          columns={tableColumns}
          actionbtn={actionCol}
          tableData={rowData}
          fromCall="user"
          handleReload={setFetchedData}
        />
      ) : null}
    </Container>
  );
}
