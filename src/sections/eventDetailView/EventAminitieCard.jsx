import PropTypes from 'prop-types';

import { Box, Grid, Paper, Typography } from '@mui/material';

import { warning } from 'src/theme/palette';
import properties from 'src/config/properties';

export function EventAminitieCard({ cardData }) {
  return (
    <Grid xs={2}>
      <Paper
        elevation={3}
        sx={{ p: '1%', backgroundColor: warning.lighter, color: warning.main, mr: 1 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box>
            {/* <Image sx={{ height: 125, width: 100 }} /> */}
            <image
              src={`${properties.BASE_IMAGE_URL}${cardData.image}`}
              alt="Aminitie Image"
              style={{ width: 125, height: 100 }}
            />
          </Box>
          <Box>
            <Typography variant="h6" mb={0.5}>
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
