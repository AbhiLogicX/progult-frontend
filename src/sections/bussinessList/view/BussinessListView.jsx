import { useState, useEffect, useContext } from 'react';

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import TableViewBussiness from 'src/components/tableView/TableViewBussiness';

export default function BussinessListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    async function fetchRowData() {
      const result = await getReq('bussiness');
      setRowData(result.data);
      setFetchedData(true);
      setLoading(false);
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
    'Ratings',
  ];
  const actionCol = ['View', 'Delete'];
  setTitle('Bussinesses');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      {/* <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
        sx={{ mb: 5 }}
      >
        <Typography variant="h4">Bussinesses</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Bussinesss
        </Button>
      </Stack> */}

      {fetchedData ? (
        <TableViewBussiness columns={tableColumns} actionbtn={actionCol} tableData={rowData} />
      ) : (
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
}
