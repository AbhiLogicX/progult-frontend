import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

import BussinessTimeForm from '../dialogueForm/BussinessHourDialog';

export default function TimingCards({ timeData }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    // if (result.statusCode === 200) {
    //   handleClose();
    //   handleReload(false);
    // }
    setOpen(false);
  };

  return (
    <Box elevation={3} p={2} component={Paper} mr={2} sx={{ backgroundColor: 'whitesmoke' }}>
      <Typography>{`${timeData.startTime} to ${timeData.endTime}`}</Typography>
      <Typography mb={1}>{timeData.days.map((itm) => `${itm} `)}</Typography>
      <Box textAlign="right">
        <IconButton variant="contained" onClick={handleClickOpen}>
          <EditIcon />
        </IconButton>
      </Box>
      <BussinessTimeForm
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        fromCall="Edit Timings"
        timeData={timeData}
      />
    </Box>
  );
}

TimingCards.propTypes = {
  timeData: PropTypes.object,
};
