import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Dialog,
  MenuItem,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

export default function ContactInfoDialog({ open, handleClose, fData }) {
  const { register, handleSubmit } = useForm({});

  const activeStatusList = [
    {
      value: 'active',
      lable: 'active',
    },
    {
      value: 'in-active',
      lable: 'in-active',
    },
    {
      value: 'delete',
      lable: 'delete',
    },
  ];
  const rejectStatusList = [
    {
      value: 'reject',
      lable: 'reject',
    },
    {
      value: 'pending',
      lable: 'pending',
    },
    {
      value: 'delete',
      lable: 'delete',
    },
  ];
  const pendingStausList = [
    {
      value: 'pending',
      lable: 'pending',
    },
    {
      value: 'active',
      lable: 'active',
    },
    {
      value: 'reject',
      lable: 'reject',
    },
  ];

  const onSubmit = async () => {
    // console.log('hello');
  };

  //   console.log(fData);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit Info</DialogTitle>
        <DialogContent>
          <Box p={1}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              {...register('title')}
              defaultValue={fData?.title ? fData?.title : ''}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              {...register('description')}
              type="text"
              defaultValue={fData?.description ? fData.description : ''}
              fullWidth
              margin="dense"
            />
            <Box mt={1} mb={1}>
              <Typography>Status</Typography>
              {fData?.status === 'active' ? (
                <TextField select defaultValue="active">
                  {activeStatusList.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.lable}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}
              {fData?.status === 'pending' ? (
                <TextField select defaultValue="pending">
                  {pendingStausList.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.lable}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}
              {fData?.status === 'reject' ? (
                <TextField select defaultValue="reject">
                  {rejectStatusList.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.lable}
                    </MenuItem>
                  ))}
                </TextField>
              ) : null}
            </Box>
            <TextField
              label="City"
              name="city"
              variant="outlined"
              {...register('city')}
              defaultValue={fData?.address?.city ? fData.address.city : ''}
              margin="dense"
              sx={{ mr: 1 }}
            />
            <TextField
              label="State"
              name="state"
              variant="outlined"
              {...register('state')}
              defaultValue={fData?.address?.state ? fData.address.state : ''}
              margin="dense"
            />
            <TextField
              label="street"
              name="street"
              variant="outlined"
              {...register('street')}
              defaultValue={fData?.address?.city.street ? fData.address.city.street : ''}
              margin="dense"
              sx={{ mr: 1 }}
            />
            <TextField
              label="Area"
              margin="dense"
              name="area"
              variant="outlined"
              {...register('area')}
              defaultValue={fData?.address?.area ? fData.address.area : ''}
            />
            <TextField
              label="Pincode"
              margin="dense"
              name="pincode"
              variant="outlined"
              {...register('pincode')}
              defaultValue={fData?.address?.pincode ? fData.address.pincode : ''}
            />
            <TextField
              label="Full Address"
              name="fullAddress"
              variant="outlined"
              {...register('fullAddress')}
              defaultValue={fData?.address?.fullAddress ? fData.address.fullAddress : ''}
              fullWidth
              margin="dense"
            />

            <Box display="flex">
              <Box mr={1}>
                <Typography>Brand Logo</Typography>
                <TextField
                  name="brandLogo"
                  variant="outlined"
                  {...register('brandLogo')}
                  type="file"
                  fullWidth
                />
              </Box>
              <Box>
                <Typography>Cover Image</Typography>
                <TextField
                  name="coverImage"
                  variant="outlined"
                  {...register('coverImage')}
                  type="file"
                  fullWidth
                />
              </Box>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ContactInfoDialog.propTypes = {
  fData: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
