import PropTypes from 'prop-types';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, Paper, IconButton, Typography } from '@mui/material';

import { deleteReq } from 'src/api/api';
import { primary } from 'src/theme/palette';

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
      <Grid container>
        {packagesData?.map((pkg) => (
          <Grid xs={4}>
            <Paper elevation={4} sx={{ p: 2, backgroundColor: 'whitesmoke', mr: 2, mb: 1 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="h4">{pkg.title}</Typography>
                <Typography variant="h4" color={primary.main}>{`₹ ${pkg.amount}/-`}</Typography>
              </Box>
              <Typography>{pkg.description}</Typography>
              <Box textAlign="right">
                <EditPackageForm eventId={eventId} handleReload={handleReload} dValues={pkg} />
                <IconButton
                  color="error"
                  onClick={() => {
                    handleDelete(pkg._id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
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
