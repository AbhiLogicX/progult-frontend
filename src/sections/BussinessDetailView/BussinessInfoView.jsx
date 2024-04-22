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

import TimingCards from 'src/components/cards/TimingSlotCard';
import MasterViewCard from 'src/components/cards/MasterViewCard';
import RulesForm from 'src/components/dialogueForm/RulesAndRegulationForm';
import BussinessTimeForm from 'src/components/dialogueForm/BussinessHourDialog';

import { itemData } from './mockData';
import ContactDetailform from './ContactForm';
import { BussinessActivityView } from './BussinessActivityView';
import { FoodAndItem, AddFoodAndItem } from './BussinessFoodItem';

function BussinessInfoView({ bussinessData, handleReload }) {
  const [open, setOpen] = useState(false);
  const [openRulesForm, setOpenRulesForm] = useState(false);
  const [openAddonForm, setopenAddonForm] = useState(false);

  const handleCloseAddonForm = () => {
    setopenAddonForm(false);
  };
  const handleOpenAddonForm = () => {
    setopenAddonForm(true);
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

  const handleSubmit = async () => {
    // if (result.statusCode === 200) {
    //   handleClose();
    //   handleReload(false);
    // }
    setOpen(false);
  };

  console.log(bussinessData);

  return (
    <Box>
      <Paper elevation={3} sx={{ px: '2%', py: '1%', width: '100%', mb: 2 }}>
        <Box mb={5}>
          <Box sx={{ borderRadius: 0.75, textAlign: 'center', mb: 2 }}>
            <img
              src={`${properties.BASE_BUSSINESS_IMAGE_URL}${bussinessData.coverImage}`}
              alt="Bussiness Cover"
              style={{ width: '100%', aspectRatio: 4 / 1 }}
            />
          </Box>

          <Box>
            <ContactDetailform fData={bussinessData} />
          </Box>
        </Box>

        <Box mb={3}>
          <Box display="flex" justifyContent="space-between" alignItems="start">
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
            {bussinessData.bussinessHour.map((itm) => (
              <TimingCards timeData={itm} key={`${itm.title}_${itm.id}`} />
            ))}
          </Box>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: '1%', width: '100%  ', mb: 2 }}>
        <Typography variant="h5" mb={3}>
          {`About ${bussinessData?.title}`}
        </Typography>
        <Typography>{bussinessData?.description}</Typography>
      </Paper>
      <Paper elevation={3} sx={{ p: '1%', mb: 2, width: '100%' }}>
        <Typography variant="h5" mb={3}>
          Aminities
        </Typography>
        <Grid container spacing={2}>
          {bussinessData.amenities_list.map((item) => (
            <Grid item xs={2}>
              <MasterViewCard cardData={item} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      <Paper elevation={3} sx={{ p: '1%', mb: 2, width: '100%' }}>
        <Typography variant="h5" mb={3}>
          Activities
        </Typography>
        <Box>
          <BussinessActivityView bussinessId={bussinessData._id} />
        </Box>
      </Paper>

      <Paper elevation={3} sx={{ p: '1%', width: '100%', mb: 2 }}>
        <Box display="flex" alignItems="start" justifyContent="space-between">
          <Typography variant="h5" mb={3}>
            Rules & Regulations
          </Typography>
          <Button onClick={handleClickOpenRule} variant="contained">
            Manage Rules
          </Button>
          <RulesForm
            Id={bussinessData._id}
            handleClose={handleClickCloseRule}
            open={openRulesForm}
            rules={bussinessData?.rules}
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
      <Paper elevation={3} sx={{ p: '1%', width: '100%', mb: 2 }}>
        <Typography variant="h5" mb={3}>
          Gallery
        </Typography>
        <ImageList sx={{ width: '100%', height: 600 }} cols={3} rowHeight={500}>
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
      <Paper elevation={3} sx={{ p: '1%', width: '100%', mb: 2 }}>
        <Box mb={3} display="flex" justifyContent="space-between">
          <Typography variant="h5">AddOns</Typography>
          <Button variant="contained" onClick={handleOpenAddonForm}>
            Add Items
          </Button>
          <AddFoodAndItem
            open={openAddonForm}
            fromCall="Item"
            handleClose={handleCloseAddonForm}
            bussinessId={bussinessData._id}
            handleReload={handleReload}
          />
        </Box>
        <Box sx={{ px: '1%' }}>
          <FoodAndItem bussinessId={bussinessData._id} fromCall="item" />
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: '1%', width: '100%', mb: 2 }}>
        <Typography variant="h5" mb={3}>
          Food & Bevrages
        </Typography>
        <Box sx={{ px: '1%' }}>
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
