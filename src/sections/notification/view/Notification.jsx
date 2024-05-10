import { useState, useEffect, useContext } from 'react';

import { Box, Button, Container } from '@mui/material';

// import TableViewMaster from 'src/components/tableView/TableViewMaster';
import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import Iconify from 'src/components/iconify';
import NotificationTable from 'src/components/tableView/TableNotification';

import AddNotificationForm from '../AddNotification';

export default function NotificationView() {
  const [fetchedData, setFetchedData] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [notificationData, setNotificationData] = useState();
  const tableColumns = ['From', 'To', 'Notifiction'];
  const { setTitle } = useContext(TitleContext);

  const handleOpenAddForm = () => {
    setOpenAddForm(true);
  };

  const handleCloseAddForm = () => {
    setOpenAddForm(false);
  };

  useEffect(() => {
    if (!fetchedData) {
      fetchedNotificationData();
    }
    async function fetchedNotificationData() {
      await getReq(`master/notification`).then((res) => {
        if (res.statusCode) {
          setNotificationData(res.data);
          setFetchedData(true);
        }
      });
    }
  });

  setTitle('Notification');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      {/* <Typography variant="h4" mb={5}>
        Notification
      </Typography> */}
      <Box mb={1} textAlign="right">
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpenAddForm}
        >
          Add Notification
        </Button>
        <AddNotificationForm open={openAddForm} handleClose={handleCloseAddForm} />
      </Box>
      <NotificationTable tableCol={tableColumns} tableData={notificationData} />
    </Container>
  );
}
