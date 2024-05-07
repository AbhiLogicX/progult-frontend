import * as React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DeleteIcon from '@mui/icons-material/Delete';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Box, TextField, Typography } from '@mui/material';

import properties from 'src/config/properties';
import { grey, error } from 'src/theme/palette';
import { patchReq, deleteReq } from 'src/api/api';

export default function GalleryForm({ open, handleClose, gallery, bussienessId, handleReload }) {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (data.image.length !== 0) {
      const formData = new FormData();
      formData.append('bussinessId', bussienessId);
      formData.append('images', data.image[0]);

      await patchReq(`bussiness/gallery`, formData).then((res) => {
        // console.log(res);
        handleReload(false);
      });
    }
  };
  // console.log(gallery);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">Manage Gallery</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Box mb={2}>
            <Typography fontWeight={700}>Add images</Typography>
          </Box>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <TextField type="file" {...register('image')} />
            <Button type="submit">Add Image</Button>
          </Box>
          <hr />
          <Box>
            <Typography fontWeight={700} mb={2}>
              Images Uploaded
            </Typography>

            <RenderImgList Imgs={gallery} bussienessId={bussienessId} handleReload={handleReload} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose} autoFocus>
            Done
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

function RenderImgList({ Imgs, bussienessId, handleReload }) {
  // console.log(Imgs);

  const handleDelete = async (imgId) => {
    // console.log('delete');
    await deleteReq(`bussiness/gallery?bussinessId=${bussienessId}&Id=${imgId}`).then((res) => {
      if (res.statusCode === 200) {
        handleReload(false);
      }
    });
  };
  return (
    <>
      {Imgs.map((img) => (
        <Box
          border="1px solid black"
          mb={1}
          borderRadius={1}
          p={1}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box width="20%">
            <img
              src={`${properties.BASE_GALLERY_IMAGE_URL}${img.image}`}
              alt="gallery images"
              style={{
                aspectRatio: 1 / 1,
                borderRadius: 5,
                objectFit: 'cover',
              }}
            />
          </Box>
          <Box>
            <Button
              variant="contained"
              sx={{
                bgcolor: 'white',
                color: grey[400],
                mr: 1,
                '&:hover': {
                  backgroundColor: error.main,
                  color: error.errorBackground,
                },
              }}
              onClick={() => {
                handleDelete(img._id);
              }}
            >
              <DeleteIcon sx={{ mr: 1 }} />
              Delete
            </Button>
          </Box>
        </Box>
      ))}
    </>
  );
}

GalleryForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  gallery: PropTypes.array,
  bussienessId: PropTypes.string,
  handleReload: PropTypes.func,
};

RenderImgList.propTypes = {
  Imgs: PropTypes.array,
  bussienessId: PropTypes.string,
  handleReload: PropTypes.func,
};
