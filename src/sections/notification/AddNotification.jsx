import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, MenuItem, TextField, Typography } from '@mui/material';

import { getReq, postReq } from 'src/api/api';

export default function AddNotificationForm({ open, handleClose, handleReload }) {
  const [fetchedData, setFetchedData] = useState(false);
  const [checkTo, setCheckTo] = useState('vendor');
  const { register, handleSubmit } = useForm();
  const [vendorList, setVendorList] = useState();
  const [userList, setUserList] = useState();

  React.useEffect(() => {
    const fetches = {
      ven: false,
      user: false,
    };

    if (!fetchedData) {
      fetchLits();
    }
    async function fetchLits() {
      await getReq(`vendor/list`).then((res) => {
        if (res.statusCode === 200) {
          setVendorList(res.data);
          fetches.ven = true;
        }
      });
      await getReq(`user/list`).then((res) => {
        if (res.statusCode === 200) {
          setUserList(res.data);
          fetches.user = true;
        }
      });
      if (fetches.user === true && fetches.ven === true) {
        setFetchedData(true);
      }
    }
  }, [fetchedData]);

  const onSubmit = async (data) => {
    data.from = items._id;
    // console.log('hello', data);
    await postReq(`master/notification`, data).then((res) => {
      if (res.statusCode === 200) {
        handleClose();
        handleReload(false);
      }
    });
  };

  const items = JSON.parse(localStorage.getItem('items'));
  // console.log(items);
  const handleRadioBtn = (e) => {
    const { value } = e.target;
    // console.log(value);
    setCheckTo(value);
  };
  // console.log(vendorList, userList);
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
            <TextField label="Title" {...register('title')} margin="dense" />
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
            <TextField label={`Select ${checkTo}`} select margin="dense" {...register('to')}>
              {checkTo === 'vendor'
                ? vendorList?.map((itm) => <MenuItem value={itm._id}>{itm.fullName}</MenuItem>)
                : userList?.map((itm) => <MenuItem value={itm._id}>{itm.fullName}</MenuItem>)}
            </TextField>
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
  handleReload: PropTypes.func,
};
