import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getReq } from 'src/api/api';

import TableView from 'src/components/tableView';

export default function CustomerListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

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
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Customer</Typography>
      </Stack>

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
