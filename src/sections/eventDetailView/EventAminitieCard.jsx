import PropTypes from 'prop-types';

import { Box, Grid, Paper, Typography } from '@mui/material';

import { primary } from 'src/theme/palette';
import properties from 'src/config/properties';

export function EventAminitieCard({ cardData }) {
  return (
    <Grid xs={3}>
      <Paper elevation={3} sx={{ p: '2%', backgroundColor: 'whitesmoke', mr: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box mr={1.5}>
            {/* <img sx={{ height: 125, width: 100 }} /> */}
            <img
              src={`${properties.BASE_DOMAIN_IMAGE_URL}${cardData.image}`}
              alt="Aminitie Cover"
              style={{ width: 125, height: 125, borderRadius: 25 }}
            />
          </Box>
          <Box>
            <Typography variant="h6" mb={0.5} color={primary.main}>
              {cardData.title}
            </Typography>
          </Box>
        </Box>
        <Box px={1}>
          <Typography variant="h6">{cardData.description}</Typography>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          {/* <IconButton onClick={handleDialogOpen}>
            <EditIcon />
          </IconButton> */}
        </Box>
      </Paper>
    </Grid>
  );
}

EventAminitieCard.propTypes = {
  cardData: PropTypes.object,
};
