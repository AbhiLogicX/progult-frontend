import PropTypes from 'prop-types';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Paper, IconButton, Typography } from '@mui/material';

import { primary } from 'src/theme/palette';
import properties from 'src/config/properties';

export default function AddonCards({ data, handleAddonReload }) {
  return (
    <Paper elevation={4} sx={{ p: '1%', mr: 1, backgroundColor: primary.lighter }}>
      <Box display="flex">
        <Box mr={1}>
          <img
            src={`${properties.BASE_ITEM_IMAGE_URL}${data.image}}`}
            style={{ height: 150, width: 150, borderRadius: 25 }}
            alt="Addon Cover"
          />
        </Box>
        <Box>
          <Box>
            <Typography variant="h6" mb={2}>
              {data.title}
            </Typography>
            <Typography>{`Price: ${data.rate}`}</Typography>
            <Typography>{`Stock: ${data.stock}`}</Typography>
            <Typography>{data._id}</Typography>
          </Box>
        </Box>
      </Box>
      <Box textAlign="right">
        <IconButton>
          <EditIcon />
        </IconButton>
      </Box>
    </Paper>
  );
}

AddonCards.propTypes = {
  data: PropTypes.object,
  handleAddonReload: PropTypes.func,
};
