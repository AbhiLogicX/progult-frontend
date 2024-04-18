import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getReq } from 'src/api/api';

import Iconify from 'src/components/iconify';
import TableView from 'src/components/tableView';

export default function VendorListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    async function fetchRowData() {
      const result = await getReq('vendor/all');
      setRowData(result.data);
      setFetchedData(true);
    }

    if (!fetchedData) {
      fetchRowData();
    }
  }, [fetchedData]);

  const tableColumns = ['Name', 'Email', 'Mobile', 'Status'];
  const actionCol = ['View & Edit', 'Delete'];
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Associate Partners</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Vendor
        </Button>
      </Stack>

      {fetchedData ? (
        <TableView
          columns={tableColumns}
          actionbtn={actionCol}
          tableData={rowData}
          fromCall="vendor"
          handleReload={setFetchedData}
        />
      ) : null}
    </Container>
  );
}
