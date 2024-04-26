import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

// import DialogContentText from '@mui/material/DialogContentText';

export default function BussinessTimeForm({ open, handleClose, handleSubmit, fromCall, timeData }) {
  // console.log(format(new Date(`2024-04-26 ${timeData?.startTime || ''}`), 'H:m:s'));

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{fromCall}</DialogTitle>
      <DialogContent>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box mb={2}>
            <FormControlLabel value="Mon" control={<Checkbox />} label="Mon" labelPlacement="top" />
            <FormControlLabel value="Mon" control={<Checkbox />} label="Mon" labelPlacement="top" />
            <FormControlLabel value="Mon" control={<Checkbox />} label="Mon" labelPlacement="top" />
            <FormControlLabel value="Mon" control={<Checkbox />} label="Mon" labelPlacement="top" />
            <FormControlLabel value="Mon" control={<Checkbox />} label="Mon" labelPlacement="top" />
            <FormControlLabel value="Mon" control={<Checkbox />} label="Mon" labelPlacement="top" />
            <FormControlLabel value="Mon" control={<Checkbox />} label="Mon" labelPlacement="top" />
          </Box>
          <Box display="flex" mr={1}>
            <Box mr={2}>
              <Typography mr={1}>Start Time</Typography>
              <TextField id="outlined-basic" variant="outlined" type="time" />
            </Box>
            <Box>
              <Typography mr={1}>End Time</Typography>
              <TextField id="outlined-basic" variant="outlined" type="time" />
            </Box>
          </Box>
          <Box textAlign="right">
            <Button color="error">Delete slot</Button>
          </Box>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancle
        </Button>
        <Button variant="contained" onClick={handleSubmit} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

BussinessTimeForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  handleSubmit: PropTypes.func,
  fromCall: PropTypes.string,
  timeData: PropTypes.object,
};
