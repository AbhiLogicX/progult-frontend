/* eslint-disable */
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Box, Grid, Paper } from '@mui/material';

import { getReq } from 'src/api/api';

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

  return (
    <Box width="99%" mt={1}>
      <Grid container>
        <Grid xs={8}>
          <Paper elevation={3} sx={{ mr: 2 }}>
            <Box width="100%">
              <img
                src="/assets/images/profileBackImg.png"
                style={{ aspectRatio: 5 / 1, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
                alt="profile back pic"
              />
            </Box>
            hello
          </Paper>
        </Grid>
        <Grid xs={4}>
          <Paper elevation={3} sx={{ p: 1.7 }}>
            Bye
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
