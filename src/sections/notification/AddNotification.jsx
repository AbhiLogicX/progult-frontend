import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, TextField, Typography } from '@mui/material';

export default function AddNotificationForm({ open, handleClose }) {
  const [checkTo, setCheckTo] = useState('vendor');
  const { register, handleSubmit } = useForm();
  const onSubmit = () => {
    // console.log('hello');
  };

  const items = JSON.parse(localStorage.getItem('items'));
  // console.log(items);
  const handleRadioBtn = (e) => {
    const { value } = e.target;
    // console.log(value);
    setCheckTo(value);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Use Google s location service?</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box display="flex" flexDirection="column">
            <TextField label="Title" {...register('description')} margin="dense" />
            <TextField label="Description" {...register('description')} margin="dense" />
            <TextField
              label="From"
              {...register('from')}
              margin="dense"
              defaultValue={items._id}
              disabled
            />
            <Box display="flex">
              <Box display="flex" mr={1} mt={1}>
                <input
                  type="radio"
                  name="whom"
                  value="vendor"
                  onChange={handleRadioBtn}
                  defaultChecked
                />
                <Typography>Vendor</Typography>
              </Box>
              <Box display="flex" mt={1}>
                <input type="radio" name="whom" value="customer" onChange={handleRadioBtn} />
                <Typography>Customer</Typography>
              </Box>
            </Box>
            <TextField label={checkTo} {...register('to')} margin="dense" />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" autoFocus>
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AddNotificationForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
