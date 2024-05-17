import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Alert, Paper, Button, TextField, Typography } from '@mui/material';

import { patchReq } from 'src/api/api';

import SEOForm from './SEODetailsForm';
import SocialForm from './SocialLinkForm';
import ImageForm from './ImageDetailsForm';
import TermsAndConditionForm from './TermsConditionForm';

export default function AppSettingForm({ AppData, handleReload }) {
  const [alert, setAlert] = useState(false);
  const [alertVisisble, setAlertVisible] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const { register, handleSubmit } = useForm({});

  const onSubmitBasicDetails = async (data) => {
    data.Id = AppData._id;
    // console.log(data);
    await patchReq(`master/application-setting`, data).then((res) => {
      if (res.statusCode === 200) {
        // console.log(res);
        setAlert(true);
        setAlertVisible(true);
        setTimeout(() => {
          setAlert(false);
          setAlertVisible(false);
          handleReload(false);
        }, 1200);
      } else {
        setAlertVisible(true);
        setErrorMessage(res?.response?.data?.message);
        setTimeout(() => {
          setAlertVisible(false);
        }, 1000);
      }
    });
  };

  // const onSubmitTermsCondition = (data) => {}
  //   const onSubmitSocialLinks = (data) => {};

  // console.log('AppSettingData', AppData);
  return (
    <Box>
      <Box component={Paper} elevation={4} sx={{ mb: 2, borderRadius: 0.75, p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Basic Details
        </Typography>
        {alert ? (
          <>
            {alertVisisble ? (
              <Alert variant="filled" severity="success">
                updated successfully
              </Alert>
            ) : null}
          </>
        ) : null}
        {alert ? null : (
          <>
            {alertVisisble ? (
              <Alert variant="filled" severity="error">
                {errMessage !== '' ? errMessage : ` not updated`}
              </Alert>
            ) : null}
          </>
        )}

        <form onSubmit={handleSubmit(onSubmitBasicDetails)}>
          <TextField
            id="standard-basic"
            label="Name"
            defaultValue={AppData.name}
            sx={{ mr: 2, mb: 2, width: '25%', mt: 2 }}
            {...register('name')}
          />

          <TextField
            id="standard-basic"
            label="Title"
            defaultValue={AppData.title}
            sx={{ mr: 2, mb: 2, width: '25%' }}
            {...register('title')}
          />
          <TextField
            id="standard-basic"
            defaultValue={AppData.email}
            label="Email"
            sx={{ mr: 2, mb: 2, width: '25%' }}
            {...register('email')}
          />
          <TextField
            id="standard-basic"
            defaultValue={AppData.mobile[0]}
            label="Mobile"
            sx={{ mr: 2, mb: 2, width: '25%' }}
            {...register('mobile')}
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Address
            </Typography>
            <TextField
              id="standard-basic"
              defaultValue={AppData?.address?.city}
              label="City"
              sx={{ mr: 2, mb: 2, width: '25%' }}
              {...register('city')}
            />
            <TextField
              id="standard-basic"
              label="State"
              sx={{ mr: 2, mb: 2, width: '25%' }}
              defaultValue={AppData?.address?.state}
              {...register('state')}
            />
            <TextField
              id="standard-basic"
              label="Street"
              sx={{ mr: 2, mb: 2, width: '25%' }}
              defaultValue={AppData?.address?.street}
              {...register('street')}
            />
            <TextField
              id="standard-basic"
              label="Area"
              sx={{ mr: 2, mb: 2, width: '25%' }}
              defaultValue={AppData?.address?.area}
              {...register('area')}
            />
            <TextField
              id="standard-basic"
              label="Pin code"
              sx={{ mr: 2, mb: 2, width: '25%' }}
              defaultValue={AppData?.address?.pincode}
              {...register('pincode')}
            />
            {/* <br />
            <TextField
              id="standard-basic"
              label="Full Address"
              fullWidth
              sx={{ mr: 2, mb: 2, width: '25%' }}
            /> */}
          </Box>
          <Box textAlign="right">
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </form>
      </Box>
      <Box component={Paper} elevation={4} sx={{ mb: 2, borderRadius: 0.75, p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Image Details
        </Typography>
        {/* <form>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Banner:
            </Typography>
            <Box display="flex" alignItems="end">
              <Box mr={5}>
                <img
                  src={`${properties.BASE_ADMIN_IMAGE_URL}${AppData?.banner}`}
                  alt="Admin Logo"
                  style={{ aspectRatio: 1 / 1, objectFit: 'cover', borderRadius: 10 }}
                />
              </Box>
              <TextField type="file" />
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Logo:
            </Typography>
            <Box display="flex" alignItems="end">
              <Box mr={5}>
                <img
                  src={`${properties.BASE_ADMIN_IMAGE_URL}${AppData?.logo}`}
                  alt="Admin Logo"
                  style={{ aspectRatio: 1 / 1, objectFit: 'cover', borderRadius: 10 }}
                />
              </Box>
              <TextField type="file" />
            </Box>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Icon:
            </Typography>
            <Box display="flex" alignItems="end">
              <Box mr={5}>
                <img
                  src={`${properties.BASE_ADMIN_IMAGE_URL}${AppData?.icon}`}
                  //   src="/assets/images/imgPlace.png"
                  alt="Admin Logo"
                  style={{ aspectRatio: 1 / 1, objectFit: 'cover', borderRadius: 10 }}
                />
              </Box>
              <TextField type="file" />
            </Box>
          </Box>
        </form> */}
        <ImageForm AppData={AppData} handleReload={handleReload} />
      </Box>
      <Box component={Paper} elevation={4} sx={{ mb: 2, borderRadius: 0.75, p: 2 }}>
        <SEOForm AppData={AppData} handleReload={handleReload} />
      </Box>
      <Box component={Paper} elevation={4} sx={{ mb: 2, borderRadius: 0.75, p: 2 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Social Link Details
        </Typography>
        <SocialForm dValues={AppData?.socialLinks} handleReload={handleReload} Id={AppData._id} />
      </Box>
      <Box component={Paper} elevation={4} sx={{ mb: 2, borderRadius: 0.75, p: 2 }}>
        <form>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Terms & Condition Details
          </Typography>
          <TermsAndConditionForm AppData={AppData} handleReload={handleReload} />
        </form>
      </Box>
    </Box>
  );
}

AppSettingForm.propTypes = {
  AppData: PropTypes.object,
  handleReload: PropTypes.func,
};
