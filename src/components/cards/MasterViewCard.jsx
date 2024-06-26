import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import properties from 'src/config/properties';
import { grey, error } from 'src/theme/palette';

function MasterViewCard({ cardData }) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 1,
        textAlign: 'center',
        mr: 1,
        bgcolor: grey[300],
      }}
    >
      <Box mb={1}>
        <img
          src={`${properties.BASE_DOMAIN_IMAGE_URL}${cardData.image}`}
          alt="aminitie cover"
          style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 15 }}
        />
      </Box>
      <Typography textAlign="center" mb={1} lineHeight={1} fontWeight={700}>
        {cardData.title}
      </Typography>
      <Button
        sx={{
          color: error.main,
          bgcolor: 'white',
          '&:hover': {
            backgroundColor: error.main,
            color: error.errorBackground,
          },
        }}
        fullWidth
      >
        Remove
      </Button>
    </Paper>
  );
}

export default MasterViewCard;

MasterViewCard.propTypes = {
  cardData: PropTypes.array,
};
