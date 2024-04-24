import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';

import { getReq } from 'src/api/api';
import properties from 'src/config/properties';

import BussinessActivityDialog from 'src/components/dialogueForm/BussinessActivityDialog';

//  bussinessActivity?bussinessId=66069bfe7f083dba90191320

export function BussinessActivityView({ bussinessId }) {
  const [dataFetched, setDataFetched] = useState(false);
  const [activityData, setActivityData] = useState();

  useEffect(() => {
    if (!dataFetched) {
      fetchActivites();
    }
    async function fetchActivites() {
      getReq(`bussinessActivity?bussinessId=${bussinessId}`).then((res) => {
        if (res.statusCode === 200) {
          setActivityData(res.data);
          setDataFetched(true);
          console.log(res);
        }
      });
    }
  });
  return (
    <Grid container>
      {activityData?.map((itm) => (
        <RenderCard crdData={itm} />
      ))}
    </Grid>
  );
}

function RenderCard({ crdData }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSumit = () => {
    setOpen(false);
  };

  return (
    <Grid xs={2}>
      <Paper
        elevation={4}
        sx={{ p: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}
      >
        <Box>
          <img
            src={`${properties.BASE_DOMAIN_IMAGE_URL}${crdData?.activityId.image}`}
            alt="activity cover"
            style={{ aspectRatio: 4 / 3, width: '100%', borderRadius: 15 }}
          />
        </Box>
        <Typography variant="h6">{crdData?.activityId.title}</Typography>
        <Button onClick={handleClickOpen} variant="contained" sx={{ width: '100%' }}>
          Edit
        </Button>
        <BussinessActivityDialog
          openDialog={open}
          handleClose={handleClose}
          handleSubmit={handleSumit}
          dialogData={crdData}
        />
      </Paper>
    </Grid>
  );
}

// BussinessActivityView.propTypes = {
//   bussinessId: PropTypes.string,
// };

BussinessActivityView.propTypes = {
  bussinessId: PropTypes.string,
};

RenderCard.propTypes = {
  crdData: PropTypes.object,
};
