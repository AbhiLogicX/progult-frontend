import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { getReq, postReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import Iconify from 'src/components/iconify/iconify';
import AddMasterDialog from 'src/components/dialogueForm/DialogueForm';
import TableViewMaster from 'src/components/tableView/TableViewMaster';

export default function UnitListView() {
  const [rowData, setRowData] = useState([]);
  const [fetchedData, setFetchedData] = useState(false);
  const [open, setOpen] = useState(false);
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    if (!fetchedData) {
      fetchData();
    }
    async function fetchData() {
      const result = await getReq('master/unit');
      // const resultBanner = await getReq('master/');
      // console.log('this is n=banner', resultBanner);
      setRowData(result.data);
      setFetchedData(true);
    }
  });

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
  setTitle('Unit');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box mb={2} width="100%" textAlign="right">
        {/* <Typography variant="h4" sx={{ mb: 5 }}>
          Unit
        </Typography> */}
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
      </Box>

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
