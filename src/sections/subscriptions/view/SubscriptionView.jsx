import { useContext } from 'react';

import { Container } from '@mui/material';

import { TitleContext } from 'src/context/mainContext';

import TableView from 'src/components/tableView/TableView';

export default function SubscriptionView() {
  const tableColumns = ['Vendor', 'Plan', 'Duration', 'Amount'];
  const { setTitle } = useContext(TitleContext);

  setTitle('Subscriptions');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <TableView columns={tableColumns} tableData={null} />
    </Container>
  );
}

// whom, when, what
