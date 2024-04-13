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
      console.log('event', result.data);
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
  const actionCol = ['View & Edit', 'Delete'];
  return (
    <Container component="div" sx={{ mx: '1%', width: 1500 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        sx={{ mb: 5, width: 1400 }}
      >
        <Typography variant="h4">Event List</Typography>

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
