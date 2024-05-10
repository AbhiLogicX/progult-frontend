import { format } from 'date-fns';
import { useState, useContext } from 'react';

import { Box, Grid, Paper, Button, Typography } from '@mui/material';

import { grey, primary } from 'src/theme/palette';
import { TitleContext } from 'src/context/mainContext';

import ContatactDetailsEdit from './ContactDetails';

export default function AdminProfileEdit() {
  const [openContactForm, setOpenContactForm] = useState(false);
  const { setTitle } = useContext(TitleContext);

  const handleOpenContactForm = () => {
    setOpenContactForm(true);
  };

  const handleCloseContactForm = () => {
    setOpenContactForm(false);
  };
  const adminDetails = JSON.parse(localStorage.getItem('items'));
  // console.log(adminDetails);
  setTitle('Admin');
  return (
    <Box mx={2} mt={1}>
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
              <Typography variant="h3">{adminDetails.fullName}</Typography>
              <Box display="flex">
                <Box display="flex" mr={2}>
                  <Typography fontWeight={700} color={grey[400]} mr={1}>
                    AdminId:
                  </Typography>
                  <Typography fontWeight={700} color={primary.main}>
                    {adminDetails._id}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography fontWeight={700} color={grey[400]} mr={1}>
                    Status:
                  </Typography>
                  <Typography fontWeight={700} color={primary.main}>
                    {adminDetails.status}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={2}>
            <Box textAlign="right">
              <Button variant="contained" onClick={handleOpenContactForm}>
                Edit
              </Button>
              <ContatactDetailsEdit
                handleClose={handleCloseContactForm}
                open={openContactForm}
                profileData={adminDetails}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid p="1%" container>
          <Grid xs={4}>
            <Typography variant="h6">User Info:</Typography>
            <Box p={2} bgcolor={grey[300]} borderRadius={2} width="97%">
              <Typography>{`Mobile: +91-${adminDetails.mobile}`}</Typography>
              <Typography>{`Email: ${adminDetails.email}`}</Typography>
              <Typography>{`Gender: ${adminDetails.gender}`}</Typography>
            </Box>
          </Grid>
          <Grid xs={3}>
            <Typography variant="h6">Info:</Typography>
            <Box p={2} bgcolor={grey[300]} borderRadius={2}>
              <Typography>{`created at: ${format(
                new Date(adminDetails.createdAt),
                'dd-MMM-yyyy'
              )}`}</Typography>
              <Typography>{`updated at: ${format(
                new Date(adminDetails.updatedAt),
                'dd-MMM-yyyy'
              )}`}</Typography>
              <Typography>{`user type: ${adminDetails.usertype}`}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
