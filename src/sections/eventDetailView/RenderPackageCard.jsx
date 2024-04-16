import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, Paper, IconButton, Typography } from '@mui/material';

import { deleteReq } from 'src/api/api';
import { grey, warning } from 'src/theme/palette';

import { EditPackageForm } from './PackageForm';

export default function PackageCard({ packagesData, eventId, handleReload }) {
  const handleDelete = async (passId) => {
    await deleteReq(`event/packages?eventId=${eventId}&Id=${passId}`).then((res) => {
      if (res.statusCode === 200) {
        handleReload(false);
      }
    });
  };

  return (
    <Box>
      <Grid container spacing={0}>
        {packagesData?.map((pkg) => (
          <Grid xs={4}>
            <Paper elevation={4} sx={{ p: '1%', backgroundColor: grey[300], mr: 1, mb: 1 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">{pkg.title}</Typography>
                <Typography variant="h4" color={warning.main}>{`₹ ${pkg.amount}/-`}</Typography>
              </Box>
              <Typography>{pkg.description}</Typography>
              <Box>
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDelete(pkg._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
                <EditPackageForm eventId={eventId} handleReload={handleReload} dValues={pkg} />
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

PackageCard.propTypes = {
  packagesData: PropTypes.array,
  eventId: PropTypes.string,
  handleReload: PropTypes.func,
};
