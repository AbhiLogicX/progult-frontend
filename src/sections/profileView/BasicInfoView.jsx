import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { grey, error, primary, success } from 'src/theme/palette';

import BookingTable from './bookingTable';
import LineChart from './YearlyEarnigChart';
import ContatactDetails from './contactForm';

function BasicInfoView({ profiledata, handleReload }) {
  const [openForm, setOpenForm] = useState(false);

  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const location = useLocation().pathname.split('/');
  // console.log(profiledata);
  return (
    <>
      <Box display="flex" width="100%">
        <Box mr={2}>
          <Box mb={3} component={Paper} elevation={3}>
            <Box>
              <img
                src="/assets/images/profileBackImg.png"
                style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                alt="profile back"
              />
            </Box>
            <Grid container alignItems="flex-end" mt={-9.5} p="1%">
              <Grid xs={2}>
                <Box>
                  <img
                    src="/assets/images/profileImg.jpg"
                    style={{
                      height: '150px',
                      width: '150px',
                      borderRadius: '50%',
                      border: '10px solid white',
                    }}
                    alt="profile Pic"
                  />
                </Box>
              </Grid>

              <Grid xs={8}>
                <Box>
                  <Typography variant="h3">{profiledata.data.fullName}</Typography>
                  <Box display="flex">
                    <Box display="flex" mr={2}>
                      <Typography fontWeight={700} color={grey[400]} mr={1}>
                        VendorID:
                      </Typography>
                      <Typography fontWeight={700} color={primary.main}>
                        {profiledata.data._id}
                      </Typography>
                    </Box>
                    <Box display="flex">
                      <Typography fontWeight={700} color={grey[400]} mr={1}>
                        Status:
                      </Typography>
                      <Typography fontWeight={700} color={primary.main}>
                        {profiledata.data.status}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid xs={2}>
                <Box textAlign="right">
                  <Button variant="contained" onClick={handleOpenForm}>
                    Edit
                  </Button>
                </Box>
              </Grid>
            </Grid>

            <Grid p="1%" container>
              <Grid xs={4}>
                <Typography variant="h6">User Info:</Typography>
                <Box p={2} bgcolor={grey[300]} borderRadius={2} width="97%">
                  <Typography>{`Mobile: +91-${profiledata.data.mobile}`}</Typography>
                  <Typography>{`Email: ${profiledata.data.email}`}</Typography>
                  <Typography>{`Gender: ${profiledata.data.gender}`}</Typography>
                </Box>
              </Grid>
              <Grid xs={8}>
                <Typography variant="h6">Location Info:</Typography>
                <Box p={2} bgcolor={grey[300]} borderRadius={2}>
                  <Typography fontWeight={700}>{`Street: ${
                    profiledata?.data?.address?.street ? profiledata.data.address?.state : ''
                  }`}</Typography>
                  <Typography>{`${
                    profiledata?.data?.address?.state ? profiledata?.data?.address?.state : ''
                  }/ ${profiledata?.data?.address?.city ? profiledata?.data?.address?.city : ''}/ ${
                    profiledata?.data?.address?.area ? profiledata?.data?.address?.area : ''
                  }`}</Typography>
                  <Typography>{`Pincode: ${
                    profiledata?.data?.address?.pincode ? profiledata?.data?.address?.pincode : ''
                  }`}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
          <ContatactDetails
            profileData={profiledata}
            handleReload={handleReload}
            handleClose={handleCloseForm}
            open={openForm}
          />
          <Box>
            {location[1] === 'vendors' ? (
              <Paper elevation={3} sx={{ p: '1%' }}>
                <Typography variant="h5"> Yearly Earnings</Typography>
                <LineChart />
              </Paper>
            ) : null}
          </Box>
        </Box>
        <Box width="80%">
          <SidePanle />
        </Box>
      </Box>
      {location[1] === 'customers' ? (
        <Paper elevation={3} sx={{ p: '1%' }}>
          <Box display="flex" justifyContent="space-between" mb={2}>
            <Typography variant="h5">Booking History</Typography>
            <Box>
              <Button
                sx={{
                  bgcolor: grey[700],
                  color: error.errorBackground,
                  '&:hover': { bgcolor: grey[700], color: error.errorBackground },
                  mr: 1,
                }}
              >
                Bussiness
              </Button>
              <Button
                sx={{
                  bgcolor: error.errorBackground,
                  color: grey[700],
                  '&:hover': { bgcolor: grey[700], color: error.errorBackground },
                }}
              >
                Evnets
              </Button>
            </Box>
          </Box>
          <BookingTable />
        </Paper>
      ) : null}
    </>
  );
}

export default BasicInfoView;

//-----------------------------------------------------------------------------------

function SidePanle() {
  const location = useLocation().pathname.split('/');
  // console.log(location);

  return (
    <>
      {location[1] === 'customers' ? (
        <Paper elevation={3} sx={{ p: 1.5 }}>
          <Typography variant="h5" mb={2}>
            Bookings
          </Typography>

          <Box display="flex" justifyContent="space-between" flexWrap="wrap">
            <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
              <Typography variant="h4" color={primary.main}>
                12
              </Typography>
              <Typography variant="subtitle1">Today’s Bookings</Typography>
            </Box>

            <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
              <Typography variant="h4" color={primary.main}>
                12
              </Typography>
              <Typography variant="subtitle1">Bookings This Month</Typography>
            </Box>

            <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
              <Typography variant="h4" color={primary.main}>
                12
              </Typography>
              <Typography variant="subtitle1">All Bookings</Typography>
            </Box>
          </Box>
        </Paper>
      ) : null}

      {location[1] === 'vendors' ? (
        <>
          <Paper elevation={3} sx={{ p: 1.5, mb: 2 }}>
            <Typography variant="h4" mb={2}>
              Businesses
            </Typography>

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Box bgcolor={success.lighter} p={2} borderRadius={2} width="51.4%" mb={1}>
                <Typography variant="h4" color={primary.main}>
                  03
                </Typography>
                <Typography variant="subtitle1">Businesses</Typography>
              </Box>

              <Box bgcolor={success.lighter} p={2} borderRadius={2} width="48%" mb={1}>
                <Typography variant="h4" color={primary.main}>
                  01
                </Typography>
                <Typography variant="subtitle1">Events</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 1.5, mb: 2 }}>
            <Typography variant="h4" mb={2}>
              Bookings
            </Typography>

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  12
                </Typography>
                <Typography variant="subtitle1">Today’s Bookings</Typography>
              </Box>

              <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  12
                </Typography>
                <Typography variant="subtitle1">Today’s Bookings</Typography>
              </Box>

              <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  12
                </Typography>
                <Typography variant="subtitle1">Today’s Bookings</Typography>
              </Box>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: 1.5, mb: 2 }}>
            <Typography variant="h4" mb={2}>
              Earnings
            </Typography>

            <Box display="flex" justifyContent="space-between" flexWrap="wrap">
              <Box bgcolor={primary.light} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  ₹200
                </Typography>
                <Typography variant="subtitle1">Today’s Earnings</Typography>
              </Box>

              <Box bgcolor={primary.light} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  ₹500
                </Typography>
                <Typography variant="subtitle1">Earnings This Month</Typography>
              </Box>
              <Box bgcolor={primary.light} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  ₹1050
                </Typography>
                <Typography variant="subtitle1">Total Earnings</Typography>
              </Box>
            </Box>
          </Paper>
        </>
      ) : null}
    </>
  );
}

BasicInfoView.propTypes = {
  profiledata: PropTypes.object,
  handleReload: PropTypes.func,
};
