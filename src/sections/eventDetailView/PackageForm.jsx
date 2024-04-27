import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { error, primary } from 'src/theme/palette';
import { postReq, patchReq } from 'src/api/api';

export default function AddPackageForm({ eventId, handleReload }) {
  const [openPackageForm, setOpenPackageForm] = useState(false);
  const { register, handleSubmit } = useForm({});

  const handleOpenPackgeForm = () => {
    setOpenPackageForm(true);
  };

  const handleClosePackgeForm = () => {
    setOpenPackageForm(false);
  };

  const onSubmit = async (data) => {
    data.eventId = eventId;
    await postReq(`event/packages`, data).then((res) => {
      if (res.statusCode === 200) {
        handleClosePackgeForm();
        handleReload(false);
      }
    });
  };
  return (
    <>
      <Button variant="contained" onClick={handleOpenPackgeForm}>
        Add More
      </Button>

      <Dialog open={openPackageForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle mb={1}>Edit Package</DialogTitle>
          <DialogContent>
            <TextField
              {...register('title')}
              label="Title"
              name="title"
              required
              sx={{ mb: 1, mr: 1 }}
              variant="standard"
            />
            <TextField
              {...register('amount')}
              label="Amount"
              name="amount"
              required
              sx={{ mb: 1, mr: 1 }}
              variant="standard"
            />
            <TextField
              {...register('forPeople')}
              label="For people"
              name="forPeople"
              required
              sx={{ mb: 1, mr: 1 }}
              variant="standard"
            />
            <TextField
              {...register('description')}
              label="Description"
              name="description"
              sx={{ mb: 1, mr: 1 }}
              variant="standard"
              required
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClosePackgeForm}>
              Cancle
            </Button>
            <Button type="submit" variant="contained" onClick={handleClosePackgeForm}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export function EditPackageForm({ eventId, handleReload, dValues }) {
  const [openPackageForm, setOpenPackageForm] = useState(false);
  const { register, handleSubmit } = useForm({});

  const handleOpenPackgeForm = () => {
    setOpenPackageForm(true);
  };

  const handleClosePackgeForm = () => {
    setOpenPackageForm(false);
  };

  const onSubmit = async (data) => {
    data.eventId = eventId;
    data.Id = dValues._id;
    await patchReq(`event/packages`, data).then((res) => {
      if (res.statusCode === 200) {
        handleClosePackgeForm();
        handleReload(false);
      }
    });
  };
  return (
    <>
      <Button
        sx={{
          color: primary.main,
          bgcolor: 'white',
          '&:hover': {
            backgroundColor: primary.main,
            color: 'white',
          },
        }}
        onClick={handleOpenPackgeForm}
      >
        <EditIcon /> Edit
      </Button>

      <Dialog open={openPackageForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle mb={1}>Add Package</DialogTitle>
          <DialogContent>
            <TextField
              {...register('title')}
              label="Title"
              name="title"
              required
              sx={{ mb: 1, mr: 1 }}
              variant="standard"
              defaultValue={dValues.title}
            />
            <TextField
              {...register('amount')}
              label="Amount"
              name="amount"
              required
              sx={{ mb: 1, mr: 1 }}
              variant="standard"
              defaultValue={dValues.amount}
            />
            <TextField
              {...register('forPeople')}
              label="For people"
              name="forPeople"
              required
              sx={{ mb: 1, mr: 1 }}
              variant="standard"
              defaultValue={dValues.forPeople}
            />
            <TextField
              {...register('description')}
              label="Description"
              name="description"
              sx={{ mb: 1, mr: 1 }}
              variant="standard"
              defaultValue={dValues.description}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={handleClosePackgeForm}>
              Cancle
            </Button>
            <Button type="submit" variant="contained" onClick={handleClosePackgeForm}>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

AddPackageForm.propTypes = {
  eventId: PropTypes.string,
  handleReload: PropTypes.func,
};

EditPackageForm.propTypes = {
  eventId: PropTypes.string,
  handleReload: PropTypes.func,
  dValues: PropTypes.object,
};
