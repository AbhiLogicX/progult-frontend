import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, MenuItem, TextField, IconButton, Typography } from '@mui/material';

import { getReq, postReq, deleteReq } from 'src/api/api';

export default function AddActivityDialog({
  handleClose,
  open,
  bussinessId,
  dValue,
  handleReloadVal,
  handleReloadActivityView,
}) {
  // const [fetchedData, setFetchedData] = React.useState(false);
  const [allActivityfetchedData, setAllActivityfetchedData] = React.useState(false);
  const [allActivity, setAllActivity] = React.useState();
  // const [activityData, setActivityData] = React.useState();
  const [arrUpdate, setArrUpdate] = React.useState([]);

  React.useEffect(() => {
    if (!allActivityfetchedData) {
      fetchAllActivity();
    }

    // if (!fetchedData) {
    //   fetchActivityData();
    // }

    async function fetchAllActivity() {
      await getReq(`domain/activity/active`).then((res) => {
        if (res.statusCode === 200) {
          setAllActivity(res.data);
          setAllActivityfetchedData(true);
        }
      });
    }
    // async function fetchActivityData() {
    //   getReq(`bussinessActivity?bussinessId=${bussinessId}`).then((res) => {
    //     if (res.statusCode === 200) {
    //       setActivityData(res.data);
    //       setFetchedData(true);
    //     }
    //   });
    // }
  }, [allActivityfetchedData, bussinessId, dValue]);
  // console.log('arrUpdate', arrUpdate);
  const handleSelect = (e) => {
    // console.log('arrUpdate1', arrUpdate);
    setArrUpdate([e.target.value]);
    // console.log('arrUpdate2', arrUpdate);
  };

  const handleDelete = async (data) => {
    // console.log(data);
    // bussinessActivity?bussActivityId=6613971c15154d65403117aa
    await deleteReq(`bussinessActivity?bussActivityId=${data.id}`).then((res) => {
      if (res.statusCode === 200) {
        handleReloadVal(false);
      }
    });
  };

  const handleDone = () => {
    handleClose();
    handleReloadActivityView(false);
  };

  const handleSave = async () => {
    const data = {
      bussinessId,
      activityId: arrUpdate,
    };
    await postReq(`bussinessActivity`, data).then((res) => {
      if (res.statusCode === 200) {
        handleReloadVal(false);
      }
    });
    // console.log('hello');
  };
  // console.log(allActivity);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Manage Activites</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center">
          <TextField
            label="Select Activity..."
            select
            fullWidth
            margin="dense"
            sx={{ mb: 1, mr: 3 }}
            onChange={handleSelect}
          >
            {allActivity?.map((itm) =>
              dValue?.find((obj) => obj.activityId === itm._id) ? null : (
                <MenuItem key={itm._id} value={itm._id}>
                  {itm.title}
                </MenuItem>
              )
            )}
          </TextField>
          <Box>
            <Button variant="contained" onClick={handleSave}>
              Add
            </Button>
          </Box>
        </Box>
        <hr />
        {allActivity?.map((itm) => (
          <>
            {dValue?.find((obj) => obj.activityId === itm._id) ? (
              <Box
                display="flex"
                alignItems="center"
                mb={1}
                border="1px solid black"
                justifyContent="space-between"
                p={1}
                borderRadius={1}
              >
                <Typography>{itm.title}</Typography>
                <IconButton
                  onClick={() => {
                    handleDelete(
                      dValue?.find((obj) => (obj.activityId === itm._id ? obj.id : null))
                    );
                  }}
                >
                  <DeleteIcon sx={{ color: 'red' }} />
                </IconButton>
              </Box>
            ) : null}
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDone} autoFocus>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddActivityDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  bussinessId: PropTypes.string,
  dValue: PropTypes.array,
  handleReloadVal: PropTypes.func,
  handleReloadActivityView: PropTypes.func,
};
