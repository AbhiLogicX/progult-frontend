import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import {
  Box,
  Button,
  Dialog,
  TextField,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { patchReq } from 'src/api/api';

export default function EventInfoDialogForm({ openDialog, handleClose, dValues, handleReload }) {
  const { register, handleSubmit } = useForm({});
  async function onSubmit(data) {
    // console.log('hello', data);
    data.Id = dValues._id;
    await patchReq(`event`, data).then((res) => {
      if (res.statusCode === 200) {
        // console.log('res', res);
      }
    });
    handleClose();
    handleReload(false);
  }

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
        Edit Info
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
          <Box>
            <Typography>Start Date</Typography>
            <TextField
              type="date"
              name="startDate"
              {...register('startDate')}
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>
          <Box>
            <Typography>End Date</Typography>
            <TextField type="date" name="endDate" {...register('endDate')} sx={{ mr: 1, mb: 1 }} />
          </Box>
          <Box>
            <Typography>Start Time</Typography>
            <TextField
              type="time"
              name="endDate"
              {...register('startTime')}
              sx={{ mr: 1, mb: 1 }}
            />
          </Box>
          <Box>
            <Typography>End Time</Typography>
            <TextField type="time" name="endDate" {...register('endTime')} sx={{ mr: 1, mb: 1 }} />
          </Box>
          <TextField
            type="text"
            name="city"
            label="City"
            defaultValue={dValues?.address?.city}
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            type="text"
            name="state"
            label="State"
            defaultValue={dValues?.address?.state}
            sx={{ mr: 1, mb: 1 }}
          />
          <TextField
            type="text"
            name="fullAddress"
            label="Full Address"
            defaultValue={dValues?.address?.fullAddress}
            sx={{ mr: 1, mb: 1, width: '100%' }}
          />
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancle
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
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
};
