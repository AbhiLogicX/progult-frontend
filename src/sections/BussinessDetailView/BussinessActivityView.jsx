import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Image } from '@mui/icons-material';
import { Button, Typography } from '@mui/material';

import { getReq } from 'src/api/api';

import BussinessActivityDialog from 'src/components/dialogueForm/BussinessActivityDialog';

import { mockDataActivity } from './mockData';

export function BussinessActivityView({ bussinessId }) {
  const [activityData, setActivityData] = useState();
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    if (!fetchedData) {
      fetchIdData();
    }
  });

  async function fetchIdData() {
    await getReq(`bussinessActivity?bussinessId=${bussinessId}`).then((res) => {
      setActivityData(res);
      setFetchedData(true);
    });
  }

  console.log(activityData);
  return (
    <Grid container>
      {mockDataActivity.data.map((itm) => (
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
          <Image
            src="/assets/images/images(1).png"
            alt="Image is rendering"
            sx={{ height: 150, width: 150 }}
          />
        </Box>
        <Typography variant="h6">{crdData.activityId.title}</Typography>
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

BussinessActivityView.propTypes = {
  bussinessId: PropTypes.string,
};

RenderCard.propTypes = {
  crdData: PropTypes.object,
};
