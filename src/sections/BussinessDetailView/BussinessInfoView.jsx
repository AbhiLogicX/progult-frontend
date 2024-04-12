import { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Image } from '@mui/icons-material';
import ImageList from '@mui/material/ImageList';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';

import TimingCards from 'src/components/cards/TimingSlotCard';
import MasterViewCard from 'src/components/cards/MasterViewCard';
import BussinessTimeForm from 'src/components/dialogueForm/BussinessHourDialog';

import { mockData, itemData } from './mockData';
import { BussinessActivityView } from './BussinessActivityView';

function BussinessInfoView() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    console.log('Edit btn');
    // if (result.statusCode === 200) {
    //   handleClose();
    //   handleReload(false);
    // }
    setOpen(false);
  };

  return (
    <>
      <Paper component="div" elevation={3} sx={{ p: '1%', mb: 1, width: 1400 }}>
        <Box sx={{ borderRadius: 0.75, textAlign: 'center' }}>
          <Image
            src="/assets/images/images(1).png"
            alt="Image is rendering"
            sx={{ height: 300, width: 300 }}
          />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ px: '2%', py: '1%', width: 1400, mb: 5 }}>
        <Box mb={5}>
          <Box
            component={Paper}
            elevation={4}
            mb={3}
            sx={{
              p: '1%',
              borderRadius: 50,
              width: 150,
              height: 150,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h3" sx={{ textAlign: 'center' }}>
              LOGO
            </Typography>
          </Box>

          <Box>
            <ContactDetailform />
          </Box>
        </Box>

        <Box mb={5}>
          <Box>
            <Typography variant="h5" mb={5}>
              Owner Details
            </Typography>
          </Box>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Box display="flex" alignItems="cneter">
                  <Typography mr={1} fontWeight={600}>
                    Full Name :
                  </Typography>
                  <Typography>{mockData.owner[0].fullName}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="cneter">
                  <Typography mr={1} fontWeight={600}>
                    Status:
                  </Typography>
                  <Typography>{mockData.owner[0].status}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" mb={3}>
              Bussiness Hours
            </Typography>
            <Button variant="contained" onClick={handleClickOpen}>
              Add Timings
            </Button>
            <BussinessTimeForm
              open={open}
              handleClose={handleClose}
              handleSubmit={handleSubmit}
              fromCall="Add Timings"
            />
          </Box>
          <Box display="flex">
            {mockData.bussinessHour.map((itm) => (
              <TimingCards timeData={itm} key={`${itm.title}_${itm.id}`} />
            ))}
          </Box>
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: '1%', mb: 5, width: 1400 }}>
        <Typography variant="h5" mb={5}>
          Activities
        </Typography>
        <Box>
          <BussinessActivityView />
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: '1%', mb: 5, width: 1400 }}>
        <Typography variant="h5" mb={5}>
          Aminities
        </Typography>
        <Grid container spacing={2}>
          {mockData.amenities_list.map((item) => (
            <Grid item xs={2}>
              <MasterViewCard cardData={item} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: '1%', width: 1400, mb: 5 }}>
        <Typography variant="h5" mb={5}>
          Gallery
        </Typography>
        <ImageList sx={{ width: 1375, height: 600 }} cols={3} rowHeight={500}>
          {itemData.map((item) => (
            <ImageListItem key={item.img}>
              <img
                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Paper>
    </>
  );
}

export default BussinessInfoView;

//------------------------------------------------------------------------------------

function ContactDetailform() {
  const [editOption, setEditOption] = useState(false);
  const { register, handleSubmit } = useForm({});
  const handleSetEditOption = () => {
    setEditOption(true);
  };
  const handleSetEditOptionCancel = () => {
    setEditOption(false);
  };
  async function onSubmit(data) {
    console.log(data);
    setEditOption(false);
  }

  return (
    <Box sx={{ p: '1%', borderRadius: 0.75 }} border={editOption ? '1px solid darkgrey' : null}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={3} display="flex" sx={{ borderRadius: 0.75 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                {editOption ? (
                  <Typography sx={{ fontWeight: 600, mr: 1 }}>Titile :</Typography>
                ) : null}
                {editOption ? (
                  <TextField
                    name="title"
                    variant="outlined"
                    {...register('title')}
                    defaultValue={mockData?.title ? mockData.title : ''}
                  />
                ) : (
                  <Typography variant="h3">{mockData?.title ? mockData.title : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" mb={2}>
                {editOption ? (
                  <Typography sx={{ fontWeight: 600, mr: 1 }}>Domain :</Typography>
                ) : (
                  <Typography variant="h6" sx={{ mr: 1 }}>
                    Domain :
                  </Typography>
                )}
                {editOption ? (
                  <TextField
                    name="title"
                    variant="outlined"
                    {...register('title')}
                    defaultValue={mockData?.domain[0]?.title ? mockData.domain[0].title : ''}
                  />
                ) : (
                  <Typography variant="h6">
                    {mockData?.domain[0]?.title ? mockData.domain[0].title : ''}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box>
                <Typography variant="h5">Contact Details</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>City :</Typography>
                {editOption ? (
                  <TextField
                    name="city"
                    variant="outlined"
                    {...register('city')}
                    defaultValue={mockData?.address?.city ? mockData?.address?.city : ''}
                  />
                ) : (
                  <Typography>{mockData?.address?.city ? mockData?.address?.city : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>State :</Typography>
                {editOption ? (
                  <TextField
                    name="state"
                    variant="outlined"
                    {...register('state')}
                    defaultValue={mockData?.address?.state ? mockData.address.city : ''}
                  />
                ) : (
                  <Typography>{mockData?.address?.state ? mockData.address.city : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Street :</Typography>
                {editOption ? (
                  <TextField
                    name="street"
                    variant="outlined"
                    {...register('street')}
                    defaultValue={
                      mockData?.address?.city.street ? mockData.address.city.street : ''
                    }
                  />
                ) : (
                  <Typography>
                    {mockData?.address?.city.street ? mockData.address.city.street : ''}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Area :</Typography>
                {editOption ? (
                  <TextField
                    name="area"
                    variant="outlined"
                    {...register('area')}
                    defaultValue={mockData?.address?.area ? mockData.address.area : ''}
                  />
                ) : (
                  <Typography>{mockData?.address?.area ? mockData.address.area : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Pincode :</Typography>
                {editOption ? (
                  <TextField
                    name="pincode"
                    variant="outlined"
                    {...register('pincode')}
                    defaultValue={mockData?.address?.pincode ? mockData.address.pincode : ''}
                  />
                ) : (
                  <Typography>
                    {mockData?.address?.pincode ? mockData.address.pincode : ''}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Full Address :</Typography>
                {editOption ? (
                  <TextField
                    name="fullAddress"
                    variant="outlined"
                    {...register('fullAddress')}
                    defaultValue={
                      mockData?.address?.fullAddress ? mockData.address.fullAddress : ''
                    }
                    sx={{ width: 800 }}
                  />
                ) : (
                  <Typography>
                    {mockData?.address?.fullAddress ? mockData.address.fullAddress : ''}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Bussiness Logo :</Typography>
                {editOption ? (
                  <TextField
                    name="brandLogo"
                    variant="outlined"
                    {...register('brandLogo')}
                    type="file"
                  />
                ) : (
                  <Typography>{mockData?.brandLogo ? mockData?.brandLogo : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Cover Image :</Typography>
                {editOption ? (
                  <TextField
                    name="coverImage"
                    variant="outlined"
                    {...register('coverImage')}
                    type="file"
                  />
                ) : (
                  <Typography>{mockData?.coverImage ? mockData.coverImage : ''}</Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center">
                <Typography sx={{ fontWeight: 600, mr: 1 }}>Description :</Typography>
                {editOption ? (
                  <TextField
                    name="description"
                    variant="outlined"
                    {...register('description')}
                    type="text"
                    defaultValue={mockData?.description ? mockData.description : ''}
                  />
                ) : (
                  <Typography>{mockData?.description ? mockData.description : ''}</Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign="right">
          {editOption ? (
            <Button color="error" onClick={handleSetEditOptionCancel} sx={{ mr: 1 }}>
              Cancel
            </Button>
          ) : (
            <Button onClick={handleSetEditOption} sx={{ mr: 1 }}>
              Edit
            </Button>
          )}
          {editOption ? (
            <Button variant="contained" type="submit">
              Save
            </Button>
          ) : (
            <Button variant="contained" disabled>
              Save
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
}

TimingCards.propType = {
  timeData: PropTypes.object,
};
