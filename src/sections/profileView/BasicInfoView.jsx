import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SmsIcon from '@mui/icons-material/Sms';
import TextField from '@mui/material/TextField';
import FeedIcon from '@mui/icons-material/Feed';
import CallIcon from '@mui/icons-material/Call';
import Typography from '@mui/material/Typography';
import NativeSelect from '@mui/material/NativeSelect';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import { patchReq } from 'src/api/api';
import { primary, warning } from 'src/theme/palette';

function BasicInfoView({ profiledata, handleReload }) {
  return (
    <Box display="flex" width={1500}>
      <Box mr={5}>
        <Box mb={3} component={Paper} elevation={3} p="1%" display="flex" alignItems="center">
          <Box mr={2}>
            <img
              src="/assets/images/images(1).png"
              alt="profile person cvoer"
              style={{ height: 250, width: 250 }}
            />
          </Box>
          <Box>
            <Typography variant="h2">{profiledata.data.fullName}</Typography>
          </Box>
        </Box>
        <ContatactDetails profileData={profiledata} handleReload={handleReload} />
      </Box>
      <Box component={Paper} elevation={3} sx={{ px: '1%', py: '2%' }}>
        <SidePanle />
      </Box>
    </Box>
  );
}

export default BasicInfoView;

//-----------------------------------------------------------------------------------

function ContatactDetails({ profileData, handleReload }) {
  const [editOption, setEditOption] = useState(false);

  const { register, handleSubmit } = useForm({});

  const location = useLocation().pathname.split('/');

  const handleSetEditOption = () => {
    setEditOption(true);
  };
  const handleSetEditOptionCancel = () => {
    setEditOption(false);
  };

  async function onSubmit(data) {
    data.fullName = profileData.data.fullName;
    data.Id = profileData.data._id;
    if (location[1] === 'vendors') {
      await patchReq('vendor/detail', data);
      setEditOption(false);
      handleReload(false);
    }
    if (location[1] === 'customers') {
      await patchReq('user/detail', data);
      setEditOption(false);
      handleReload(false);
    }
  }
  return (
    <Paper elevation={3} sx={{ borderRadius: 0.75, p: '1%', width: 1000 }}>
      <Box mb={5}>
        <Typography variant="h5">Contact Details</Typography>
      </Box>

      <Box
        sx={{ mb: 1, p: '1%', borderRadius: 0.75 }}
        border={editOption ? '1px solid darkgrey' : null}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box mb={5} display="flex" sx={{ borderRadius: 0.75 }}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ fontWeight: 600, mr: 1 }}>Email :</Typography>
                  {editOption ? (
                    <TextField
                      name="email"
                      variant="outlined"
                      {...register('email')}
                      required
                      defaultValue={profileData.data.email}
                    />
                  ) : (
                    <Typography>{profileData.data.email}</Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ fontWeight: 600, mr: 1 }}>Mobile :</Typography>
                  {editOption ? (
                    <TextField
                      name="mobile"
                      variant="outlined"
                      {...register('mobile')}
                      required
                      defaultValue={profileData.data.mobile}
                    />
                  ) : (
                    <Typography>{profileData.data.mobile}</Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ fontWeight: 600, mr: 1 }}>Gender :</Typography>
                  {editOption ? (
                    <NativeSelect defaultValue={profileData.data.gender} {...register('gender')}>
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </NativeSelect>
                  ) : (
                    <Typography>{profileData.data.gender}</Typography>
                  )}
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Typography sx={{ fontWeight: 600, mr: 1 }}>Status :</Typography>
                  {editOption ? (
                    <NativeSelect defaultValue={profileData.data.status} {...register('status')}>
                      <option value="active">active</option>
                      <option value="in-active">in-active</option>
                    </NativeSelect>
                  ) : (
                    <Typography>{profileData.data.status}</Typography>
                  )}
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
                      defaultValue={
                        profileData.data?.address?.city ? profileData.data.address.city : ''
                      }
                    />
                  ) : (
                    <Typography>
                      {profileData.data?.address?.city ? profileData.data.address.city : ''}
                    </Typography>
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
                      defaultValue={
                        profileData.data?.address?.state ? profileData.data.address.state : ''
                      }
                    />
                  ) : (
                    <Typography>
                      {profileData.data?.address?.state ? profileData.data.address.state : ''}
                    </Typography>
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
                      defaultValue={
                        profileData.data?.address?.street ? profileData.data.address.street : ''
                      }
                    />
                  ) : (
                    <Typography>
                      {profileData.data?.address?.street ? profileData.data.address.street : ''}
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
                      defaultValue={
                        profileData.data?.address?.area ? profileData.data.address.area : ''
                      }
                    />
                  ) : (
                    <Typography>
                      {profileData.data?.address?.area ? profileData.data.address.area : ''}
                    </Typography>
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
                      defaultValue={
                        profileData.data?.address?.pincode ? profileData.data.address.pincode : ''
                      }
                    />
                  ) : (
                    <Typography>
                      {profileData.data?.address?.pincode ? profileData.data.address.pincode : ''}
                    </Typography>
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
    </Paper>
  );
}

function SidePanle() {
  return (
    <Box>
      <Box mb={3}>
        <Grid container spacing={1} sx={{ textAlign: 'center' }}>
          <Grid xs={12} mb={2}>
            <Button variant="contained" sx={{ width: '90%' }} color="success">
              <WhatsAppIcon sx={{ mr: 1 }} />
              Send WhatsApp
            </Button>
          </Grid>
          <Grid xs={6} mb={1}>
            <Button variant="contained" sx={{ width: '81%' }}>
              <SmsIcon sx={{ mr: 1 }} />
              Send SMS
            </Button>
          </Grid>
          <Grid xs={6} mb={1}>
            <Button variant="contained" sx={{ width: '82%' }}>
              <MarkunreadIcon sx={{ mr: 1 }} />
              Send Email
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box px={2} mb={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex">
            <FeedIcon sx={{ mr: 1 }} />
            <Typography mr={1}>{`Today's Orders :`}</Typography>
          </Box>
          <Typography bgcolor={primary.light} sx={{ px: 2, py: 1, borderRadius: 0.75 }}>
            0
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex">
            <FeedIcon sx={{ mr: 1 }} />
            <Typography mr={1}>Monthly Orders :</Typography>
          </Box>
          <Typography bgcolor={primary.light} sx={{ px: 2, py: 1, borderRadius: 0.75 }}>
            0
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex">
            <FeedIcon sx={{ mr: 1 }} />
            <Typography mr={1}>Total Orders :</Typography>
          </Box>
          <Typography bgcolor={primary.light} sx={{ px: 2, py: 1, borderRadius: 0.75 }}>
            0
          </Typography>
        </Box>
      </Box>

      <Box px={2} mb={2}>
        <Box mb={1}>
          <Typography variant="h5">Earnings</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex">
            <AccountBalanceWalletIcon sx={{ mr: 1 }} />
            <Typography mr={1}>{`Today's Earning :`}</Typography>
          </Box>

          <Typography
            bgcolor={primary.darker}
            color="whitesmoke"
            sx={{ px: 2, py: 1, borderRadius: 0.75, display: 'flex', alignItems: 'center' }}
          >
            <CurrencyRupeeIcon sx={{ mr: 1 }} />0
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex">
            <AccountBalanceWalletIcon sx={{ mr: 1 }} />
            <Typography mr={1}>{`Today's Earning :`}</Typography>
          </Box>

          <Typography
            bgcolor={primary.darker}
            color="whitesmoke"
            sx={{ px: 2, py: 1, borderRadius: 0.75, display: 'flex', alignItems: 'center' }}
          >
            <CurrencyRupeeIcon sx={{ mr: 1 }} />0
          </Typography>
        </Box>
      </Box>

      <Box px={2}>
        <Box mb={1}>
          <Typography variant="h5">Account</Typography>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Box display="flex">
            <MarkunreadIcon sx={{ mr: 1 }} />
            <Typography mr={1}>Email</Typography>
          </Box>

          <Typography
            bgcolor={warning.light}
            sx={{ px: 2, py: 1, borderRadius: 0.75, display: 'flex', alignItems: 'center' }}
          >
            Not Verified
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex">
            <CallIcon sx={{ mr: 1 }} />
            <Typography mr={1}>Mobile</Typography>
          </Box>

          <Typography
            bgcolor={warning.light}
            sx={{ px: 2, py: 1, borderRadius: 0.75, display: 'flex', alignItems: 'center' }}
          >
            Not Verified
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

BasicInfoView.propTypes = {
  profiledata: PropTypes.object,
  handleReload: PropTypes.func,
};

ContatactDetails.propTypes = {
  profileData: PropTypes.object,
  handleReload: PropTypes.func,
};
