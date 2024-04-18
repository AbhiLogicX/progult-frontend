import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';

import CheckIcon from '@mui/icons-material/Check';
import {
  Box,
  Grid,
  Alert,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { getReq, postReq } from 'src/api/api';

import AddonCards from './AddonCards';

export function FoodAndItem({ bussinessId, fromCall }) {
  const [data, setData] = useState();
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await getReq(`${fromCall}?bussinessId=${bussinessId}`).then((res) => {
        setData(res.data);
        setDataFetched(true);
      });
    }
    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched, bussinessId, fromCall]);
  return (
    <Box>
      <Grid container>
        {data?.map((dataItm) => (
          <Grid xs={4} mb={1}>
            <AddonCards
              addOnData={dataItm}
              key={`${dataItm.title}${bussinessId}`}
              handleReload={setDataFetched}
              fromCall={fromCall}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// food?bussinessId=66069bfe7f083dba90191320

export function AddFoodAndItem({ open, bussinessId, fromCall, handleClose, handleReload }) {
  const { register, handleSubmit } = useForm({});
  const [resSuccess, setResSuccess] = useState(false);
  const [errRes, setErrRes] = useState(false);

  const onSubmit = async (data) => {
    data.image = data.image[0].name;
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('rate', data.rate);
    formData.append('stock', data.stock);
    formData.append('image', data.image);
    formData.append('description', data.description);
    formData.append('bussinessId', bussinessId);
    if (fromCall === 'Item') {
      await postReq(`item`, formData).then((res) => {
        if (res.statusCode !== 200) {
          setErrRes(true);
          handleClose();
        }
        setResSuccess(true);
        handleClose();
        // setTimeout(() => {
        //   handleReload(false);
        // }, 2000);
      });
    }
  };
  return (
    <Dialog open={open}>
      {resSuccess ? (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          variant="filled"
          severity="success"
        >{`${fromCall} added Successfully`}</Alert>
      ) : null}
      {errRes ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="error">
          {`${fromCall} not added `}
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{`Add ${fromCall}`}</DialogTitle>
        <DialogContent>
          <TextField
            {...register('title')}
            label="Title"
            required
            name="title"
            fullWidth
            margin="normal"
          />
          <TextField
            {...register('rate')}
            label="Price"
            required
            fullWidth
            name="rate"
            margin="normal"
          />
          <TextField
            {...register('stock')}
            label="Stock"
            required
            fullWidth
            name="stock"
            margin="normal"
          />
          <TextField
            {...register('description')}
            label="Description"
            fullWidth
            name="description"
            margin="normal"
          />
          <TextField
            {...register('image')}
            fullWidth
            type="file"
            name="image"
            accept="image/*"
            required
            margin="normal"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

FoodAndItem.propTypes = {
  fromCall: PropTypes.string,
  bussinessId: PropTypes.string,
};

AddFoodAndItem.propTypes = {
  bussinessId: PropTypes.string,
  fromCall: PropTypes.string,
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  handleReload: PropTypes.func,
};
