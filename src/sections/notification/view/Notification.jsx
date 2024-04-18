import { Container, Typography } from '@mui/material';

import TableViewMaster from 'src/components/tableView/TableViewMaster';

export default function NotificationView() {
  const tableColumns = ['Vendor/Coustmer', 'Notifiction Time', 'Notifiction'];
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Typography variant="h4" mb={5}>
        Notification
      </Typography>
      <TableViewMaster columns={tableColumns} />
    </Container>
  );
}
