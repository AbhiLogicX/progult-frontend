import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Grid, Button, TextField, Typography } from '@mui/material';

export default function ContactDetailform({ fData }) {
  const [editOption, setEditOption] = useState(false);
  const { register, handleSubmit } = useForm({});
  const handleSetEditOption = () => {
    setEditOption(true);
  };
  const handleSetEditOptionCancel = () => {
    setEditOption(false);
  };
  async function onSubmit(data) {
    setEditOption(false);
  }

  return (
    <Box sx={{ p: '1%', borderRadius: 0.75 }} border={editOption ? '1px solid darkgrey' : null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3} display="flex" sx={{ borderRadius: 0.75 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                {editOption ? (
                  <Typography sx={{ fontWeight: 600, mr: 1 }}>Titile :</Typography>
                ) : null}
                {editOption ? (
                  <TextField
                    name="title"
                    variant="outlined"
                    {...register('title')}
                    defaultValue={fData?.title ? fData?.title : ''}
                  />
                ) : (
                  <Typography variant="h3">{fData?.title ? fData?.title : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={2}>
                {editOption ? (
                  <Typography sx={{ fontWeight: 600, mr: 1 }}>Domain :</Typography>
                ) : (
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    Domain :
                  </Typography>
                )}
                {editOption ? (
                  <TextField
                    name="title"
                    variant="outlined"
                    {...register('title')}
                    defaultValue={fData?.domain[0]?.title ? fData.domain[0].title : ''}
                  />
                ) : (
                  <Typography variant="h6">
                    {fData?.domain[0]?.title ? fData.domain[0].title : ''}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="h5">Contact Details</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>City :</Typography>
                {editOption ? (
                  <TextField
                    name="city"
                    variant="outlined"
                    {...register('city')}
                    defaultValue={fData?.address?.city ? fData.address.city : ''}
                  />
                ) : (
                  <Typography>{fData?.address?.city ? fData.address.city : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>State :</Typography>
                {editOption ? (
                  <TextField
                    name="state"
                    variant="outlined"
                    {...register('state')}
                    defaultValue={fData?.address?.state ? fData.address.state : ''}
                  />
                ) : (
                  <Typography>{fData?.address?.state ? fData.address.state : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Street :</Typography>
                {editOption ? (
                  <TextField
                    name="street"
                    variant="outlined"
                    {...register('street')}
                    defaultValue={fData?.address?.city.street ? fData.address.city.street : ''}
                  />
                ) : (
                  <Typography>
                    {fData?.address?.city.street ? fData.address.city.street : ''}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Area :</Typography>
                {editOption ? (
                  <TextField
                    name="area"
                    variant="outlined"
                    {...register('area')}
                    defaultValue={fData?.address?.area ? fData.address.area : ''}
                  />
                ) : (
                  <Typography>{fData?.address?.area ? fData.address.area : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Pincode :</Typography>
                {editOption ? (
                  <TextField
                    name="pincode"
                    variant="outlined"
                    {...register('pincode')}
                    defaultValue={fData?.address?.pincode ? fData.address.pincode : ''}
                  />
                ) : (
                  <Typography>{fData?.address?.pincode ? fData.address.pincode : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Full Address :</Typography>
                {editOption ? (
                  <TextField
                    name="fullAddress"
                    variant="outlined"
                    {...register('fullAddress')}
                    defaultValue={fData?.address?.fullAddress ? fData.address.fullAddress : ''}
                    sx={{ width: 800 }}
                  />
                ) : (
                  <Typography>
                    {fData?.address?.fullAddress ? fData.address.fullAddress : ''}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Bussiness Logo :</Typography>
                {editOption ? (
                  <TextField
                    name="brandLogo"
                    variant="outlined"
                    {...register('brandLogo')}
                    type="file"
                  />
                ) : (
                  <Typography>{fData?.brandLogo ? fData?.brandLogo : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Cover Image :</Typography>
                {editOption ? (
                  <TextField
                    name="coverImage"
                    variant="outlined"
                    {...register('coverImage')}
                    type="file"
                  />
                ) : (
                  <Typography>{fData?.coverImage ? fData.coverImage : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Description :</Typography>
                {editOption ? (
                  <TextField
                    name="description"
                    variant="outlined"
                    {...register('description')}
                    type="text"
                    defaultValue={fData?.description ? fData.description : ''}
                  />
                ) : (
                  <Typography>{fData?.description ? fData.description : ''}</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="right">
          {editOption ? (
            <Button color="error" onClick={handleSetEditOptionCancel} sx={{ mr: 1 }}>
              Cancel
            </Button>
          ) : (
            <Button onClick={handleSetEditOption} sx={{ mr: 1 }}>
              Edit
            </Button>
          )}
          {editOption ? (
            <Button variant="contained" type="submit">
              Save
            </Button>
          ) : (
            <Button variant="contained" disabled>
              Save
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}

ContactDetailform.propTypes = {
  fData: PropTypes.object,
};
