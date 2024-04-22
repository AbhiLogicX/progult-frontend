import React from 'react';

import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import { Box, Grid, Container, Typography } from '@mui/material';

import { common, primary } from 'src/theme/palette';

import InfoCardRender from '../infoCards';

export default function ContactUs() {
  const infoCardData = [
    { infoData: '+91-1234567890', infoHead: 'Give Us a Call', infoIcon: <CallIcon /> },
    { infoData: 'progult@gmail.com', infoHead: 'Send Us a Mail', infoIcon: <EmailIcon /> },
    { infoData: 'Bhilai, Chhattisgarh', infoHead: 'Reach Us', infoIcon: <PlaceIcon /> },
  ];
  return (
    <>
      <Box sx={{ backgroundColor: primary.main, width: '100%', mb: 5, textAlign: 'center', py: 5 }}>
        <Typography variant="h2" color={common.white}>
          Contact Us
        </Typography>
        <Typography variant="h4" color={common.black}>
          Progult
        </Typography>
      </Box>

      <Container>
        {/* <Paper variant="outlined" square style={{ height: '400px', width: '100%' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d519.2649021359422!2d81.37029722935597!3d20.49430912632592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a2ee7fe694bdc79%3A0x134271b3017522ef!2sKUNAL%20COMPUTER%20CHARAMA!5e0!3m2!1sen!2sin!4v1712046560610!5m2!1sen!2sin"
            title="Google Maps"
            style={{ height: '100%', width: '100%', border: 0 }}
            allowFullScreen
          />
        </Paper> */}
        <Box>
          <Grid container>
            {infoCardData.map((crdData) => (
              <InfoCardRender
                infoData={crdData.infoData}
                infoHead={crdData.infoHead}
                infoIcon={crdData.infoIcon}
              />
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}
