import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getReq } from 'src/api/api';

import Iconify from 'src/components/iconify';
import TableViewEvent from 'src/components/tableView/TableViweEvent';

export default function EventListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    async function fetchRowData() {
      const result = await getReq('event');
      setRowData(result.data);

      setFetchedData(true);
    }
    fetchRowData();
  }, []);
  const tableColumns = [
    'Image',
    'Titie',
    'City / State',
    'Owner Name',
    'Host Name',
    'Status',
    'Rating/ReviewCount',
  ];
  const actionCol = ['View', 'Delete'];
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} width="100%">
        <Typography variant="h4">Events</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Event
        </Button>
      </Stack>

      {fetchedData ? (
        <TableViewEvent columns={tableColumns} actionbtn={actionCol} tableData={rowData} />
      ) : null}
    </Container>
  );
}
