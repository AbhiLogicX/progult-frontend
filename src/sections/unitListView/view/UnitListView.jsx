import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getReq, postReq } from 'src/api/api';

import Iconify from 'src/components/iconify/iconify';
import AddMasterDialog from 'src/components/dialogueForm/DialogueForm';
import TableViewMaster from 'src/components/tableView/TableViewMaster';

export default function UnitListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!fetchedData) {
      fetchRowData();
    }
  }, [fetchedData]);

  async function fetchRowData() {
    const result = await getReq('master/unit');
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
    const result = await postReq('master/unit', formData); // we have to handle the success and error
    if (result.statusCode === 200) {
      handleClose();
      setFetchedData(false);
    }
  };

  const tableColumns = ['Title', 'Status'];
  const actionCol = ['Edit', 'Delete'];

  return (
    <Container sx={{ mx: '1%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} width={1400}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Unit
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleClickOpen}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Unit
        </Button>
        <AddMasterDialog
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          domainCall="master/unit"
          handleReload={setFetchedData}
        />
      </Stack>

      {fetchedData ? (
        <TableViewMaster
          columns={tableColumns}
          actionbtn={actionCol}
          tableData={rowData}
          fromCall="master/unit"
          handleReload={setFetchedData}
        />
      ) : null}
    </Container>
  );
}
//-----------------------------------------------------------------------------------------------------
