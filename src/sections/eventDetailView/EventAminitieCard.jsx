import PropTypes from 'prop-types';

import { Box, Grid, Paper, Button, Typography } from '@mui/material';

import { error, primary } from 'src/theme/palette';
import properties from 'src/config/properties';

export function EventAminitieCard({ cardData }) {
  return (
    <Grid xs={4}>
      <Paper elevation={3} sx={{ p: '2%', backgroundColor: 'whitesmoke', mr: 2 }}>
        <Box textAlign="center">
          <Box p="2%">
            {/* <img sx={{ height: 125, width: 100 }} /> */}
            <img
              src={`${properties.BASE_DOMAIN_IMAGE_URL}${cardData.image}`}
              alt="Aminitie Cover"
              style={{ width: '100%', aspectRatio: 4 / 3, borderRadius: 10 }}
            />
          </Box>
          <Box>
            <Typography variant="h6" mb={0.5}>
              {cardData.title}
            </Typography>
          </Box>
          <Box>
            <Button
              fullWidth
              sx={{
                color: error.main,
                bgcolor: 'white',
                '&:hover': {
                  backgroundColor: error.main,
                  color: error.errorBackground,
                },
              }}
            >
              Remove
            </Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
}

EventAminitieCard.propTypes = {
  cardData: PropTypes.object,
};
