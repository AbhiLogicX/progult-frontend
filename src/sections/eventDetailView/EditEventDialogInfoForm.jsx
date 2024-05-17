import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import {
  Box,
  Alert,
  Button,
  Dialog,
  MenuItem,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { convertTime24, changeTimeFormat12 } from 'src/utils/format-time';

import { getReq, postReq, patchReq } from 'src/api/api';

export default function EventInfoDialogForm({
  openDialog,
  handleClose,
  dValues,
  handleReload,
  fromCall,
}) {
  const { register, handleSubmit } = useForm({});
  const [alert, setAlert] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [bussList, setBussList] = useState();
  const [alertVisisble, setAlertVisible] = useState(false);
  // const [errMessage, setErrorMessage] = useState('');

  const localVar = JSON.parse(localStorage.getItem('items'));
  // console.log(localVar);

  const activeStatusList = [
    {
      value: 'active',
      lable: 'active',
    },
    {
      value: 'in-active',
      lable: 'in-active',
    },
    {
      value: 'delete',
      lable: 'delete',
    },
  ];
  const rejectStatusList = [
    {
      value: 'reject',
      lable: 'reject',
    },
    {
      value: 'pending',
      lable: 'pending',
    },
    {
      value: 'delete',
      lable: 'delete',
    },
  ];
  const pendingStausList = [
    {
      value: 'pending',
      lable: 'pending',
    },
    {
      value: 'active',
      lable: 'active',
    },
    {
      value: 'reject',
      lable: 'reject',
    },
  ];
  const inActiveStausList = [
    {
      value: 'in-active',
      lable: 'in-active',
    },
    {
      value: 'active',
      lable: 'active',
    },
    {
      value: 'delete',
      lable: 'delete',
    },
  ];

  useEffect(() => {
    if (!fetchedData) {
      fetchBussinessList();
    }
    async function fetchBussinessList() {
      await getReq(`bussiness/list?vendorId=${localVar._id}`).then((res) => {
        if (res.statusCode === 200) {
          // console.log(res);
          setFetchedData(true);
          setBussList(res.data);
        }
      });
    }
  });

  async function onSubmit(data) {
    const check = {
      details: false,
      status: false,
    };

    if (fromCall !== 'add') {
      data.Id = dValues._id;
      data.bussinessId = dValues.bussinessId._id;
      data.startTime = changeTimeFormat12(data.startTime);
      data.endTime = changeTimeFormat12(data.endTime);
      await patchReq(`event`, data).then((res) => {
        if (res.statusCode === 200) {
          check.details = true;
        }
      });
      // console.log('submited', data);

      await patchReq(`event/detail?Id=${dValues._id}&status=${data.status}`).then((res) => {
        if (res.statusCode === 200) {
          check.status = true;
        }
      });
      if (check.status && check.details) {
        setAlert(true);
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          setAlert(false);
          handleClose();
          handleReload(false);
        }, 1500);
      } else {
        setAlert(true);
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          setAlert(false);
        }, 1500);
      }
    }

    if (fromCall !== 'edit') {
      // console.log('add call');
      data.startTime = changeTimeFormat12(data.startTime);
      data.endTime = changeTimeFormat12(data.endTime);
      await postReq(`event`, data).then((res) => {
        if (res.statusCode === 200) {
          setAlert(true);
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
            setAlert(false);
            handleClose();
            handleReload(false);
          }, 1500);
        } else {
          setAlert(true);
          setAlertVisible(true);
          setTimeout(() => {
            setAlertVisible(false);
            setAlert(false);
          }, 1500);
        }
      });
      // console.log('submited', data);

      // if (check.status && check.details) {
      //   setAlert(true);
      //   setAlertVisible(true);
      //   setTimeout(() => {
      //     setAlertVisible(false);
      //     setAlert(false);
      //     handleClose();
      //     handleReload(false);
      //   }, 1500);
      // } else {
      //   setAlert(true);
      //   setAlertVisible(true);
      //   setTimeout(() => {
      //     setAlertVisible(false);
      //     setAlert(false);
      //   }, 1500);
      // }
    }
  }
  // console.log(dValues);
  // const startDate =

  // console.log(startDate);

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      {alert ? (
        <>
          {alertVisisble ? (
            <Alert variant="filled" severity="success">
              {fromCall === 'edit' ? 'Event Details are updated' : 'Event added'}
            </Alert>
          ) : null}
        </>
      ) : null}
      {alert ? null : (
        <>
          {alertVisisble ? (
            <Alert variant="filled" severity="error">
              Event Details are not updated
            </Alert>
          ) : null}
        </>
      )}
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        {fromCall !== 'add' ? 'Edit Info' : 'Add Event'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            type="text"
            name="title"
            label="Title"
            defaultValue={dValues?.title}
            {...register('title')}
            fullWidth
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            type="text"
            name="hostName"
            label="HostName"
            {...register('hostName')}
            fullWidth
            defaultValue={dValues?.hostName}
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            type="text"
            name="description"
            label="Description"
            {...register('description')}
            defaultValue={dValues?.description}
            fullWidth
            sx={{ mr: 1, mb: 1 }}
          />

          {dValues?.status ? (
            <Box display="flex" mr={1} alignItems="center">
              <Box mb={1} mr={1}>
                <Typography>Status</Typography>
                {dValues?.status === 'active' ? (
                  <TextField select defaultValue="active" {...register('status')} name="status">
                    {activeStatusList.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.lable}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
                {dValues?.status === 'pending' ? (
                  <TextField select defaultValue="pending" {...register('status')} name="status">
                    {pendingStausList.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.lable}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
                {dValues?.status === 'reject' ? (
                  <TextField select defaultValue="reject" {...register('status')} name="status">
                    {rejectStatusList.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.lable}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
                {dValues?.status === 'in-active' ? (
                  <TextField select defaultValue="in-active" {...register('status')} name="status">
                    {inActiveStausList.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.lable}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
              </Box>
            </Box>
          ) : null}

          <Box display="flex">
            <Box>
              <Typography>Start Date</Typography>
              <TextField
                type="date"
                name="startDate"
                {...register('startDate')}
                sx={{ mr: 1, mb: 1 }}
                defaultValue={
                  dValues?.dateTime?.startDate
                    ? format(new Date(dValues.dateTime.startDate), 'yyyy-MM-dd')
                    : null
                }
              />
            </Box>
            <Box>
              <Typography>End Date</Typography>
              <TextField
                type="date"
                name="endDate"
                {...register('endDate')}
                sx={{ mr: 1, mb: 1 }}
                defaultValue={
                  dValues?.dateTime?.startDate
                    ? format(new Date(dValues.dateTime.endDate), 'yyyy-MM-dd')
                    : null
                }
              />
            </Box>
          </Box>

          <Box>
            {fromCall === 'add' ? (
              <TextField
                select
                label="Select Bussiness"
                {...register('bussiness')}
                name="bussiness"
                sx={{ width: '50%' }}
                margin="dense"
              >
                {bussList?.map((opt) => (
                  <MenuItem key={opt._id} value={opt._id}>
                    {opt.title}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}
          </Box>
          <Box display="flex">
            <Box>
              <Typography>Start Time</Typography>
              <TextField
                type="time"
                name="endDate"
                {...register('startTime')}
                sx={{ mr: 1, mb: 1 }}
                defaultValue={convertTime24(dValues?.dateTime?.startTime)}
              />
            </Box>
            <Box>
              <Typography>End Time</Typography>
              <TextField
                type="time"
                name="endDate"
                {...register('endTime')}
                sx={{ mr: 1, mb: 1 }}
                defaultValue={convertTime24(dValues?.dateTime?.endTime)}
              />
            </Box>
          </Box>
          <TextField
            type="text"
            name="street"
            label="Street"
            defaultValue={dValues?.address?.street}
            {...register('street')}
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            type="text"
            name="area"
            label="Area"
            defaultValue={dValues?.address?.area}
            {...register('area')}
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            type="text"
            name="city"
            label="City"
            defaultValue={dValues?.address?.city}
            sx={{ mr: 1, mb: 1 }}
            {...register('city')}
          />
          <TextField
            type="text"
            name="state"
            label="State"
            defaultValue={dValues?.address?.state}
            sx={{ mr: 1, mb: 1 }}
            {...register('state')}
          />
          <TextField
            name="pincode"
            label="Pincode"
            defaultValue={dValues?.address?.pincode}
            sx={{ mr: 1, mb: 1 }}
            {...register('pincode')}
          />
          <TextField
            type="text"
            name="fullAddress"
            label="Full Address"
            defaultValue={dValues?.address?.fullAddress}
            sx={{ mr: 1, mb: 1, width: '100%' }}
            {...register('fullAddress')}
          />
        </DialogContent>
        <DialogActions>
          {alertVisisble ? null : (
            <>
              <Button color="error" onClick={handleClose}>
                Cancle
              </Button>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
}

EventInfoDialogForm.propTypes = {
  openDialog: PropTypes.string,
  handleClose: PropTypes.func,
  dValues: PropTypes.object,
  handleReload: PropTypes.func,
  fromCall: PropTypes.string,
};
