import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Grid, Paper, IconButton, Typography, Button } from '@mui/material';

import { deleteReq, getReq } from 'src/api/api';
import { error, grey, primary } from 'src/theme/palette';

import { EditPackageForm } from './PackageForm';

export default function PackageCard({ packagesData, eventId, handleReload }) {
  const [fetchedData, setFetchedData] = useState(false);
  const [pkageData, setPkageData] = useState();

  useEffect(() => {
    if (!fetchedData) {
      fetchPkgData();
    }
    async function fetchPkgData() {
      await getReq(`event/packages?eventId=${eventId}`).then((res) => {
        if (res.statusCode === 200) {
          setFetchedData(true);
          setPkageData(res.data);
        }
      });
    }
  });

  const handleDelete = async (passId) => {
    await deleteReq(`event/packages?eventId=${eventId}&Id=${passId}`).then((res) => {
      if (res.statusCode === 200) {
        handleReload(false);
      }
    });
  };

  // event/packages?eventId=661d35fcbf1b5980b5f1d388

  return (
    <Box>
      <Grid container>
        {pkageData?.map((pkg) => (
          <Grid xs={3}>
            <Paper elevation={4} sx={{ p: 2, backgroundColor: grey[300], mr: 2, mb: 1 }}>
              <Box>
                <Typography variant="h4" color={primary.main}>{`₹ ${pkg.amount}/-`}</Typography>
                <Typography variant="h4">{pkg.title}</Typography>
              </Box>
              <Typography mb={1}>{pkg.description}</Typography>
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
  packagesData: PropTypes.array,
  eventId: PropTypes.string,
  handleReload: PropTypes.func,
};
