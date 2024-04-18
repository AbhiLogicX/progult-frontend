import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import EditIcon from '@mui/icons-material/Edit';
import { Box, Paper, Button, TextField, IconButton, Typography, NativeSelect } from '@mui/material';

import { patchReq } from 'src/api/api';
import { primary } from 'src/theme/palette';
import properties from 'src/config/properties';

export default function AddonCards({ addOnData, handleReload, fromCall }) {
  const [edit, setEdit] = useState(false);
  const { register, handleSubmit } = useForm({});

  const handleEditOpen = () => {
    setEdit(true);
  };
  const handleEditClose = () => {
    setEdit(false);
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
  return (
    <Paper elevation={4} sx={{ p: '2%', mr: 1, backgroundColor: primary.lighter }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex">
          <Box mr={1}>
            <img
              src={`${properties.BASE_ITEM_IMAGE_URL}${addOnData.image}}`}
              style={{
                height: 100,
                width: 100,
                borderRadius: 25,
              }}
              alt="Addon Cover"
            />
          </Box>

          <Box>
            <Box>
              {edit ? (
                <TextField
                  defaultValue={addOnData.title}
                  name="title"
                  label="Title"
                  {...register('title')}
                  sx={{ mb: 1 }}
                />
              ) : (
                <Typography variant="h6" mb={2}>
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
                <NativeSelect
                  defaultValue={addOnData.status}
                  {...register('status')}
                  sx={{ mb: 1 }}
                >
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
        </Box>
        <Box textAlign="right">
          {edit ? null : (
            <IconButton onClick={handleEditOpen}>
              <EditIcon />
            </IconButton>
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
