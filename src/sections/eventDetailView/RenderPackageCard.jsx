import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, Paper, Button, Typography } from '@mui/material';

import { deleteReq } from 'src/api/api';
import { grey, error, primary } from 'src/theme/palette';

import { EditPackageForm } from './PackageForm';

export default function PackageCard({ eventId, handleReload, pkgData }) {
  // event/packages?status=delete&Id=66387f8822321c8993f813b5

  const handleDelete = async (passId) => {
    await deleteReq(`event/packages?status=delete&Id=${passId}`).then((res) => {
      if (res.statusCode === 200) {
        handleReload(false);
      }
    });
  };

  // event/packages?eventId=661d35fcbf1b5980b5f1d388

  return (
    <Box>
      <Grid container>
        {pkgData?.map((pkg) => (
          <Grid xs={3}>
            <Paper elevation={4} sx={{ p: 2, backgroundColor: grey[300], mr: 2, mb: 1 }}>
              <Box>
                <Typography variant="h4" color={primary.main}>{`₹ ${pkg.amount}/-`}</Typography>
                <Typography variant="h4">{pkg.title}</Typography>
              </Box>
              <Typography lineHeight={1.3} mb={2}>
                {pkg.description}
              </Typography>
              <Box>
                <Button
                  sx={{
                    color: error.main,
                    bgcolor: 'white',
                    mr: 2,
                    '&:hover': {
                      backgroundColor: error.main,
                      color: error.errorBackground,
                    },
                  }}
                  onClick={() => {
                    handleDelete(pkg._id);
                  }}
                >
                  <DeleteIcon /> Delete
                </Button>
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
  eventId: PropTypes.string,
  handleReload: PropTypes.func,
  pkgData: PropTypes.object,
};
