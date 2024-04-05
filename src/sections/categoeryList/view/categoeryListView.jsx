import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import TableViewMaster from 'src/components/tableView/TableViewMaster';
import Iconify from 'src/components/iconify/iconify';
import { getReq, postReq } from 'src/api/api';
import FormDialogue from 'src/components/dialogueForm/DialogueForm';

export default function CategoeryListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchRowData() {
      const result = await getReq('domain/category');
      setRowData(result);
      setFetchedData(true);
    }
    fetchRowData();
  }, []);

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
    const result = await postReq('domain/category', formData); // we have to handle the success and error
    handleClose();
    window.location.reload();
  };

  const tableColumns = ['Image', 'Title', 'Status'];
  const actionCol = ['Edit', 'Delete'];

  return (
    <Container sx={{ mx: '1%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} width={1400}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Categoeries
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleClickOpen}
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New Categoery
        </Button>
        <FormDialogue
          open={open}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          fromCall="Add"
        />
      </Stack>

      {fetchedData ? (
        <TableViewMaster
          columns={tableColumns}
          actionbtn={actionCol}
          tableData={rowData}
          fromCall="category"
        />
      ) : null}
    </Container>
  );
}
//-----------------------------------------------------------------------------------------------------
