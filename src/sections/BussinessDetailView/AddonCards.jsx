import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Paper, Button, TextField, Typography, NativeSelect } from '@mui/material';

import { patchReq } from 'src/api/api';
import properties from 'src/config/properties';
import { grey, error, primary } from 'src/theme/palette';

export default function AddonCards({ addOnData, handleReload, fromCall }) {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm({});

  const handleEditOpen = () => {
    setEdit(true);
  };
  const handleEditClose = () => {
    setEdit(false);
  };

  const handleDelete = async () => {
    // console.log('hello Delete', addOnData);
    await patchReq(`${fromCall}/detail?Id=${addOnData._id}&status=delete`).then((res) => {
      if (res.statusCode === 200) {
        handleReload(false);
      }
    });
    // item/detail?Id=65fbc76847077a0a07a8e4bf&status=active
  };

  const onSubmit = async (data) => {
    data.Id = addOnData._id;
    data.unitId = addOnData.unit;
    data.image = data?.image[0]?.name;
    await patchReq(`${fromCall}`, data).then((res) => {
      if (res.statusCode === 200) {
        setEdit(false);
        handleReload(false);
      } else {
        setEdit(false);
      }
    });
  };
  // console.log(addOnData);
  return (
    <Paper elevation={4} sx={{ p: '2%', mr: 1, backgroundColor: grey[300] }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex">
          <Box mr={1} width="60%">
            {edit ? null : (
              <img
                src={`${properties.BASE_ITEM_IMAGE_URL}${addOnData.image}`}
                alt="Bussiness Cover"
                style={{
                  width: '100%',
                  aspectRatio: 4 / 2,
                  objectFit: 'cover',
                  borderRadius: 5,
                }}
              />
            )}
          </Box>

          <Box>
            {/* <Typography>{fromCall}</Typography> */}
            {edit ? (
              <TextField
                defaultValue={addOnData.title}
                name="title"
                label="Title"
                {...register('title')}
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography fontWeight={700} mb={2}>
                {addOnData.title}
              </Typography>
            )}
            {edit ? (
              <TextField
                defaultValue={addOnData.rate}
                name="rate"
                label="Price"
                {...register('rate')}
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography>{`Price: ₹${addOnData.rate}`}</Typography>
            )}
            {edit ? (
              <TextField
                defaultValue={addOnData.stock}
                name="stock"
                label="Stock"
                {...register('stock')}
                sx={{ mb: 1 }}
              />
            ) : (
              <Typography>{`Stock: ${addOnData.stock}`}</Typography>
            )}
            {edit ? (
              <NativeSelect defaultValue={addOnData.status} {...register('status')} sx={{ mb: 1 }}>
                <option value="active">active</option>
                <option value="in-active">in-active</option>
              </NativeSelect>
            ) : (
              <Typography>{`Status: ${addOnData.status}`}</Typography>
            )}
            {edit ? (
              <TextField
                {...register('image')}
                name="image"
                type="file"
                accept="image/*"
                sx={{ mb: 1 }}
              />
            ) : null}
          </Box>
        </Box>
        <Box>
          {edit ? null : (
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: grey[400],
                width: '45%',
                mr: 1,
                '&:hover': {
                  backgroundColor: error.main,
                  color: error.errorBackground,
                },
              }}
              onClick={handleDelete}
            >
              <DeleteIcon /> Delete
            </Button>
          )}
          {edit ? null : (
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: primary.main,
                width: '45%',
                '&:hover': {
                  backgroundColor: primary.main,
                  color: 'white',
                },
              }}
              onClick={handleEditOpen}
            >
              <EditIcon /> Edit
            </Button>
          )}

          {edit ? (
            <>
              <Button onClick={handleEditClose} color="error">
                Cancel
              </Button>{' '}
              <Button variant="contained" type="submit">
                Update
              </Button>
            </>
          ) : null}
        </Box>
      </form>
    </Paper>
  );
}

AddonCards.propTypes = {
  addOnData: PropTypes.object,
  handleReload: PropTypes.func,
  fromCall: PropTypes.string,
};
