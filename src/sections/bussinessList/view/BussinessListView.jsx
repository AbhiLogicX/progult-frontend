import { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import TableViewBussiness from 'src/components/tableView/TableViewBussiness';
import Iconify from 'src/components/iconify';
import { getReq } from 'src/api/api';

export default function BussinessListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    async function fetchRowData() {
      const result = await getReq('bussiness');
      setRowData(result);
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
    'Mobile',
    'Status',
    'Rating/ReviewCount',
  ];
  const actionCol = ['View & Edit', 'Delete'];
  return (
    <>
      <Container sx={{ mx: '5%' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Bussiness List</Typography>

          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Bussinesss
          </Button>
        </Stack>

        {fetchedData ? (
          <TableViewBussiness columns={tableColumns} actionbtn={actionCol} tableData={rowData} />
        ) : null}
      </Container>
    </>
  );
}
