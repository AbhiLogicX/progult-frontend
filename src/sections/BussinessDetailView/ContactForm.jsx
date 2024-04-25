import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Grid, Button, TextField, Typography } from '@mui/material';

import { patchReq } from 'src/api/api';
import properties from 'src/config/properties';

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
    const updateBussiness = {};
    const updateBussinessLogo = {};
    if (data?.coverImage[0] !== undefined || data?.brandLogo[0] !== undefined || data.description) {
      updateBussinessLogo.coverImage = data.coverImage[0].name;
      updateBussinessLogo.brandLogo = data.brandLogo[0].name;
      updateBussinessLogo.description = data.description;
      updateBussinessLogo.Id = fData._id;
      await patchReq(`bussiness/logo`, updateBussinessLogo).then((res) => {
        // console.log(res);
      });
    }
    if (
      data.title ||
      data.city ||
      data.state ||
      data.street ||
      data.area ||
      data.pincode ||
      data.fullAddress ||
      data.category
    ) {
      updateBussiness.title = data.title;
      updateBussiness.city = data.city;
      updateBussiness.state = data.state;
      updateBussiness.street = data.street;
      updateBussiness.area = data.area;
      updateBussiness.pincode = data.pincode;
      updateBussiness.fullAddress = data.fullAddress;
      updateBussiness.category = data.category;
      await patchReq(`bussiness`, updateBussiness).then((res) => {
        if (res.statusCode === 200) {
          // console.log(res);
        }
      });
    }

    // console.log(data);
    setEditOption(false);
  }

  return (
    <Box sx={{ p: '2%', borderRadius: 0.75 }} border={editOption ? '1px solid darkgrey' : null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3} display="flex" sx={{ borderRadius: 0.75 }}>
          <Grid container spacing={2} alignItems="flex-end" mt="-125px">
            <Grid xs={2}>
              <Box
                elevation={4}
                sx={{
                  borderRadius: '50%',
                  width: '100%',
                  aspectRatio: 1 / 1,
                }}
              >
                <img
                  src={`${properties.BASE_BUSSINESS_IMAGE_URL}${fData.brandLogo}`}
                  alt="Bussiness Brond Cover "
                  style={{
                    width: '100%',
                    aspectRatio: 1 / 1,
                    borderRadius: '50%',
                    border: '10px solid white',
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={7} mb="20px">
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
                  <Typography variant="h2">{fData?.title ? fData?.title : ''}</Typography>
                )}
              </Box>
              <Box display="flex" alignItems="center">
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
              <Box display="flex" alignItems="center">
                {editOption ? (
                  <>
                    <Typography sx={{ fontWeight: 600, mr: 1 }}>Bussiness Logo :</Typography>
                    <TextField
                      name="brandLogo"
                      variant="outlined"
                      {...register('brandLogo')}
                      type="file"
                    />
                  </>
                ) : null}
              </Box>

              <Box display="flex" alignItems="center">
                {editOption ? (
                  <>
                    <Typography sx={{ fontWeight: 600, mr: 1 }}>Cover Image :</Typography>
                    <TextField
                      name="coverImage"
                      variant="outlined"
                      {...register('coverImage')}
                      type="file"
                    />
                  </>
                ) : null}
              </Box>
            </Grid>

            <Grid xs={3}>
              <Box textAlign="right">
                {editOption ? (
                  <Button color="error" onClick={handleSetEditOptionCancel} sx={{ mr: 1 }}>
                    Cancel
                  </Button>
                ) : (
                  <Button onClick={handleSetEditOption} size="large" variant="contained">
                    Edit
                  </Button>
                )}
                {editOption ? (
                  <Button variant="contained" type="submit">
                    Save
                  </Button>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={5}>
              <Box p={3} sx={{ backgroundColor: 'whitesmoke' }}>
                <Typography variant="h5">Owner Details</Typography>
                <Box>
                  <Box alignItems="cneter">
                    <Typography>{fData.owner[0].fullName}</Typography>
                    <Typography>+91-1234512345</Typography>
                  </Box>

                  <Box display="flex" alignItems="cneter">
                    <Typography mr={1}>Status:</Typography>
                    <Typography>{fData.owner[0].status}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={7}>
              <Box p={3} sx={{ backgroundColor: 'whitesmoke' }}>
                <Box>
                  <Typography variant="h5">Contact Details</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  {editOption ? (
                    <>
                      <Typography sx={{ fontWeight: 600, mr: 1 }}>Full Address :</Typography>
                      <TextField
                        name="fullAddress"
                        variant="outlined"
                        {...register('fullAddress')}
                        defaultValue={fData?.address?.fullAddress ? fData.address.fullAddress : ''}
                        sx={{ width: 800 }}
                      />
                    </>
                  ) : (
                    <Typography>
                      {fData?.address?.fullAddress ? fData.address.fullAddress : ''}
                    </Typography>
                  )}
                </Box>
                <Box>
                  {editOption ? null : (
                    <Typography>{`${fData?.address?.street}/${fData?.address?.area}/${fData?.address?.state}/${fData?.address?.city}/`}</Typography>
                  )}
                </Box>
                <Box display="flex" alignItems="center">
                  {editOption ? (
                    <>
                      <Typography sx={{ fontWeight: 600, mr: 1 }}>City :</Typography>
                      <TextField
                        name="city"
                        variant="outlined"
                        {...register('city')}
                        defaultValue={fData?.address?.city ? fData.address.city : ''}
                      />
                    </>
                  ) : null}
                </Box>

                <Box display="flex" alignItems="center">
                  {editOption ? (
                    <>
                      <Typography sx={{ fontWeight: 600, mr: 1 }}>State :</Typography>
                      <TextField
                        name="state"
                        variant="outlined"
                        {...register('state')}
                        defaultValue={fData?.address?.state ? fData.address.state : ''}
                      />
                    </>
                  ) : null}
                </Box>

                <Box display="flex" alignItems="center">
                  {editOption ? (
                    <>
                      <Typography sx={{ fontWeight: 600, mr: 1 }}>Street :</Typography>
                      <TextField
                        name="street"
                        variant="outlined"
                        {...register('street')}
                        defaultValue={fData?.address?.city.street ? fData.address.city.street : ''}
                      />
                    </>
                  ) : (
                    <Typography>
                      {fData?.address?.city.street ? fData.address.city.street : ''}
                    </Typography>
                  )}
                </Box>

                <Box display="flex" alignItems="center">
                  {editOption ? (
                    <>
                      <Typography sx={{ fontWeight: 600, mr: 1 }}>Area :</Typography>
                      <TextField
                        name="area"
                        variant="outlined"
                        {...register('area')}
                        defaultValue={fData?.address?.area ? fData.address.area : ''}
                      />
                    </>
                  ) : null}
                </Box>

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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </form>
    </Box>
  );
}

ContactDetailform.propTypes = {
  fData: PropTypes.object,
};
