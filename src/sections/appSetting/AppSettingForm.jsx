import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import { Box, Paper, TextField, Typography } from '@mui/material';

export default function AppSettingForm({ AppData }) {
  const { register, handleSubmit } = useForm({});
  const onSubmitBasicDetails = (data) => {
    // pass
  };
  //   const onSubmitSeoDetails = (data) => {}
  //   const onSubmitTermsCondition = (data) => {}
  //   const onSubmitSocialLinks = (data) => {};

  console.log(AppData);
  return (
    <Box>
      <Box component={Paper} elevation={4} sx={{ mb: 5, borderRadius: 0.75, p: 2 }}>
        <form onSubmit={handleSubmit(onSubmitBasicDetails)}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Basic Details
          </Typography>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            sx={{ mr: 2, mb: 2, width: '25%' }}
            {...register('name')}
          />
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            sx={{ mr: 2, mb: 2, width: '25%' }}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{ mr: 2, mb: 2, width: '25%' }}
          />
          <TextField
            id="standard-basic"
            label="mobile"
            variant="standard"
            sx={{ mr: 2, mb: 2, width: '25%' }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Address
            </Typography>
            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <TextField
              id="standard-basic"
              label="State"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <TextField
              id="standard-basic"
              label="Street"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <TextField
              id="standard-basic"
              label="Area"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <TextField
              id="standard-basic"
              label="Pin code"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Full Address"
              fullWidth
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
          </Box>
        </form>
      </Box>
      <Box component={Paper} elevation={4} sx={{ mb: 5, borderRadius: 0.75, p: 2 }}>
        <form>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Image Details
          </Typography>
        </form>
      </Box>
      <Box component={Paper} elevation={4} sx={{ mb: 5, borderRadius: 0.75, p: 2 }}>
        <form>
          <Typography variant="h5" sx={{ mb: 2 }}>
            SEO Details
          </Typography>
        </form>
      </Box>
      <Box component={Paper} elevation={4} sx={{ mb: 5, borderRadius: 0.75, p: 2 }}>
        <form>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Social Link Details
          </Typography>
        </form>
      </Box>
      <Box component={Paper} elevation={4} sx={{ mb: 5, borderRadius: 0.75, p: 2 }}>
        <form>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Terms & Condition Details
          </Typography>
        </form>
      </Box>
    </Box>
  );
}

AppSettingForm.propTypes = {
  AppData: PropTypes.object,
};
