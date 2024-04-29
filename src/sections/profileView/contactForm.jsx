// import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  NativeSelect,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { patchReq } from 'src/api/api';
import { error } from 'src/theme/palette';

export default function ContatactDetails({ profileData, handleReload, handleClose, open }) {
  const { register, handleSubmit } = useForm({});

  const location = useLocation().pathname.split('/');

  async function onSubmit(data) {
    data.fullName = profileData.data.fullName;
    data.Id = profileData.data._id;

    if (location[1] === 'vendors') {
      if (data.status) {
        const statusData = {
          status: data.status,
          Id: data.Id,
        };
        await patchReq('vendor/update-status', statusData);
      }
      await patchReq('vendor/detail', data).then((res) => {
        if (res.statusCode === 200) {
          handleClose();
          handleReload(false);
        }
      });
    }
    if (location[1] === 'customers') {
      if (data.status) {
        const statusData = {
          status: data.status,
          Id: data.Id,
        };
        await patchReq('user/update-status  ', statusData);
      }
      await patchReq('user/detail', data).then((res) => {
        if (res.statusCode === 200) {
          handleClose();
          handleReload(false);
        }
      });
    }
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle>Edit Contact Details</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Typography sx={{ fontWeight: 600 }}>Email :</Typography>
          <TextField
            name="email"
            variant="outlined"
            {...register('email')}
            required
            defaultValue={profileData.data.email}
            fullWidth
          />

          <Typography sx={{ fontWeight: 600, mt: 2 }}>Mobile :</Typography>
          <TextField
            name="mobile"
            variant="outlined"
            {...register('mobile')}
            required
            defaultValue={profileData.data.mobile}
            fullWidth
          />

          <Box display="flex" alignItems="center" mt={2}>
            <Typography sx={{ fontWeight: 600 }}>Gender :</Typography>
            <NativeSelect defaultValue={profileData.data.gender} {...register('gender')}>
              <option value="male">male</option>
              <option value="female">female</option>
            </NativeSelect>
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <Typography sx={{ fontWeight: 600, mr: 1 }}>Status :</Typography>
            <NativeSelect defaultValue={profileData.data.status} {...register('status')}>
              <option value="active">active</option>
              <option value="in-active">in-active</option>
            </NativeSelect>
          </Box>

          <Box display="flex" mt={2} justifyContent="space-between">
            <Box>
              <Typography sx={{ fontWeight: 600 }}>City :</Typography>
              <TextField
                name="city"
                variant="outlined"
                {...register('city')}
                defaultValue={profileData.data?.address?.city ? profileData.data.address.city : ''}
                fullWidth
              />
            </Box>
            <Box>
              <Typography sx={{ fontWeight: 600 }}>State :</Typography>
              <TextField
                name="state"
                variant="outlined"
                {...register('state')}
                defaultValue={
                  profileData.data?.address?.state ? profileData.data.address.state : ''
                }
                fullWidth
              />
            </Box>
          </Box>

          <Typography sx={{ fontWeight: 600, mt: 2 }}>Street :</Typography>
          <TextField
            name="street"
            variant="outlined"
            {...register('street')}
            defaultValue={profileData.data?.address?.street ? profileData.data.address.street : ''}
            fullWidth
          />

          <Typography sx={{ fontWeight: 600, mt: 2 }}>Area :</Typography>

          <TextField
            name="area"
            variant="outlined"
            {...register('area')}
            defaultValue={profileData.data?.address?.area ? profileData.data.address.area : ''}
            fullWidth
          />

          <Typography sx={{ fontWeight: 600, mt: 2 }}>Pincode :</Typography>
          <TextField
            name="pincode"
            variant="outlined"
            {...register('pincode')}
            defaultValue={
              profileData.data?.address?.pincode ? profileData.data.address.pincode : ''
            }
          />
        </DialogContent>
        <DialogActions>
          <Button type="submit" onClick={handleClose} sx={{ color: error.main }}>
            Cancle
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ContatactDetails.propTypes = {
  profileData: PropTypes.object,
  handleReload: PropTypes.func,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
