import { useState } from 'react';

import PropTypes from 'prop-types';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Image } from '@mui/icons-material';

import { patchReq } from 'src/api/api';
import FormDialogue from '../dialogueForm/DialogueForm';

export default function TableViewMaster({ columns, actionbtn, tableData, fromCall }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (titleName, selectedFile, description, idEdit) => {
    console.log('Edit btn', titleName, selectedFile, description);
    const formData = new FormData();
    formData.append('title', titleName);
    formData.append('description', description);
    formData.append('image', selectedFile);
    formData.append('domainId', idEdit);
    const result = await patchReq(`domain/${fromCall}`, formData); // we have to handle the success and error
    console.log('this is the edit res', result);
    handleClose();
    // window.location.reload();
  };

  async function handleDeleteClick(id) {
    const result = await patchReq(`domain/${fromCall}/detail?Id=${id}&status=delete`);
    // window.location.reload();
  }

  async function statusButtonHandler(id, status) {
    console.log('status patch working');
    if (status === 'active') {
      const result = await patchReq(`domain/${fromCall}/detail?Id=${id}&status=in-active`);
      console.log('Patch call', result);
    }
    const result = await patchReq(`domain/${fromCall}/detail?Id=${id}&status=in-active`);
    console.log('Patch call', result);
    // window.location.reload();
  }

  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }
  // const BASE_IMG_URL = 'https://proglut.onrender.com/';
  console.log('data table view', tableData);

  return (
    <TableContainer component={Box} sx={{ mx: 0, width: 1400 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((colItem) => (
              <TableCell>{colItem}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {actionbtn
            ? tableData.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box>
                      <Image src="/assets/images/images(1).png" alt="Image is rendering" />
                    </Box>
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>
                    {row.status === 'in-active' ? (
                      <Button
                        variant="outlined"
                        color="error"
                        onclick={() => statusButtonHandler(row._id, row.status)}
                      >
                        {row.status}
                      </Button>
                    ) : (
                      <Button
                        variant="outlined"
                        color="success"
                        onclick={() => statusButtonHandler(row._id, row.status)}
                      >
                        {row.status}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell>
                    {actionbtn.map((btnItm) => {
                      if (btnItm === 'Delete') {
                        return (
                          <Button
                            variant="contained"
                            sx={{ mr: 2 }}
                            color="error"
                            onClick={() => handleDeleteClick(row._id)}
                          >
                            {btnItm}
                          </Button>
                        );
                      }
                      return (
                        <>
                          <Button variant="contained" sx={{ mr: 2 }} onClick={handleClickOpen}>
                            {btnItm}
                          </Button>
                          <FormDialogue
                            open={open}
                            handleClose={handleClose}
                            handleSubmit={handleSubmit}
                            fromCall={`Edit ${fromCall}`}
                            idEdit={row._id}
                          />
                        </>
                      );
                    })}
                  </TableCell>
                </TableRow>
              ))
            : tableData.map((row) => (
                <TableRow
                  key={row.title}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

TableViewMaster.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
  fromCall: PropTypes.string,
};
