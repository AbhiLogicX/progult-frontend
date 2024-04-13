import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Typography } from '@mui/material';
import { Image } from '@mui/icons-material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import TimingCards from '../cards/TimingSlotCard';
// import DialogContentText from '@mui/material/DialogContentText';

export default function BussinessActivityDialog({
  openDialog,
  handleClose,
  handleSubmit,
  dialogData,
}) {
  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Box>Edit Bussiness Activity</Box>
        <Button color="error" variant="contained">
          Delete Bussiness
        </Button>
      </DialogTitle>
      <DialogContent>
        <Box width={500}>
          <Box>
            <Box display="flex" mb={2}>
              <Paper elevation={3} sx={{ textAlign: 'center', mr: 2 }}>
                <Image sx={{ width: 150, height: 150 }} />
              </Paper>
              <Box>
                <Box>
                  <Typography variant="h4">{dialogData.activityId.title}</Typography>
                </Box>
                <Box>
                  <Typography>{dialogData.status}</Typography>
                </Box>
              </Box>
            </Box>
            <Box>
              {dialogData.slots.map((itm) => (
                <Box mb={1}>
                  <TimingCards timeData={itm} />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BussinessActivityDialog.propTypes = {
  openDialog: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  dialogData: PropTypes.object,
};
