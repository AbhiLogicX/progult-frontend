import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { getReq } from 'src/api/api';
import { grey, error, primary, success } from 'src/theme/palette';

import BookingTable from './bookingTable';
import LineChart from './YearlyEarnigChart';
import ContatactDetails from './contactForm';

function BasicInfoView({ profiledata, handleReload }) {
  const [openForm, setOpenForm] = useState(false);
  const [tableRender, setTableRender] = useState('bussiness');

  const handleClickChangeTableBussiness = () => {
    setTableRender('bussiness');
  };
  const handleClickChangeTableEvent = () => {
    setTableRender('event');
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };
  const location = useLocation().pathname.split('/');
  // console.log('profiledata', profiledata);
  return (
    <>
      <Box display="flex" width="100%" mb={2}>
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
                <LineChart id={profiledata.data._id} />
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
              {tableRender === 'bussiness' ? (
                <Button
                  sx={{
                    bgcolor: grey[700],
                    color: error.errorBackground,
                    '&:hover': { bgcolor: grey[700], color: error.errorBackground },
                    mr: 1,
                  }}
                  disabled
                >
                  Bussiness
                </Button>
              ) : (
                <Button
                  sx={{
                    bgcolor: error.errorBackground,
                    color: grey[700],
                    '&:hover': { bgcolor: grey[700], color: error.errorBackground },
                    mr: 1,
                  }}
                  onClick={handleClickChangeTableBussiness}
                >
                  Bussiness
                </Button>
              )}
              {tableRender === 'event' ? (
                <Button
                  sx={{
                    bgcolor: grey[700],
                    color: error.errorBackground,
                    '&:hover': { bgcolor: grey[700], color: error.errorBackground },
                    mr: 1,
                  }}
                  disabled
                >
                  Evnets
                </Button>
              ) : (
                <Button
                  sx={{
                    bgcolor: error.errorBackground,
                    color: grey[700],
                    '&:hover': { bgcolor: grey[700], color: error.errorBackground },
                  }}
                  onClick={handleClickChangeTableEvent}
                >
                  Evnets
                </Button>
              )}
            </Box>
          </Box>
          <BookingTable usId={profiledata?.data?._id} fromCall={tableRender} />
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

  const [fetchedData, setFetchedData] = useState(false);
  const [sidePanleData, setSidePanleData] = useState();

  useEffect(() => {
    if (!fetchedData) {
      fetechSideData();
    }
    async function fetechSideData() {
      if (location[1] === 'vendors') {
        await getReq(`report/getVendorBookingCounts?vendorId=${location[3]}`).then((res) => {
          setSidePanleData(res.data);
          setFetchedData(true);
        });
      }
      if (location[1] === 'customers') {
        // report/getUserBookingCounts?userId=663228b1922313926ddfb953
        await getReq(`report/getUserBookingCounts?userId=${location[3]}`).then((res) => {
          setSidePanleData(res.data);
          setFetchedData(true);
        });
      }
    }
  });
  // console.log('sidePanleData', sidePanleData);
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
                {sidePanleData?.todaysBussinessBooking}
              </Typography>
              <Typography variant="subtitle1">Today’s Bussiness Bookings</Typography>
            </Box>

            <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
              <Typography variant="h4" color={primary.main}>
                {sidePanleData?.todaysEventBooking}
              </Typography>
              <Typography variant="subtitle1">Today’s Event Bookings</Typography>
            </Box>

            <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
              <Typography variant="h4" color={primary.main}>
                {sidePanleData?.monthlyBussinessBooking}
              </Typography>
              <Typography variant="subtitle1">Bussiness Bookings This Month</Typography>
            </Box>

            <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
              <Typography variant="h4" color={primary.main}>
                {sidePanleData?.monthlyEventBooking}
              </Typography>
              <Typography variant="subtitle1">Event Bookings This Month</Typography>
            </Box>

            <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
              <Typography variant="h4" color={primary.main}>
                {sidePanleData?.totalEventBooking}
              </Typography>
              <Typography variant="subtitle1">All Event Bookings</Typography>
            </Box>
            <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
              <Typography variant="h4" color={primary.main}>
                {sidePanleData?.totalBussinessBooking}
              </Typography>
              <Typography variant="subtitle1">All Bussiness Bookings</Typography>
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
                  {sidePanleData?.totalBussiness}
                </Typography>
                <Typography variant="subtitle1">Businesses</Typography>
              </Box>

              <Box bgcolor={success.lighter} p={2} borderRadius={2} width="48%" mb={1}>
                <Typography variant="h4" color={primary.main}>
                  {sidePanleData?.totalEvent}
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
                  {sidePanleData?.todaysBussinessBooking}
                </Typography>
                <Typography variant="subtitle1">Today’s Bussiness Bookings</Typography>
              </Box>

              <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  {sidePanleData?.monthlyBussinessBooking}
                </Typography>
                <Typography variant="subtitle1">Monthly Bussiness Bookings</Typography>
              </Box>

              <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  {sidePanleData?.totalBussinessBooking}
                </Typography>
                <Typography variant="subtitle1">Total Bussiness Bookings</Typography>
              </Box>

              <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  {sidePanleData?.todaysEventBooking}
                </Typography>
                <Typography variant="subtitle1">Today’s Event Bookings</Typography>
              </Box>

              <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  {sidePanleData?.monthlyEventBooking}
                </Typography>
                <Typography variant="subtitle1">Monthly Event Bookings</Typography>
              </Box>
              <Box bgcolor={primary.lighter} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  {sidePanleData?.totalEventBooking}
                </Typography>
                <Typography variant="subtitle1">Total Event Bookings</Typography>
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
                  {`₹${sidePanleData?.totalBussinessEarning}`}
                </Typography>
                <Typography variant="subtitle1">Total Bussiness Earnings</Typography>
              </Box>

              <Box bgcolor={primary.light} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  {`₹${sidePanleData?.totalEventEarning}`}
                </Typography>
                <Typography variant="subtitle1">Total Event Earnings</Typography>
              </Box>
              <Box bgcolor={primary.light} p={2} borderRadius={2} mb={1}>
                <Typography variant="h4" color={primary.main}>
                  {`₹${sidePanleData?.totalEarning}`}
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
