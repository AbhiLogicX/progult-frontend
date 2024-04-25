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
  NativeSelect,
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

export function AddFoodAndItem({ open, bussinessId, handleClose, handleReload }) {
  const { register, handleSubmit } = useForm({});
  const [resSuccess, setResSuccess] = useState(false);
  const [errRes, setErrRes] = useState(false);
  const [unitDatafetched, setUnitDatafetched] = useState(false);
  const [unitData, setUnitData] = useState();

  useEffect(() => {
    if (!unitDatafetched) {
      fetchUnitData();
    }
    async function fetchUnitData() {
      await getReq(`master/unit/active`).then((res) => {
        if (res.statusCode === 200) {
          setUnitData(res.data);
          setUnitDatafetched(true);
        }
      });
    }
  }, [unitDatafetched]);

  const onSubmit = async (data) => {
    data.image = data.image[0];
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('rate', data.rate);
    formData.append('stock', data.stock);
    formData.append('unitId', data.unitId);
    formData.append('image', data.image);
    formData.append('description', data.description);
    formData.append('bussinessId', bussinessId);
    if (open.type === 'Item') {
      await postReq(`item`, formData).then((res) => {
        // console.log('hi code', res.statusCode);
        if (res.statusCode !== 200) {
          setErrRes(true);
          handleClose();
        }
        setResSuccess(true);
        handleClose();
        setTimeout(() => {
          handleReload(false);
        }, 2000);
      });
    }
    if (open.type === 'Food') {
      await postReq(`food`, formData).then((res) => {
        // console.log('hi code', res.statusCode);
        if (res.statusCode !== 200) {
          setErrRes(true);
          handleClose();
        }
        setResSuccess(true);
        handleClose();
        setTimeout(() => {
          handleReload(false);
        }, 2000);
      });
    }
  };

  // console.log('hello', unitData);
  return (
    <Dialog open={open.open}>
      {resSuccess ? (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          variant="filled"
          severity="success"
        >{`${open.type} added Successfully`}</Alert>
      ) : null}
      {errRes ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} variant="filled" severity="error">
          {`${open.type} not added `}
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>{`Add ${open.type}`}</DialogTitle>
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
          {unitDatafetched ? (
            <NativeSelect {...register('unitId')} sx={{ mb: 1 }} style={{ width: '50%' }}>
              {unitData.map((seleData) => (
                <option value={seleData._id}>{seleData.title}</option>
              ))}
              {/* <option value="active">active</option>
              <option value="in-active">in-active</option> */}
            </NativeSelect>
          ) : null}
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
  handleClose: PropTypes.func,
  open: PropTypes.bool,
  handleReload: PropTypes.func,
};
