import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Alert, Button, TextField, Typography } from '@mui/material';

import { patchReq } from 'src/api/api';

export default function SEOForm({ AppData, handleReload }) {
  const [alert, setAlert] = useState(false);
  const [alertVisisble, setAlertVisible] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const { register, handleSubmit } = useForm({});

  const onSubmitSeoDetails = async (data) => {
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

  return (
    <Box sx={{ mb: 2, borderRadius: 0.75, p: 2 }}>
      <form onSubmit={handleSubmit(onSubmitSeoDetails)}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          SEO Details
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
        <Box mb={2}>
          <Typography fontWeight={700}>Key Words:</Typography>
          <Typography variant="caption">Use Comma (,) for sperating the keywords </Typography>
          <TextField
            multiline
            rows={2}
            defaultValue={AppData?.keywords}
            fullWidth
            {...register('keywords')}
          />
        </Box>
        <Box>
          <Typography fontWeight={700}>Description:</Typography>
          <TextField
            multiline
            rows={2}
            fullWidth
            {...register('description')}
            defaultValue={AppData?.description}
          />
        </Box>
        <Box mt={1} textAlign="right">
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </Box>
  );
}

SEOForm.propTypes = {
  AppData: PropTypes.object,
  handleReload: PropTypes.func,
};
