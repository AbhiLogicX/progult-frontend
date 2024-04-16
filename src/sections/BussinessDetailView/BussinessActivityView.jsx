import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button, Typography } from '@mui/material';

import properties from 'src/config/properties';

import BussinessActivityDialog from 'src/components/dialogueForm/BussinessActivityDialog';

import { mockDataActivity } from './mockData';

export function BussinessActivityView() {
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
        elevat
        ion={4}
        sx={{ p: '2%', display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 2 }}
      >
        <Box>
          <img
            src={`${properties.BASE_DOMAIN_IMAGE_URL}${crdData.activityId.image}`}
            alt="activity cover"
            style={{ height: 150, width: 150 }}
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

// BussinessActivityView.propTypes = {
//   bussinessId: PropTypes.string,
// };

RenderCard.propTypes = {
  crdData: PropTypes.object,
};
