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

import { getReq, postReq, patchReq } from 'src/api/api';

export default function ContactInfoDialog({ open, handleClose, fData, handleReload, fromCall }) {
  const { register, handleSubmit } = useForm({});
  const [alert, setAlert] = useState(false);
  const [alertVisisble, setAlertVisible] = useState(false);
  const [errMessage, setErrorMessage] = useState('');
  const [fetchedData, setFetchedData] = useState(false);
  const [categoryList, setCategoryList] = useState();

  // const

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
      fetchCategoryList();
    }
    async function fetchCategoryList() {
      await getReq(`domain/category`).then((res) => {
        if (res.statusCode === 200) {
          setFetchedData(true);
          setCategoryList(res.data);
        }
      });
    }
  });

  const onSubmit = async (data) => {
    // console.log('hello');
    const check = {
      status: false,
      details: false,
    };

    if (fromCall === 'edit') {
      data.Id = fData._id;
      data.category = fData.domain[0]._id;
      await patchReq(`bussiness`, data).then((res) => {
        if (res.statusCode === 200) {
          check.details = true;
        }
      });

      await patchReq(`bussiness/detail?Id=${fData._id}&status=${data.status}`).then((res) => {
        if (res.statusCode === 200) {
          check.status = true;
        }
      });

      if (data.coverImage.length !== 0 || data.brandLogo.length !== 0) {
        await patchReq('bussiness/logo', data).then((res) => {
          // console.log(res);
        });
      }

      // console.log(data, data.coverImage[0]);
      if (check.status && check.details) {
        setAlert(true);
        setAlertVisible(true);
        setTimeout(() => {
          handleClose();
          handleReload(false);
          setAlert(false);
          setAlertVisible(false);
        }, 1500);
      } else {
        setAlertVisible(true);
        setErrorMessage('');
        setTimeout(() => {
          setAlertVisible(false);
        }, 1500);
      }
    }

    if (fromCall === 'add') {
      await postReq(`bussiness`, data).then((res) => {
        if (res.statusCode === 200) {
          setAlert(true);
          setAlertVisible(true);
          setTimeout(() => {
            handleClose();
            handleReload(false);
            setAlert(false);
            setAlertVisible(false);
          }, 1500);
        } else {
          setAlertVisible(true);
          setErrorMessage('');
          setTimeout(() => {
            setAlertVisible(false);
          }, 1500);
        }
      });
    }
  };

  // console.log('buss', categoryList);
  // console.log('userDetails', userDetails);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      {alert ? (
        <>
          {alertVisisble ? (
            <Alert variant="filled" severity="success">
              {fromCall === 'edit'
                ? 'Bussiness details updated successfully'
                : 'Bussiness Added SuccessFully'}
            </Alert>
          ) : null}
        </>
      ) : null}
      {alert ? null : (
        <>
          {alertVisisble ? (
            <Alert variant="filled" severity="error">
              {errMessage !== '' ? errMessage : 'Bussiness Not updated'}
            </Alert>
          ) : null}
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{fromCall === 'edit' ? 'Edit Info' : 'Add Bussiness'}</DialogTitle>
        <DialogContent>
          <Box p={1}>
            <TextField
              label="Title"
              name="title"
              variant="outlined"
              {...register('title')}
              defaultValue={fData?.title ? fData?.title : ''}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              name="description"
              variant="outlined"
              {...register('description')}
              type="text"
              defaultValue={fData?.description ? fData.description : ''}
              fullWidth
              margin="dense"
            />

            {fromCall === 'add' ? (
              <TextField label="Category" select margin="dense" fullWidth {...register('category')}>
                {categoryList?.map((opt) => (
                  <MenuItem value={opt._id} key={opt._id}>
                    {opt.title}
                  </MenuItem>
                ))}
              </TextField>
            ) : null}

            {fromCall !== 'add' ? (
              <Box mt={1} mb={1}>
                <Typography>Status</Typography>
                {fData?.status === 'active' ? (
                  <TextField select defaultValue="active" {...register('status')} name="status">
                    {activeStatusList.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.lable}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
                {fData?.status === 'pending' ? (
                  <TextField select defaultValue="pending" {...register('status')} name="status">
                    {pendingStausList.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.lable}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
                {fData?.status === 'reject' ? (
                  <TextField select defaultValue="reject" {...register('status')} name="status">
                    {rejectStatusList.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.lable}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
                {fData?.status === 'in-active' ? (
                  <TextField select defaultValue="in-active" {...register('status')} name="status">
                    {inActiveStausList.map((opt) => (
                      <MenuItem key={opt.value} value={opt.value}>
                        {opt.lable}
                      </MenuItem>
                    ))}
                  </TextField>
                ) : null}
              </Box>
            ) : null}

            <TextField
              label="City"
              name="city"
              variant="outlined"
              {...register('city')}
              defaultValue={fData?.address?.city ? fData.address.city : ''}
              margin="dense"
              sx={{ mr: 1 }}
            />
            <TextField
              label="State"
              name="state"
              variant="outlined"
              {...register('state')}
              defaultValue={fData?.address?.state ? fData.address.state : ''}
              margin="dense"
            />
            <TextField
              label="street"
              name="street"
              variant="outlined"
              {...register('street')}
              defaultValue={fData?.address?.city.street ? fData.address.city.street : ''}
              margin="dense"
              sx={{ mr: 1 }}
            />
            <TextField
              label="Area"
              margin="dense"
              name="area"
              variant="outlined"
              {...register('area')}
              defaultValue={fData?.address?.area ? fData.address.area : ''}
            />
            <TextField
              label="Pincode"
              margin="dense"
              name="pincode"
              variant="outlined"
              {...register('pincode')}
              defaultValue={fData?.address?.pincode ? fData.address.pincode : ''}
            />
            <TextField
              label="Full Address"
              name="fullAddress"
              variant="outlined"
              {...register('fullAddress')}
              defaultValue={fData?.address?.fullAddress ? fData.address.fullAddress : ''}
              fullWidth
              margin="dense"
            />

            {fromCall !== 'add' ? (
              <Box display="flex">
                <Box mr={1}>
                  <Typography>Brand Logo</Typography>
                  <TextField
                    name="brandLogo"
                    variant="outlined"
                    {...register('brandLogo')}
                    type="file"
                    fullWidth
                  />
                </Box>
                <Box>
                  <Typography>Cover Image</Typography>
                  <TextField
                    name="coverImage"
                    variant="outlined"
                    {...register('coverImage')}
                    type="file"
                    fullWidth
                  />
                </Box>
              </Box>
            ) : null}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

ContactInfoDialog.propTypes = {
  fData: PropTypes.object,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  handleReload: PropTypes.func,
  fromCall: PropTypes.string,
};
