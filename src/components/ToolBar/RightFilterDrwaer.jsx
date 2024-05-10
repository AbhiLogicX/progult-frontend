/* eslint-disable */
import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { MenuItem, TextField, Typography } from '@mui/material';

import { error } from 'src/theme/palette';
import { useForm } from 'react-hook-form';
import { getReq } from 'src/api/api';

export default function FilterDrawer({ open, handleClose, fromCall, filterData, handleReload }) {
  const { register, handleSubmit } = useForm();
  const [fetchedData, setFetchedData] = React.useState();
  const [formData, setFormData] = React.useState({
    activiyList: [],
    bussinessList: [],
    vendorsList: [],
    categoryList: [],
  });

  React.useEffect(() => {
    if (!fetchedData) {
      fetchFormData();
    }
    async function fetchFormData() {
      await getReq(`bussiness/list`).then((res) => {
        if (res.statusCode === 200) {
          formData.bussinessList = res.data;
        }
      });
      await getReq(`domain/category`).then((res) => {
        if (res.statusCode === 200) {
          formData.categoryList = res.data;
        }
      });
      await getReq(`vendor/list`).then((res) => {
        if (res.statusCode === 200) {
          formData.vendorsList = res.data;
        }
      });
      await getReq(`domain/activity`).then((res) => {
        if (res.statusCode === 200) {
          formData.activiyList = res.data;
        }
      });
    }
  });
  // console.log(formData);

  const onSubmit = (data) => {
    // console.log(data);
    filterData.domain = data.domain ? data.domain : '';
    filterData.vendorId = data.vendorId ? data.vendorId : '';
    filterData.city = data.city ? data.city : '';
    filterData.state = data.state ? data.state : '';
    filterData.activityId = data.activityId ? data.activityId : '';
    filterData.bussinessId = data.bussinessId ? data.bussinessId : '';
    filterData.hostName = data.host ? data.host : '';
    handleReload(false);
    // console.log(filterData);
  };

  const DrawerList = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ width: 350, p: 1 }} role="presentation">
        <Typography variant="h4"> Filters</Typography>
        <TextField label="City" fullWidth sx={{ mb: 1, mt: 1 }} {...register('city')} />
        <TextField label="State" fullWidth sx={{ mb: 1 }} {...register('state')} />
        {fromCall !== 'customer' ? (
          <TextField
            select
            label="Select Activity..."
            fullWidth
            sx={{ mb: 1 }}
            {...register('activityId')}
          >
            {formData.activiyList.map((opt) => (
              <MenuItem key={opt._id} value={opt._id}>
                {opt.title}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
        {fromCall === 'bussiness' || fromCall === 'bookings' || fromCall === 'reports' ? (
          <>
            <TextField
              select
              label="Select Category..."
              fullWidth
              sx={{ mb: 1 }}
              {...register('domain')}
            >
              {formData.categoryList.map((opt) => (
                <MenuItem key={opt._id} value={opt._id}>
                  {opt.title}
                </MenuItem>
              ))}
            </TextField>
            {fromCall === 'bussiness' ? (
              <TextField
                select
                label="Select Vendor..."
                fullWidth
                sx={{ mb: 1 }}
                {...register('vendorId')}
              >
                {formData.vendorsList.map((opt) => (
                  <MenuItem key={opt._id} value={opt._id}>
                    {opt.fullName}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField
                select
                label="Select Bussiness..."
                fullWidth
                sx={{ mb: 1 }}
                {...register('bussinessId')}
              >
                {formData.bussinessList.map((opt) => (
                  <MenuItem key={opt._id} value={opt._id}>
                    {opt.title}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </>
        ) : null}

        {fromCall === 'reports' ? (
          <TextField
            select
            label="Select Vendor..."
            fullWidth
            sx={{ mb: 1 }}
            {...register('vendorId')}
          >
            {formData.vendorsList.map((opt) => (
              <MenuItem key={opt._id} value={opt._id}>
                {opt.fullName}
              </MenuItem>
            ))}
          </TextField>
        ) : null}

        {fromCall === 'event' ? (
          <TextField
            select
            label="Select Bussiness..."
            fullWidth
            sx={{ mb: 1 }}
            {...register('bussinessId')}
          >
            {formData.bussinessList.map((opt) => (
              <MenuItem key={opt._id} value={opt._id}>
                {opt.title}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
        {fromCall === 'event' ? (
          <TextField label="Host" fullWidth sx={{ mb: 1 }} {...register('host')} />
        ) : null}
        <Box textAlign="right">
          <Button
            onClick={handleClose}
            sx={{
              mr: 1,
              color: error.main,
              backgroundColor: error.errorBackground,
              '&:hover': {
                backgroundColor: error.main,
                color: error.errorBackground,
              },
            }}
          >
            Close
          </Button>
          <Button type="submit" variant="contained">
            Filter
          </Button>
        </Box>
      </Box>
    </form>
  );

  return (
    <Box component="div">
      <SwipeableDrawer open={open} onClose={handleClose} anchor="right">
        {DrawerList}
      </SwipeableDrawer>
    </Box>
  );
}

FilterDrawer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  fromCall: PropTypes.string,
  filterData: PropTypes.object,
  // setFilterData: PropTypes.func,
  handleReload: PropTypes.func,
};
