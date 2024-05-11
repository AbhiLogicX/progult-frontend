import * as React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { MenuItem, TextField, Typography } from '@mui/material';

import { error } from 'src/theme/palette';
import { postReq, patchReq } from 'src/api/api';

export default function CouponDialogForm({
  open,
  handleClose,
  cupDetails,
  fromCall,
  handleReload,
}) {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if (fromCall === 'edit') {
      data.Id = cupDetails._id;
      if (data.isVisible === 'true') {
        data.isVisible = true;
      } else {
        data.isVisible = false;
      }
      data.minAmt = Number(data.minAmt);
      data.discount = Number(data.discount);

      await patchReq(`domain/coupon`, data).then((res) => {
        if (res.statusCode === 200) {
          // console.log(res);
          handleClose();
          handleReload(false);
        }
      });
    }
    if (fromCall === 'add') {
      if (data.isVisible === 'true') {
        data.isVisible = true;
      } else {
        data.isVisible = false;
      }
      data.minAmt = Number(data.minAmt);
      data.discount = Number(data.discount);

      await postReq(`domain/coupon`, data).then((res) => {
        if (res.statusCode === 200) {
          // console.log(res);
          handleClose();
          handleReload(false);
        }
      });
    }

    // console.log('hello', data);
  };
  // console.log('at form', cupDetails);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">
        {fromCall === 'edit' ? 'Edit Coupon Details' : 'Add Coupon'}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            {...register('title')}
            defaultValue={cupDetails?.title}
            margin="dense"
          />
          <TextField
            label="Code"
            fullWidth
            {...register('code')}
            defaultValue={cupDetails?.code}
            margin="dense"
          />
          <TextField
            label="Description"
            fullWidth
            {...register('desc')}
            defaultValue={cupDetails?.desc}
            margin="dense"
          />

          <Box mt={1}>
            <Typography>Discount Type:</Typography>
            <TextField
              select
              fullWidth
              defaultValue={cupDetails?.disType}
              margin="dense"
              {...register('disType')}
            >
              <MenuItem value="percent">Percent</MenuItem>
              <MenuItem value="flat">Flat</MenuItem>
            </TextField>
          </Box>
          <TextField
            label="Minimum for discount"
            fullWidth
            {...register('minAmt')}
            defaultValue={cupDetails?.minAmt}
            margin="dense"
            type="number"
          />
          <TextField
            label="Discount"
            fullWidth
            {...register('discount')}
            defaultValue={cupDetails?.discount}
            margin="dense"
            type="number"
          />
          <Box display="flex">
            <Box mt={1} width="100%" mr={1}>
              <Typography>Status:</Typography>
              <TextField
                select
                fullWidth
                defaultValue={cupDetails?.status}
                margin="dense"
                {...register('status')}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="in-active">In-Active</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
              </TextField>
            </Box>
            <Box mt={1} width="100%">
              <Typography>Visibility:</Typography>
              <TextField
                select
                fullWidth
                defaultValue={cupDetails?.isVisible ? 'true' : 'false'}
                margin="dense"
                {...register('isVisible')}
              >
                <MenuItem value="true">Yes</MenuItem>
                <MenuItem value="false">No</MenuItem>
              </TextField>
            </Box>
          </Box>
          <Box display="flex">
            <Box mt={1} width="100%" mr={1}>
              <Typography>Valid From:</Typography>
              <TextField
                type="date"
                fullWidth
                defaultValue={
                  cupDetails?.startDate
                    ? format(new Date(cupDetails?.startDate), 'yyyy-MM-dd')
                    : null
                }
                margin="dense"
                {...register('startDate')}
              />
            </Box>
            <Box mt={1} width="100%">
              <Typography>Valid To:</Typography>
              <TextField
                type="Date"
                fullWidth
                defaultValue={
                  cupDetails?.endDate ? format(new Date(cupDetails?.endDate), 'yyyy-MM-dd') : null
                }
                margin="dense"
                {...register('endDate')}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: error.main,
              backgroundColor: error.errorBackground,
              '&:hover': {
                backgroundColor: error.main,
                color: error.errorBackground,
              },
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="submit" autoFocus variant="contained">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

CouponDialogForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  cupDetails: PropTypes.object,
  fromCall: PropTypes.string,
  handleReload: PropTypes.func,
};
