import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Box, Typography } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { getReq } from 'src/api/api';

export default function AddActivityDialog({ handleClose, open, bussinessId }) {
  const [fetchedData, setFetchedData] = React.useState(false);
  const [allActivityfetchedData, setAllActivityfetchedData] = React.useState(false);
  const [allActivity, setAllActivity] = React.useState();
  const [activityData, setActivityData] = React.useState();
  //   const [arrUpdate, setArrUpdate] = React.useState();

  React.useEffect(() => {
    if (!allActivityfetchedData) {
      fetchAllActivity();
    }
    if (!fetchedData) {
      fetchActivityData();
    }

    async function fetchAllActivity() {
      await getReq(`domain/activity/active`).then((res) => {
        if (res.statusCode === 200) {
          setAllActivity(res.data);
          setAllActivityfetchedData(true);
        }
      });
    }
    async function fetchActivityData() {
      getReq(`bussinessActivity?bussinessId=${bussinessId}`).then((res) => {
        if (res.statusCode === 200) {
          setActivityData(res.data);
          setFetchedData(true);
          // console.log(res);
        }
      });
    }
  }, [fetchedData, allActivityfetchedData, bussinessId, activityData]);

  //   const handleCheck = (e) => {
  //     const { value, checked } = e.target;
  //     if (checked) {
  //       setArrUpdate((prevState) => [...prevState, value]);
  //     } else {
  //       setArrUpdate((prevState) => prevState.filter((item) => item !== value));
  //     }
  //     console.log(arrUpdate);
  //   };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Manage Activites</DialogTitle>
      <DialogContent>
        {allActivity?.map((itm) => (
          <>
            {activityData?.find((obj) => obj.activityId._id === itm._id) ? (
              <Box display="flex" mb={1}>
                <input name={itm.title} defaultChecked type="checkbox" value={itm._id} />
                <Typography>{itm.title}</Typography>
              </Box>
            ) : (
              <Box display="flex" mb={1}>
                <input name={itm.title} type="checkbox" value={itm._id} />
                <Typography>{itm.title}</Typography>
              </Box>
            )}
          </>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose} autoFocus>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddActivityDialog.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  bussinessId: PropTypes.string,
};
