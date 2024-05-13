import { useState } from 'react';
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

import { postReq, patchReq } from 'src/api/api';

// import DialogContentText from '@mui/material/DialogContentText';

export default function BussinessTimeForm({
  open,
  handleClose,
  fromCall,
  timeData,
  Id,
  handleReload,
}) {
  // console.log(     (new Date(`2024-04-26 ${timeData?.startTime || ''}`), 'H:m:s'));
  const [weekDays, setWeekDays] = useState(timeData?.days ? timeData?.days : []);
  const [endTime, setEndTime] = useState(timeData?.endTime);
  const [startTime, setStartTime] = useState(timeData?.startTime);
  const [title, setTitle] = useState(timeData?.title);
  // const [timings, setTimings] = useState({
  //   startTime: timeData?.startTime,
  //   endTime: timeData?.endTime,
  // });
  // console.log('the week days', timings);

  const allWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  // console.log(timeData);
  function convertTime(timeStr) {
    if (!timeStr) {
      return '';
    }
    const [time, modifier] = timeStr.split(' ');
    const splitHour = time.split(':');
    let hours = splitHour[0];

    if (hours === '12') {
      hours = '00';
    }
    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${splitHour[1]}`;
  }

  function changeTimeFormat12(time) {
    // Check whether AM or PM
    const splitTime = time.split(':');

    const newformat = splitTime[0] >= 12 ? 'PM' : 'AM';

    // Find current hour in AM-PM Format
    let hours = splitTime[0] % 12;

    // To display "0" as "12"
    if (!hours) {
      hours = 12;
    }
    const minutes = splitTime[1] < 10 ? splitTime[1] : splitTime[1];

    return `${hours}:${minutes} ${newformat}`;
  }

  const handleTime = (e) => {
    const { name, value } = e.target;

    if (name === 'startTime') {
      setStartTime(changeTimeFormat12(value));
    }
    if (name === 'endTime') {
      setEndTime(changeTimeFormat12(value));
    }
  };

  const handleTitleChange = (e) => {
    const { value } = e.target;
    setTitle(value);
  };

  const handleCheck = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setWeekDays((prevState) => [...prevState, value]);
    } else {
      setWeekDays((prevState) => prevState.filter((item) => item !== value));
    }
    // console.log(weekDays);
  };

  async function handleSubmit(event) {
    event.preventDefault();
    // Send formData to server
    const data = {
      bussinessId: Id,
      Id: timeData._id,
      days: weekDays,
      startTime,
      endTime,
      title,
    };
    if (fromCall === 'Add Timings') {
      await postReq('bussiness/slots', data).then((res) => {
        if (res.statuCode === 200) {
          // console.log(res);
        }
      });
      // console.log(startTime, endTime, weekDays);
      handleClose();
      handleReload(false);
    } else {
      await patchReq('bussiness/slots', data).then((res) => {
        if (res.statuCode === 200) {
          // console.log(res);
        }
      });
      // console.log(startTime, endTime, weekDays);
      handleClose();
      handleReload(false);
    }
  }

  // console.log(timeData, Id);
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{fromCall}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box mb={1}>
            <TextField
              label="Title"
              name="title"
              fullWidth
              defaultValue={timeData?.title}
              onChange={handleTitleChange}
            />
          </Box>

          <Paper elevation={3} sx={{ p: 2 }}>
            <Box mb={2}>
              {allWeekDays.map((day) => (
                <>
                  {weekDays?.find((chkDays) => chkDays === day) ? (
                    <FormControlLabel
                      value={day}
                      control={<Checkbox defaultChecked />}
                      label={day}
                      labelPlacement="top"
                      onChange={handleCheck}
                    />
                  ) : (
                    <FormControlLabel
                      value={day}
                      control={<Checkbox />}
                      label={day}
                      labelPlacement="top"
                      onChange={handleCheck}
                    />
                  )}
                </>
              ))}
            </Box>
            <Box display="flex" mr={1}>
              <Box mr={2}>
                <Typography mr={1}>Start Time</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="time"
                  name="startTime"
                  defaultValue={convertTime(timeData?.startTime)}
                  onChange={handleTime}
                />
              </Box>
              <Box>
                <Typography mr={1}>End Time</Typography>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  type="time"
                  name="endTime"
                  defaultValue={convertTime(timeData?.endTime)}
                  onChange={handleTime}
                />
              </Box>
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="contained" type="submit" autoFocus>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

BussinessTimeForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  fromCall: PropTypes.string,
  timeData: PropTypes.object,
  Id: PropTypes.string,
  handleReload: PropTypes.func,
};
