import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import Typography from '@mui/material/Typography';
import ImageListItem from '@mui/material/ImageListItem';

import properties from 'src/config/properties';
import { grey, primary } from 'src/theme/palette';

import TimingCards from 'src/components/cards/TimingSlotCard';
import MasterViewCard from 'src/components/cards/MasterViewCard';
import RulesForm from 'src/components/dialogueForm/RulesAndRegulationForm';
import BussinessTimeForm from 'src/components/dialogueForm/BussinessHourDialog';

import { itemData } from './mockData';
// import ContactDetailform from './ContactForm';
import { BussinessActivityView } from './BussinessActivityView';
import { FoodAndItem, AddFoodAndItem } from './BussinessFoodItem';
import AmenitiesManageForm from '../eventDetailView/AminitesManage';

function BussinessInfoView({ bussinessData, handleReload }) {
  const [open, setOpen] = useState(false);
  const [openRulesForm, setOpenRulesForm] = useState(false);
  const [openAddonForm, setopenAddonForm] = useState({
    open: false,
    type: '',
  });
  const [openAminiteDialog, setOpenAminiteDialog] = useState(false);

  const handleAminitieDialogClose = () => {
    setOpenAminiteDialog(false);
  };

  const handleAminitieDialogOpen = () => {
    setOpenAminiteDialog(true);
  };

  const handleCloseAddonForm = () => {
    setopenAddonForm({
      open: false,
      type: '',
    });
  };
  const handleOpenAddonForm = (type) => {
    setopenAddonForm({
      open: true,
      type,
    });
  };
  const handleClickOpenRule = () => {
    setOpenRulesForm(true);
  };

  const handleClickCloseRule = () => {
    setOpenRulesForm(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function addDefaultValues() {
    const defaultAminites = [];
    for (let i = 0; i < bussinessData.amenities_list.length; i += 1) {
      const obj = bussinessData.amenities_list[i];
      if (!defaultAminites.includes(obj._id)) {
        defaultAminites.push(obj._id);
      }
    }
    // console.log('def', defaultAminites);
    return defaultAminites;
  }

  // console.log(bussinessData);
  return (
    <Box>
      <Paper elevation={3} sx={{ width: '100%', mb: 2 }}>
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <img
            src={`${properties.BASE_BUSSINESS_IMAGE_URL}${bussinessData.coverImage}`}
            alt="Bussiness Cover"
            style={{
              width: '100%',
              aspectRatio: 4 / 1,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            }}
          />
        </Box>

        <Box p="1%" mt="-10%">
          <Grid container alignItems="flex-end">
            <Grid xs={2}>
              <Box px="4%">
                <img
                  src={`${properties.BASE_BUSSINESS_IMAGE_URL}${bussinessData.brandLogo}`}
                  alt="brandLogo"
                  style={{
                    width: '100%',
                    aspectRatio: 1 / 1,
                    borderRadius: '50%',
                    border: '10px solid white',
                  }}
                />
              </Box>
            </Grid>

            <Grid xs={4}>
              <Typography variant="h2">{bussinessData.title}</Typography>
              <Box display="flex" justifyContent="space-between">
                <Box display="flex">
                  <Typography fontWeight={700} mr={1} color={grey[400]}>
                    Domain:
                  </Typography>
                  <Typography fontWeight={700} color={primary.main}>
                    {bussinessData.domain[0].title}
                  </Typography>
                </Box>
                <Box display="flex">
                  <Typography fontWeight={700} color={grey[400]}>
                    Status:
                  </Typography>
                  <Typography fontWeight={700} color={primary.main}>
                    {bussinessData.status}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid xs={6}>
              <Box textAlign="right">
                <Button variant="contained">Edit Details</Button>
              </Box>
            </Grid>

            <Grid xs={2} mt={5} mr={2}>
              <Box>
                <Typography variant="h5">Owner Info:</Typography>
                <Box bgcolor={grey[300]} borderRadius={2} display="flex" p={2}>
                  <Box borderRadius="50%" bgcolor="white" width="75px" height="75px" mr={2}>
                    <img
                      src=""
                      alt=""
                      style={{ width: '75px', height: '75px', borderRadius: '50%' }}
                    />
                  </Box>
                  <Box>
                    <Typography variant="h6">{bussinessData.owner[0].fullName}</Typography>
                    <Typography>{bussinessData.owner[0].status}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>

            <Grid xs={8}>
              <Box>
                <Typography variant="h5">Contact Info:</Typography>
                <Box bgcolor={grey[300]} borderRadius={2} display="flex" p={2}>
                  <Box>
                    <Typography variant="h6">{bussinessData.address.fullAddress}</Typography>
                    <Typography>{`${bussinessData.address.state}/${bussinessData.address.city}/${bussinessData.address.area}`}</Typography>
                    <Typography>{`Pincode: ${bussinessData.address.pincode}`}</Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* <Box>
            <ContactDetailform fData={bussinessData} />
          </Box> */}
      </Paper>

      <Paper elevation={3} sx={{ p: '1%', width: '100%  ', mb: 2 }}>
        <Box mb={1}>
          <Box display="flex" justifyContent="space-between" alignItems="start">
            <Typography variant="h5" mb={2}>
              Bussiness Hours
            </Typography>
            <Button variant="contained" onClick={handleClickOpen}>
              Add New Time
            </Button>
            <BussinessTimeForm
              open={open}
              handleClose={handleClose}
              fromCall="Add Timings"
              handleReload={handleReload}
              Id={bussinessData._id}
              timeData={{ days: [] }}
            />
          </Box>
          <Box display="flex">
            {bussinessData.bussinessHour.map((itm) => (
              <TimingCards
                timeData={itm}
                key={`${itm.title}_${itm.id}`}
                Id={bussinessData._id}
                handleReload={handleReload}
              />
            ))}
          </Box>
        </Box>
      </Paper>

      <Grid container>
        <Grid xs={6}>
          <Paper elevation={3} sx={{ p: '2%', mb: 2, width: '97%' }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="h5">About Bussiness</Typography>
              <Button variant="contained">Edit</Button>
            </Box>
            <Box>
              <Typography>{bussinessData.description}</Typography>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: '2%', width: '97%', mb: 2 }}>
            <Box display="flex" alignItems="start" justifyContent="space-between">
              <Typography variant="h5" mb={1}>
                Rules & Regulations
              </Typography>
              <Button onClick={handleClickOpenRule} variant="contained">
                Edit
              </Button>
              <RulesForm
                Id={bussinessData._id}
                handleClose={handleClickCloseRule}
                open={openRulesForm}
                rules={bussinessData?.rules}
                fromCall="bussiness"
                handleReload={handleReload}
              />
            </Box>
            <Box>
              <ul>
                {bussinessData?.rules?.map((itm) => (
                  <li key={`${itm}`}>{itm}</li>
                ))}
              </ul>
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: '2%', mb: 2, width: '97%' }}>
            <Box display="flex" justifyContent="space-between" mb={1}>
              <Typography variant="h5">Aminities</Typography>
              <Button variant="contained" onClick={handleAminitieDialogOpen}>
                Edit Aminities
              </Button>
              <AmenitiesManageForm
                // dValues={bussinessData.amenities}

                openDialog={openAminiteDialog}
                handleClose={handleAminitieDialogClose}
                dValues={addDefaultValues()}
                handleReload={handleReload}
                Id={bussinessData?._id}
                fromCall="bussiness"
              />
            </Box>
            <Grid container spacing={2}>
              {bussinessData.amenities_list.map((item) => (
                <Grid item xs={4}>
                  <MasterViewCard cardData={item} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid xs={6}>
          <Paper elevation={3} sx={{ p: '2%', mb: 2, width: '100%' }}>
            <Box mb={2} display="flex" justifyContent="space-between">
              <Typography variant="h5">Activities</Typography>
              <Button variant="contained">Add More</Button>
            </Box>
            <Box>
              <BussinessActivityView bussinessId={bussinessData._id} />
            </Box>
          </Paper>

          <Paper elevation={3} sx={{ p: '2%', width: '100%', mb: 2 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">Gallery</Typography>
              <Button variant="contained">Add Image</Button>
            </Box>

            <ImageList sx={{ width: '100%', height: 400 }} cols={4} rowHeight={200}>
              {itemData.map((item) => (
                <ImageListItem key={item.img}>
                  <img
                    srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                    src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                    alt={item.title}
                    style={{ borderRadius: 10 }}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: '1%', width: '100%', mb: 2 }}>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Typography variant="h5">AddOns</Typography>
          <Button
            variant="contained"
            onClick={() => {
              handleOpenAddonForm('Item');
            }}
          >
            Add Items
          </Button>
          <AddFoodAndItem
            open={openAddonForm}
            handleClose={handleCloseAddonForm}
            bussinessId={bussinessData._id}
            handleReload={handleReload}
          />
        </Box>
        <Box>
          <FoodAndItem bussinessId={bussinessData._id} fromCall="item" />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: '1%', width: '100%', mb: 2 }}>
        <Box mb={1} display="flex" justifyContent="space-between">
          <Typography variant="h5">Food & Bevrages</Typography>

          <Button
            variant="contained"
            onClick={() => {
              handleOpenAddonForm('Food');
            }}
          >
            Add Food
          </Button>
          <AddFoodAndItem
            open={openAddonForm}
            handleClose={handleCloseAddonForm}
            bussinessId={bussinessData._id}
            handleReload={handleReload}
          />
        </Box>
        <Box>
          <FoodAndItem bussinessId={bussinessData._id} fromCall="food" />
        </Box>
      </Paper>
    </Box>
  );
}

export default BussinessInfoView;

//------------------------------------------------------------------------------------

BussinessInfoView.propTypes = {
  bussinessData: PropTypes.object,
  handleReload: PropTypes.func,
};

// TimingCards.propType = {
//   timeData: PropTypes.object,
// };
