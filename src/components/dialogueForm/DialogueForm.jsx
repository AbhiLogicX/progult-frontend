import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, TextField, Typography } from '@mui/material';

import { postReq } from 'src/api/api';

export default function AddMasterDialog({ open, domainCall, handleClose, handleReload }) {
  const [title, setTitle] = useState('');
  const [description, setdescription] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

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
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', selectedFile);
    const result = await postReq(`${domainCall}`, formData);
    if (result.statusCode === 200) {
      handleClose();
      handleReload(false);
    }
  };

  const splitFromCall = domainCall.split('/');

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Add</DialogTitle>
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
  );
}

AddMasterDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.string,
  handleReload: PropTypes.func,
  domainCall: PropTypes.string,
};
