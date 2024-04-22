import { useContext } from 'react';

import { Container } from '@mui/material';

import { TitleContext } from 'src/context/mainContext';

import TableViewMaster from 'src/components/tableView/TableViewMaster';

export default function NotificationView() {
  const tableColumns = ['Vendor/Coustmer', 'Notifiction Time', 'Notifiction'];
  const { setTitle } = useContext(TitleContext);

  setTitle('Notification');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      {/* <Typography variant="h4" mb={5}>
        Notification
      </Typography> */}
      <TableViewMaster columns={tableColumns} />
    </Container>
  );
}
