import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getReq, postReq } from 'src/api/api';

import Iconify from 'src/components/iconify/iconify';
import AddMasterDialog from 'src/components/dialogueForm/DialogueForm';
import TableViewMaster from 'src/components/tableView/TableViewMaster';

export default function AminiteListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!fetchedData) {
      fetchRowData();
    }
  }, [fetchedData]);

  async function fetchRowData() {
    const result = await getReq('domain/aminities');
    setRowData(result.data);
    setFetchedData(true);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (titleName, selectedFile, descriptionTopic) => {
    const formData = new FormData();
    formData.append('title', titleName);
    formData.append('description', descriptionTopic);
    formData.append('image', selectedFile);
    const result = await postReq('domain/aminities', formData);
    if (result.statusCode === 200) {
      handleClose();
      setFetchedData(false);
    }
  };

  const tableColumns = ['Image', 'Title', 'Status'];
  const actionCol = ['Edit', 'Delete'];

  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} width="100%">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Aminities
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleClickOpen}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          Add Aminities
        </Button>
        <AddMasterDialog
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          domainCall="domain/aminities"
          handleReload={setFetchedData}
        />
      </Stack>

      {fetchedData ? (
        <TableViewMaster
          columns={tableColumns}
          actionbtn={actionCol}
          tableData={rowData}
          fromCall="domain/aminities"
          handleReload={setFetchedData}
        />
      ) : null}
    </Container>
  );
}
//-----------------------------------------------------------------------------------------------------
