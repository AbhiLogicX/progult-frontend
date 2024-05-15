import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Alert,
  Dialog,
  Button,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

// import IconButton from '@mui/material/IconButton';

import { deleteReq } from 'src/api/api';
import { grey, error, primary } from 'src/theme/palette';

import BussinessTimeForm from '../dialogueForm/BussinessHourDialog';

export default function TimingCards({ timeData, Id, handleReload }) {
  const [open, setOpen] = useState(false);
  const locationVar = useLocation().pathname.split('/');
  // console.log(locationVar);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // console.log('time', timeData);

  return (
    <Box elevation={3} p={2} component={Paper} mr={2} sx={{ backgroundColor: grey[300] }}>
      <Typography
        fontWeight={700}
        color={grey[800]}
      >{`${timeData.startTime} to ${timeData.endTime}`}</Typography>
      <Typography mb={2} fontWeight={700}>
        {timeData.days.map((itm) => `${itm}, `)}
      </Typography>
      <Box>
        {/* <Button
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
        </Button> */}
        <DeleteDialog
          hourId={timeData._id}
          bussinessId={locationVar[3]}
          title={timeData.title}
          handleReload={handleReload}
        />
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

function DeleteDialog({ hourId, handleReload, ...details }) {
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertVisisble, setAlertVisible] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    // console.log('hello', cupId);
    await deleteReq(`bussiness/slots?bussinessId=${details.bussinessId}&Id=${hourId}`).then(
      (res) => {
        if (res.statusCode === 200) {
          // console.log(res);
          setAlert(true);
          setAlertVisible(true);
          setTimeout(() => {
            setAlert(false);
            setAlertVisible(false);
            handleClose();
            handleReload(false);
          }, 1200);
        } else {
          setAlertVisible(true);
          setErrorMessage(res?.response?.data?.message);
          setTimeout(() => {
            setAlertVisible(false);
          }, 1000);
        }
      }
    );

    // domain/coupon?Id=663b69d2673fd6e8367b4096&status=delete
  };

  return (
    <>
      <Button
        sx={{
          mr: 1,
          color: error.main,
          backgroundColor: error.errorBackground,
          '&:hover': {
            backgroundColor: error.main,
            color: error.errorBackground,
          },
        }}
        onClick={handleClickOpen}
      >
        <DeleteIcon /> Delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete</DialogTitle>
        <DialogContent>
          {`Are you sure You want to Delete ${details.title} bussiness hour ? `}
        </DialogContent>
        <DialogActions>
          {alert ? (
            <>
              {alertVisisble ? (
                <Alert variant="filled" severity="success">
                  {`${details.title} Deleted successfully`}
                </Alert>
              ) : null}
            </>
          ) : null}
          {alert ? null : (
            <>
              {alertVisisble ? (
                <Alert variant="filled" severity="error">
                  {errMessage !== '' ? errMessage : `${details.title} not deleted`}
                </Alert>
              ) : null}
            </>
          )}
          {alertVisisble ? null : (
            <>
              <Button
                onClick={handleClose}
                sx={{
                  color: error.main,
                  backgroundColor: error.errorBackground,
                  '&:hover': {
                    backgroundColor: error.main,
                    color: error.errorBackground,
                  },
                }}
              >
                Disagree
              </Button>
              <Button onClick={handleDelete} autoFocus>
                Agree
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

DeleteDialog.propTypes = {
  hourId: PropTypes.string,
  handleReload: PropTypes.func,
};

TimingCards.propTypes = {
  timeData: PropTypes.object,
  Id: PropTypes.string,
  handleReload: PropTypes.func,
};
