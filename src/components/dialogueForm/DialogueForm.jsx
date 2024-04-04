import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function FormDialogue({ open, handleClose, handleSubmit }) {
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

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            handleSubmit(title, selectedFile, description);
          },
        }}
      >
        <DialogTitle>Edit</DialogTitle>
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
            required
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

          <Box>
            <Typography>Upload Image</Typography>
            <TextField type="file" accept="image/*" onChange={handleFileChange} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

FormDialogue.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};
