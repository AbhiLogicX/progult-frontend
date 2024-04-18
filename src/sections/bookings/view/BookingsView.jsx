// import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

// import { getReq } from 'src/api/api';

import TableView from 'src/components/tableView/TableView';

export default function BookingsView() {
  //   const [rowData, setRowData] = useState([]);
  //   const [fetchedData, setFetchedData] = useState(false);

  const tableColumns = ['User', 'Bussiness', 'Date/Time Booked', 'Activites', 'Amount'];
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        sx={{ mb: 5 }}
      >
        <Typography variant="h4">Bookings</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Bussinesss
          </Button> */}
      </Stack>

      <TableView columns={tableColumns} tableData={null} />
    </Container>
  );
}
