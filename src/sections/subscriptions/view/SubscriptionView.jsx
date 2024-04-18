import { Container, Typography } from '@mui/material';

import TableView from 'src/components/tableView/TableView';

export default function SubscriptionView() {
  const tableColumns = ['Vendor', 'Plan', 'Duration', 'Amount'];
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Typography variant="h4">Subscriptions</Typography>

      <TableView columns={tableColumns} tableData={null} />
    </Container>
  );
}

// whom, when, what
