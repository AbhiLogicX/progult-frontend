import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, Alert, TextField, Typography } from '@mui/material';

import { patchReq } from 'src/api/api';
import { customColors } from 'src/theme/palette';

export default function EditDialogForm({ domainCall, mtitle, mdescription, mId, handleReload }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(mtitle);
  const [description, setdescription] = useState(mdescription);
  const [selectedFile, setSelectedFile] = useState(null);
  const [alert, setAlert] = useState(false);
  const [alertVisisble, setAlertVisible] = useState(false);
  const [errMessage, setErrorMessage] = useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setdescription(event.target.value);
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (domainCall === 'master/banner' || domainCall === 'master/advertise') {
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', selectedFile);
      formData.append('Id', mId);
      if (selectedFile !== null) {
        const result = await patchReq(`${domainCall}`, formData); // we have to handle the success and error
        // console.log(result);
        if (result.statusCode === 200) {
          setAlert(true);
          setAlertVisible(true);
          setTimeout(() => {
            handleReload(false);
            setOpen(false);
            setAlert(false);
            setAlertVisible(false);
          }, 1000);
        } else {
          setErrorMessage(result?.response?.data?.message);
          setAlertVisible(true);
          setTimeout(() => {
            setErrorMessage('');
            setAlertVisible(false);
          }, 1000);
        }
      } else {
        setErrorMessage('Image is required');
        setAlertVisible(true);
        setTimeout(() => {
          setErrorMessage('');
          setAlertVisible(false);
        }, 1000);
      }
    }

    if (domainCall === 'master/unit') {
      const dataToUpdate = {
        title,
        Id: mId,
        description,
      };

      const result = await patchReq(`${domainCall}`, dataToUpdate); // we have to handle the success and error
      if (result.statusCode === 200) {
        setAlert(true);
        setAlertVisible(true);
        setTimeout(() => {
          setAlertVisible(false);
          handleReload(false);
          setOpen(false);
          setAlert(false);
        }, 1000);
      } else {
        setAlertVisible(true);
        setErrorMessage(result?.response?.data?.message);
        setTimeout(() => {
          setAlertVisible(false);
        }, 1000);
      }
    }

    if (
      domainCall !== 'master/unit' &&
      domainCall !== 'master/banner' &&
      domainCall !== 'master/advertise'
    ) {
      formData.append('title', title);
      formData.append('description', description);
      formData.append('image', selectedFile);
      formData.append('domainId', mId);
      const result = await patchReq(`${domainCall}`, formData); // we have to handle the success and error
      if (result.statusCode === 200) {
        setAlert(true);
        setAlertVisible(true);
        setTimeout(() => {
          handleReload(false);
          setOpen(false);
          setAlert(false);
          setAlertVisible(false);
        }, 1500);
      } else {
        // console.log('result', result);
        setAlertVisible(true);
        setErrorMessage(result?.response?.data?.message);
        setTimeout(() => {
          setAlertVisible(false);
        }, 1000);
      }
    }
  };

  const splitFromCall = domainCall.split('/');
  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        sx={{
          backgroundColor: customColors.orangePrimary,
          '&:hover': {
            backgroundColor: customColors.darkOrange,
          },
        }}
      >
        Edit
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {alert ? (
          <>
            {alertVisisble ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="success">
                {`${splitFromCall[1]} updated successfully`}
              </Alert>
            ) : null}
          </>
        ) : null}
        {alert ? null : (
          <>
            {alertVisisble ? (
              <Alert variant="filled" severity="error">
                {errMessage !== '' ? errMessage : `${splitFromCall[1]} not updated`}
              </Alert>
            ) : null}
          </>
        )}
        <DialogTitle id="alert-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
            sx={{ mb: 2 }}
            defaultValue={mtitle}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleDescriptionChange}
            defaultValue={mdescription}
            sx={{ mb: 2 }}
          />
          {splitFromCall[1] === 'unit' ? null : (
            <Box>
              <Typography>upload image(512 px* 512px)</Typography>
              {domainCall === 'master/banner' || domainCall === 'master/advertise' ? (
                <TextField type="file" accept="image/*" onChange={handleFileChange} required />
              ) : (
                <TextField type="file" accept="image/*" onChange={handleFileChange} />
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          {alertVisisble ? null : (
            <>
              <Button color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} autoFocus>
                Save
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}

EditDialogForm.propTypes = {
  domainCall: PropTypes.string,
  mtitle: PropTypes.string,
  mdescription: PropTypes.string,
  mId: PropTypes.string,
  handleReload: PropTypes.func,
};
