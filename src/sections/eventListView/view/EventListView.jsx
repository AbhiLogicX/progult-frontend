import { useState, useEffect, useContext } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import Iconify from 'src/components/iconify';
import TableFilterToolBar from 'src/components/ToolBar/tableFilter';
import TableViewEvent from 'src/components/tableView/TableViweEvent';

export default function EventListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const { setTitle } = useContext(TitleContext);

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
  setTitle('Events');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box mb={2} width="100%" textAlign="right">
        {/* <Typography variant="h4">Events</Typography> */}

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Event
        </Button>
      </Box>

      <TableFilterToolBar fromCall="event" />

      {fetchedData ? (
        <TableViewEvent columns={tableColumns} actionbtn={actionCol} tableData={rowData} />
      ) : null}
    </Container>
  );
}
