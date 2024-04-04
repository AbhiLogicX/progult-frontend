import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import TableView from 'src/components/tableView';
import Iconify from 'src/components/iconify';

export default function VendorListView() {
  const [rowData, setRowData] = useState();

  // useEffect(()=>{
  //   function fetchRowData
  // })
  const tableColumns = ['Name', 'Email', 'Mobile', 'Status'];
  const actionCol = ['View & Edit', 'Delete'];

  return (
    <>
      <Container sx={{ mx: '8%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Vendors</Typography>

          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Vendor
          </Button>
        </Stack>

        <TableView columns={tableColumns} actionbtn={actionCol} />
      </Container>
    </>
  );
}
