import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Image } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

function MasterViewCard({ cardData }) {
  return (
    <Paper
      elevation={3}
      sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 1 }}
    >
      <Box>
        <Image
          src="/assets/images/images(1).png"
          alt="Image is rendering"
          sx={{ height: 150, width: 150 }}
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
