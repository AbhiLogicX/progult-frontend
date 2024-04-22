import PropTypes from 'prop-types';

import { Box, Grid, Paper, Typography } from '@mui/material';

import { primary } from 'src/theme/palette';

export default function InfoCardRender({ infoHead, infoData, infoIcon }) {
  return (
    <Grid xs={4}>
      <Box
        display="flex"
        component={Paper}
        elevation={3}
        width="97%"
        sx={{ p: '5%', borderRadius: 15 }}
      >
        <Box
          sx={{
            backgroundColor: primary.main,
            mr: 3,
            display: 'flex',
            alignItems: 'center',
            p: 3,
            borderRadius: '50%',
          }}
        >
          {infoIcon}
        </Box>
        <Box>
          <Typography variant="h4">{infoHead}</Typography>
          <Typography variant="subtitle1">{infoData}</Typography>
        </Box>
      </Box>
    </Grid>
  );
}

InfoCardRender.propTypes = {
  infoHead: PropTypes.string,
  infoData: PropTypes.string,
  infoIcon: PropTypes.node,
};
