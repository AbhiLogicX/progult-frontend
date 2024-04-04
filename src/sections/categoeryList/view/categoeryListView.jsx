import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import TableViewMaster from 'src/components/tableView/TableViewMaster';
import { getReq } from 'src/api/api';

export default function CategoeryListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    async function fetchRowData() {
      const result = await getReq('domain/category');
      setRowData(result);
      setFetchedData(true);
    }
    fetchRowData();
  }, []);

  const tableColumns = ['Title', 'Status'];
  const actionCol = ['Edit', 'Delete'];

  return (
    <Container sx={{ mx: '8%' }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Categoeries
      </Typography>
      {fetchedData ? (
        <TableViewMaster columns={tableColumns} actionbtn={actionCol} tableData={rowData} />
      ) : null}
    </Container>
  );
}
