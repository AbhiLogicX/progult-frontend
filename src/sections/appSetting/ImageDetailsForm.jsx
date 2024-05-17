import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Alert, Button, TextField, Typography } from '@mui/material';

import { patchReq } from 'src/api/api';
import properties from 'src/config/properties';

export default function ImageForm({ AppData, handleReload }) {
  const [alert, setAlert] = useState(false);
  const [alertVisisble, setAlertVisible] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const { register, handleSubmit } = useForm({});

  const onSubmit = async (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append('Id', AppData._id);
    // console.log(data.logo[0]);
    if (data.logo !== undefined) {
      formData.append('logo', data.logo[0]);
    }
    if (data.icon !== undefined) {
      formData.append('icon', data.icon[0]);
    }
    if (data.banner !== undefined) {
      formData.append('banner', data.banner[0]);
    }
    await patchReq(`master/application-setting/uploads`, formData).then((res) => {
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
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Banner:
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
        <Box display="flex" alignItems="end">
          <Box mr={5} width="10%">
            <img
              src={`${properties.BASE_ADMIN_IMAGE_URL}${AppData?.banner}`}
              alt="Admin Logo"
              style={{ aspectRatio: 1 / 1, objectFit: 'cover', borderRadius: 10 }}
            />
          </Box>
          <TextField type="file" {...register('banner')} />
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
          <TextField type="file" {...register('logo')} />
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
          <TextField type="file" {...register('icon')} />
        </Box>
      </Box>
      <Box textAlign="right">
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </form>
  );
}

ImageForm.propTypes = {
  AppData: PropTypes.object,
  handleReload: PropTypes.func,
};
