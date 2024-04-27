import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import IconButton from '@mui/material/IconButton';

import { grey, error, primary } from 'src/theme/palette';

import BussinessTimeForm from '../dialogueForm/BussinessHourDialog';

export default function TimingCards({ timeData, Id, handleReload }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {};

  return (
    <Box elevation={3} p={2} component={Paper} mr={2} sx={{ backgroundColor: grey[300] }}>
      <Typography
        fontWeight={700}
        color={grey[800]}
      >{`${timeData.startTime} to ${timeData.endTime}`}</Typography>
      <Typography mb={2} fontWeight={700}>
        {timeData.days.map((itm) => `${itm} `)}
      </Typography>
      <Box>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'white',
            color: grey[400],
            width: '45%',
            mr: 1,
            '&:hover': {
              backgroundColor: error.main,
              color: error.errorBackground,
            },
          }}
          onClick={handleDelete}
        >
          <DeleteIcon /> Delete
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'white',
            color: primary.main,
            width: '45%',
            '&:hover': {
              backgroundColor: primary.main,
              color: 'white',
            },
          }}
          onClick={handleClickOpen}
        >
          <EditIcon /> Edit
        </Button>
      </Box>
      <BussinessTimeForm
        open={open}
        handleClose={handleClose}
        fromCall="Edit Timings"
        timeData={timeData}
        Id={Id}
        handleReload={handleReload}
      />
    </Box>
  );
}

TimingCards.propTypes = {
  timeData: PropTypes.object,
  Id: PropTypes.string,
  handleReload: PropTypes.func,
};
