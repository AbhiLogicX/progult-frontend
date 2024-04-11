import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getReq } from 'src/api/api';

import Iconify from 'src/components/iconify';
import TableViewBussiness from 'src/components/tableView/TableViewBussiness';

export default function BussinessListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    async function fetchRowData() {
      const result = await getReq('bussiness');
      setRowData(result.data);
      console.log('bussiness', result);
      setFetchedData(true);
    }
    fetchRowData();
  }, []);
  const tableColumns = [
    'Image',
    'Titie',
    'Categoery',
    'City / State',
    'Owner Name',
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
        <Typography variant="h4">Bussiness List</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Bussinesss
        </Button>
      </Stack>

      {fetchedData ? (
        <TableViewBussiness columns={tableColumns} actionbtn={actionCol} tableData={rowData} />
      ) : null}
    </Container>
  );
}
