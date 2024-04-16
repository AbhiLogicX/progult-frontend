import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import properties from 'src/config/properties';

function MasterViewCard({ cardData }) {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1 }}
    >
      <Box>
        <img
          src={`${properties.BASE_DOMAIN_IMAGE_URL}${cardData.image}`}
          alt="aminitie cover"
          style={{ height: 150, width: 150 }}
        />
      </Box>
      <Typography variant="h6">{cardData.title}</Typography>
    </Paper>
  );
}

export default MasterViewCard;

MasterViewCard.propTypes = {
  cardData: PropTypes.array,
};