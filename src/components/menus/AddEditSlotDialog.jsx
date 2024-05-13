import { useState } from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';

import { postReq, patchReq } from 'src/api/api';
import { error, primary } from 'src/theme/palette';

// import DialogContentText from '@mui/material/DialogContentText';

export default function BussActivityTimeForm({ fromCall, timeData, handleReload, ...details }) {
  // console.log(     (new Date(`2024-04-26 ${timeData?.startTime || ''}`), 'H:m:s'));
  const [open, setOpen] = useState();
  const [weekDays, setWeekDays] = useState(timeData?.days ? timeData?.days : []);
  const [endTime, setEndTime] = useState(timeData?.endTime);
  const [startTime, setStartTime] = useState(timeData?.startTime);
  const [fromDate, setFromDate] = useState(timeData?.fromdate);
  const [toDate, setToDate] = useState(timeData?.todate);
  const [title, setTitle] = useState(timeData?.title);
  const [maxseat, setMaxseat] = useState(timeData?.maxseat);
  const [rate, setRate] = useState(timeData?.rate);
  // const [timings, setTimings] = useState({
  //   startTime: timeData?.startTime,
  //   endTime: timeData?.endTime,
  // });
  // console.log('the week days', timings);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const allWeekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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
  const handleDate = (e) => {
    const { name, value } = e.target;

    if (name === 'fromdate') {
      setFromDate(value);
    }
    if (name === 'todate') {
      setToDate(value);
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

  const handleMaxseat = (e) => {
    setMaxseat(e.target.value);
  };
  async function handleSubmit(event) {
    event.preventDefault();
    // Send formData to server
    const data = {
      days: weekDays,
      startTime,
      endTime,
      title,
      fromdate: fromDate,
      todate: toDate,
      maxseat,
      rate,
    };
    if (fromCall === 'add') {
      data.bussActivityId = details.bussActivityId;
      await postReq('bussinessActivity/slots', data).then((res) => {
        if (res.statuCode === 200) {
          //   console.log(res);
        }
      });
      // console.log(startTime, endTime, weekDays);
      handleClose();
      handleReload(false);
    }
    if (fromCall === 'edit') {
      data.Id = timeData._id;
      await patchReq('bussinessActivity/slots', data).then((res) => {
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
    <>
      {fromCall === 'edit' ? (
        <Button
          onClick={handleOpen}
          sx={{
            backgroundColor: error.errorBackground,
            color: primary.main,
            '&:hover': {
              backgroundColor: primary.main,
              color: 'white',
            },
          }}
        >
          <EditIcon />
          {fromCall === 'edit' ? 'Edit Slot' : 'Add Slot'}
        </Button>
      ) : (
        <Button onClick={handleOpen} variant="contained">
          {fromCall === 'edit' ? 'Edit Slot' : 'Add Slot'}
        </Button>
      )}
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {fromCall === 'edit' ? 'Edit Slot' : 'Add Slot'}
        </DialogTitle>
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
              <Box display="flex" mr={1}>
                <Box mr={2}>
                  <Typography mr={1}>From:</Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="date"
                    name="fromdate"
                    defaultValue={
                      fromCall === 'edit' ? format(new Date(fromDate), 'yyyy-MM-dd') : null
                    }
                    onChange={handleDate}
                  />
                </Box>
                <Box>
                  <Typography mr={1}>To:</Typography>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="date"
                    name="todate"
                    defaultValue={
                      fromCall === 'edit' ? format(new Date(toDate), 'yyyy-MM-dd') : null
                    }
                    onChange={handleDate}
                  />
                </Box>
              </Box>
              <TextField
                onChange={handleMaxseat}
                name="Max Seats"
                type="number"
                label="Max Seats"
                defaultValue={maxseat}
                sx={{ mt: 2, mr: 1 }}
              />
              <TextField
                onChange={(e) => {
                  setRate(e.target.value);
                }}
                type="number"
                name="Price"
                label="Price"
                defaultValue={rate}
                sx={{ mt: 2 }}
              />
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
    </>
  );
}

BussActivityTimeForm.propTypes = {
  fromCall: PropTypes.string,
  timeData: PropTypes.object,
  handleReload: PropTypes.func,
};
