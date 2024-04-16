import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Alert, TextField, Typography } from '@mui/material';

import { patchReq } from 'src/api/api';

export default function EditDialogForm({ domainCall, mtitle, mdescription, mId, handleReload }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [alert, setAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setdescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (domainCall === 'master/unit') {
      const dataToUpdate = {
        title,
        Id: mId,
        description,
      };
      const result = await patchReq(`${domainCall}`, dataToUpdate); // we have to handle the success and error
      if (result.statusCode === 200) {
        setAlert(true);
        setTimeout(() => {
          handleReload(false);
          setOpen(false);
        }, 3000);
      }
    }
    const formData = new FormData();
    if (title === '') {
      formData.append('title', mtitle);
    } else {
      formData.append('title', title);
    }
    formData.append('description', description);
    formData.append('image', selectedFile);
    formData.append('domainId', mId);
    const result = await patchReq(`${domainCall}`, formData); // we have to handle the success and error
    if (result.statusCode === 200) {
      setAlert(true);
      setTimeout(() => {
        handleReload(false);
        setOpen(false);
      }, 3000);
    }
  };

  const splitFromCall = domainCall.split('/');
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {alert ? (
          <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="success">
            {`${splitFromCall[1]} updated success fully`}
          </Alert>
        ) : null}
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            sx={{ mb: 2 }}
            defaultValue={mtitle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleDescriptionChange}
            defaultValue={mdescription}
            sx={{ mb: 2 }}
          />
          {splitFromCall[1] === 'unit' ? null : (
            <Box>
              <Typography>Upload Image</Typography>
              <TextField type="file" accept="image/*" onChange={handleFileChange} />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} autoFocus>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

EditDialogForm.propTypes = {
  domainCall: PropTypes.string,
  mtitle: PropTypes.string,
  mdescription: PropTypes.string,
  mId: PropTypes.string,
  handleReload: PropTypes.func,
};
