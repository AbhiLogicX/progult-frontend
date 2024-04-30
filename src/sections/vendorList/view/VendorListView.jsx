import { useState, useEffect, useContext } from 'react';

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import Iconify from 'src/components/iconify';
import TableView from 'src/components/tableView';
import TableFilterToolBar from 'src/components/ToolBar/tableFilter';

export default function VendorListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const { setTitle } = useContext(TitleContext);

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
  const actionCol = ['View', 'Delete'];
  setTitle('Associate Partners');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box mb={5} textAlign="right">
        {/* <Typography variant="h4">Associate Partners</Typography> */}

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Vendor
        </Button>
      </Box>

      <TableFilterToolBar fromCall="vendor" />

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
