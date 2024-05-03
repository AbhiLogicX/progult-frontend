import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { grey } from '@mui/material/colors';
import { Box, Grid, Paper, Typography } from '@mui/material';

import { getReq } from 'src/api/api';
import { primary } from 'src/theme/palette';
import properties from 'src/config/properties';

export default function BookingDetails() {
  const [fetchedData, setFehedData] = useState(false);
  const [bookingDetails, setBookingDetails] = useState();
  const location = useLocation().pathname.split('/');

  // console.log(location);

  useEffect(() => {
    if (!fetchedData) {
      fetchBookingDetails();
    }
    async function fetchBookingDetails() {
      if (location[3] === 'bussiness') {
        await getReq(`booking/detail?Id=${location[4]}`).then((res) => {
          if (res.statusCode === 200) {
            setBookingDetails(res.data);
            setFehedData(true);
          }
        });
      }
      if (location[3] === 'event') {
        await getReq(`booking/event/detail?Id=${location[4]}`).then((res) => {
          if (res.statusCode === 200) {
            setBookingDetails(res.data);
            setFehedData(true);
          }
        });
      }
    }
  }, [fetchedData, location]);
  // console.log(bookingDetails);

  // const activityTotal = 0;
  // const AddonTotal = 0;
  // const foodTotal = 0;

  return (
    <Box width="99%" mt={1}>
      <Grid container>
        <Grid xs={9}>
          <Paper elevation={3} sx={{ mr: 2, mb: 2 }}>
            <Box width="100%">
              <img
                src="/assets/images/profileBackImg.png"
                style={{ aspectRatio: 5 / 1, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                alt="profile back pic"
              />
            </Box>
            <Box p={1.7} sx={{ borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
              <Grid container>
                <Grid xs={3} mt={-15}>
                  <Box p={2}>
                    {bookingDetails?.bussinessId?.brandLogo ? (
                      <img
                        src={`${properties.BASE_BUSSINESS_IMAGE_URL}${bookingDetails?.bussinessId?.brandLogo}`}
                        style={{
                          width: '100%',
                          aspectRatio: 1 / 1,
                          borderRadius: '50%',
                          border: '10px solid white',
                        }}
                        alt="brandLogo"
                      />
                    ) : (
                      <img
                        src="/assets/images/imgPlace.png"
                        alt="brandLogo"
                        style={{
                          width: '100%',
                          aspectRatio: 1 / 1,
                          borderRadius: '50%',
                          border: '10px solid white',
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid xs={7}>
                  <Box p={1}>
                    <Typography variant="h2">{bookingDetails?.bussinessId?.title}</Typography>
                    <Box display="flex">
                      <Box display="flex" mr={2}>
                        <Typography fontWeight={700} mr={1} color={grey[500]}>
                          Booking Id:
                        </Typography>
                        <Typography fontWeight={700} color={primary.main}>
                          {bookingDetails?.bookNo}
                        </Typography>
                      </Box>
                      <Box display="flex">
                        <Typography fontWeight={700} mr={1} color={grey[500]}>
                          Booking Date:
                        </Typography>
                        <Typography fontWeight={700} color={primary.main}>
                          {bookingDetails?.createdAt
                            ? format(new Date(bookingDetails.createdAt), 'dd-MMM-yyyy')
                            : null}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          {location[3] === 'bussiness' ? (
            <Paper sx={{ mr: 2, mb: 2 }}>
              <Box p={1.7}>
                <Typography variant="h6">Selected Activites:</Typography>
                {bookingDetails?.activities?.map((itm) => (
                  <RenderActivityList activityData={itm} />
                ))}
              </Box>
            </Paper>
          ) : null}
          {location[3] === 'bussiness' ? (
            <Paper sx={{ mr: 2, mb: 2 }}>
              <Box p={1.7}>
                <Typography variant="h6">Selected Add Ons:</Typography>
                {bookingDetails?.addonItems?.map((itm) => (
                  <ReanderAddons addonData={itm} />
                ))}
              </Box>
            </Paper>
          ) : null}
          {location[3] === 'bussiness' ? (
            <Paper sx={{ mr: 2, mb: 2 }}>
              <Box p={1.7}>
                <Typography variant="h6">Selected Food & Beverages:</Typography>
                {bookingDetails?.addonFoods?.map((itm) => (
                  <ReanderAddons addonData={itm} />
                ))}
              </Box>
            </Paper>
          ) : null}
        </Grid>
        <Grid xs={3}>
          <Paper elevation={3} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box width="25%" mr={2}>
              <img
                src="/assets/images/imgPlace.png"
                style={{ borderRadius: '50%', objectFit: 'cover', aspectRatio: 1 / 1 }}
                alt="bussinesslogo/host logo"
              />
            </Box>
            <Box>
              <Typography color={primary.main} fontWeight={700}>
                BUSSINESS OWNER
              </Typography>
              <Typography variant="h5">Akash Agrawal</Typography>
              <Typography color={grey[700]}>+91-1234567890</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box width="25%" mr={2}>
              <img
                src="/assets/images/imgPlace.png"
                style={{ borderRadius: '50%', objectFit: 'cover', aspectRatio: 1 / 1 }}
                alt="bussinesslogo/host logo"
              />
            </Box>
            <Box>
              <Typography color={primary.main} fontWeight={700}>
                CUSTOMER
              </Typography>
              <Typography variant="h5">Harsh Agrawal</Typography>
              <Typography color={grey[700]}>+91-9876543210</Typography>
            </Box>
          </Paper>
          <Paper elevation={3} sx={{ p: 1.7 }}>
            <Typography variant="h6" mr={3}>
              Biling Information
            </Typography>
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Activity Total</Typography>
                <Typography>-</Typography>
                <Typography>₹2550</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Addons Total</Typography>
                <Typography>-</Typography>
                <Typography>₹260</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Food Total</Typography>
                <Typography>-</Typography>
                <Typography>₹210</Typography>
              </Box>
            </Box>
            <hr />
            <Box>
              <Box display="flex" justifyContent="space-between">
                <Typography>Taxes & Charges</Typography>
                <Typography>-</Typography>
                <Typography>₹24</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Platform Fee</Typography>
                <Typography>-</Typography>
                <Typography>₹10</Typography>
              </Box>
              <Box p={1} bgcolor={primary.light} borderRadius={1}>
                <Box display="flex" justifyContent="space-between">
                  <Typography fontWeight={700}>TotalPaid</Typography>
                  <Typography>-</Typography>
                  <Typography variant="h6" color={primary.dark}>
                    ₹3054
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

function RenderActivityList({ activityData }) {
  return (
    <Box
      p={1}
      bgcolor={grey[300]}
      borderRadius={2}
      display="flex"
      mb={1}
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Box width="7%">
        {activityData?.busActivityId?.activityId?.image ? (
          <img
            src={`${properties.BASE_DOMAIN_IMAGE_URL}${activityData?.busActivityId.activityId.image}`}
            alt="activity Logo"
            style={{ borderRadius: 10, width: '100%', aspectRatio: 1 / 1, objectFit: 'cover' }}
          />
        ) : (
          <img
            src="/assets/images/imgPlace.png"
            alt="activity Logo"
            style={{ borderRadius: 10, width: '100%', aspectRatio: 1 / 1, objectFit: 'cover' }}
          />
        )}
      </Box>
      <Box>
        <Typography fontWeight={700}>{activityData?.busActivityId?.activityId?.title}</Typography>
        <Typography>{`From: ${activityData?.slotId?.startTime} to ${activityData?.slotId?.endTime}`}</Typography>
      </Box>
      <Box>
        <br />
        <Typography>{`People Count: ${activityData?.person}`}</Typography>
      </Box>
      <Box>
        <Box display="flex">
          <Typography mr={1}>
            Booked For:
            <Typography component="span" color={primary.dark}>
              {format(new Date(activityData?.date), 'dd-MMM-yyyy')}
            </Typography>
          </Typography>
        </Box>
        <Box display="flex">
          <Typography mr={1}>Fee:</Typography>
          <Typography fontWeight={500}>{`₹${activityData?.rate}`}</Typography>
        </Box>
      </Box>

      <Box display="flex">
        <Typography mr={1} fontWeight={700}>
          Total Fee:
        </Typography>
        <Typography
          color={primary.main}
          fontWeight={700}
        >{`₹${activityData?.itemTotal}`}</Typography>
      </Box>
    </Box>
  );
}

function ReanderAddons({ addonData }) {
  // console.log('addonData', addonData);
  return (
    <Box
      p={1}
      bgcolor={grey[300]}
      borderRadius={2}
      display="flex"
      mb={1}
      alignItems="center"
      justifyContent="space-between"
      gap={2}
    >
      <Box width="6%">
        {addonData?.itemId.image ? (
          <img
            src={`${properties.BASE_ITEM_IMAGE_URL}${addonData?.itemId.image}`}
            alt="activity Logo"
            style={{ borderRadius: 10, width: '100%', aspectRatio: 1 / 1, objectFit: 'cover' }}
          />
        ) : (
          <img
            src="/assets/images/imgPlace.png"
            alt="activity Logo"
            style={{ borderRadius: 10, width: '100%', aspectRatio: 1 / 1, objectFit: 'cover' }}
          />
        )}
      </Box>
      <Typography fontWeight={700}> {addonData?.itemId?.title}</Typography>
      <Typography>{`Amount: ${addonData?.rate}`}</Typography>
      <Typography>{`Qty: ${addonData?.quantity}`}</Typography>

      <Box>
        <Typography mr={1} fontWeight={700}>
          Total Fee:
          <Typography
            component="span"
            color={primary.main}
            fontWeight={700}
          >{`₹${addonData?.itemTotal}`}</Typography>
        </Typography>
      </Box>
    </Box>
  );
}

ReanderAddons.propTypes = {
  addonData: PropTypes.object,
};

RenderActivityList.propTypes = {
  activityData: PropTypes.object,
};
