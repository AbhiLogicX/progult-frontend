import { useParams } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Paper, Button, Container, Typography } from '@mui/material';
// import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
// import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';

import { getReq } from 'src/api/api';
import { grey, primary } from 'src/theme/palette';
import { TitleContext } from 'src/context/mainContext';

import RulesForm from 'src/components/dialogueForm/RulesAndRegulationForm';

import AddPackageForm from '../PackageForm';
import EventCarousel from '../EventCarousel';
import PackageCard from '../RenderPackageCard';
import AmenitiesManageForm from '../AminitesManage';
import { EventAminitieCard } from '../EventAminitieCard';
import EventInfoDialogForm from '../EditEventDialogInfoForm';

export default function EventDetailview() {
  const [dataFetched, setDataFetched] = useState(false);
  const [data, setData] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [openAminiteDialog, setOpenAminiteDialog] = useState(false);
  const [openRulesForm, setOpenRulesForm] = useState(false);
  const { setTitle } = useContext(TitleContext);

  const handleClickOpenRule = () => {
    setOpenRulesForm(true);
  };

  const handleClickCloseRule = () => {
    setOpenRulesForm(false);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleAminitieDialogClose = () => {
    setOpenAminiteDialog(false);
  };

  const handleAminitieDialogOpen = () => {
    setOpenAminiteDialog(true);
  };
  const id = useParams().eventId;

  useEffect(() => {
    if (!dataFetched) {
      fetchEventData();
    }
    async function fetchEventData() {
      await getReq(`event/detail?Id=${id}`).then((res) => {
        setData(res.data);
        setDataFetched(true);
      });
    }
  }, [dataFetched, id]);

  const date = new Date();

  function addDefaultValues() {
    const defaultAminites = [];
    for (let i = 0; i < data?.amenities?.length; i += 1) {
      const obj = data?.amenities[i];
      if (!defaultAminites.includes(obj._id)) {
        defaultAminites.push(obj._id);
      }
    }
    return defaultAminites;
  }

  // console.log(data);

  setTitle('');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box width="100%">
        {/* <Paper elevation={3} sx={{ p: '1%', mb: 1 }}>
          <EventCarousel imgData={data?.coverImages} />
        </Paper> */}
        <Paper elevation={3} sx={{ mb: 1 }}>
          <Box mb={5}>
            <EventCarousel imgData={data?.coverImages} />
          </Box>

          <Box p="2%" sx={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
            <Grid container>
              <Grid xs={12}>
                {/* <Typography variant="h3">{data?.title}</Typography>
                <Box display="flex">
                  <Typography variant="h5" mr={1}>
                    Hosted By:
                  </Typography>
                  <Typography variant="h5" mr={1}>
                    {data?.hostName}
                  </Typography>
                </Box> */}
                <Typography variant="h2">{data?.title}</Typography>
              </Grid>

              <Grid xs={12}>
                <Box display="flex" justifyContent="space-between">
                  {/* <Box display="flex">
                    <Typography fontWeight={700} mr={1} color={grey[400]}>
                      Domain:
                    </Typography>
                    <Typography fontWeight={700} color={primary.main}>
                      Music
                    </Typography>
                  </Box> */}
                  <Box display="flex">
                    <Typography fontWeight={700} mr={1} color={grey[400]}>
                      Status:
                    </Typography>
                    <Typography fontWeight={700} color={primary.main}>
                      {data?.status}
                    </Typography>
                  </Box>
                  <Box display="flex">
                    <Typography fontWeight={700} mr={1} color={grey[400]}>
                      Host Name:
                    </Typography>
                    <Typography fontWeight={700} color={primary.main}>
                      {data?.hostName}
                    </Typography>
                  </Box>
                  <Button variant="contained" onClick={handleDialogOpen}>
                    Edit Details
                  </Button>
                  <EventInfoDialogForm
                    openDialog={openDialog}
                    handleClose={handleDialogClose}
                    dValues={data}
                    handleReload={setDataFetched}
                  />
                </Box>
              </Grid>

              <Grid xs={2} mr={1}>
                <Typography variant="h6">Event Starts:</Typography>

                <Box p="2%" bgcolor={grey[300]} borderRadius={1}>
                  <Typography variant="h6">{`${date.getDate(
                    data?.dateTime?.startDate
                  )}/${date.getMonth(data?.dateTime?.startDate)}/${date.getFullYear(
                    data?.dateTime?.startDate
                  )}`}</Typography>
                  <Typography variant="h6">{data?.dateTime?.startTime}</Typography>
                </Box>
              </Grid>
              <Grid xs={2}>
                <Typography variant="h6">Event End:</Typography>
              </Grid>
              <Grid xs={7}>
                <Typography variant="h6">Event Venue:</Typography>
              </Grid>
            </Grid>
          </Box>

          {/* <Box textAlign="right">
            <Button variant="contained" onClick={handleDialogOpen}>
              Edit event Info
            </Button>
            <EventInfoDialogForm
              openDialog={openDialog}
              handleClose={handleDialogClose}
              dValues={data}
              handleReload={setDataFetched}
            />
          </Box> */}
        </Paper>

        <Paper elevation={3} sx={{ p: '1%', mb: 1 }}>
          <Typography variant="h5" mb={3}>
            About the Event
          </Typography>

          <Typography>{data?.description}</Typography>
        </Paper>
        <Paper elevation={3} sx={{ p: '1%', mb: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={5}>
            <Typography variant="h5">Event Highlights</Typography>
            <Button variant="contained" onClick={handleAminitieDialogOpen}>
              Edit Aminities
            </Button>
            <AmenitiesManageForm
              openDialog={openAminiteDialog}
              handleClose={handleAminitieDialogClose}
              dValues={addDefaultValues()}
              handleReload={setDataFetched}
              Id={data?._id}
              fromCall="event"
            />
          </Box>
          <Box sx={{ px: '1%' }}>
            <Grid container spacing={2}>
              {data?.amenities.map((itm) => (
                <EventAminitieCard cardData={itm} />
              ))}
            </Grid>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: '1%', mb: 1 }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h5">Rules and Regulations</Typography>
            <Button variant="contained" onClick={handleClickOpenRule}>
              Manage Rules
            </Button>
            <RulesForm
              Id={data?._id}
              handleClose={handleClickCloseRule}
              open={openRulesForm}
              rules={data?.rules}
              handleReload={setDataFetched}
              fromCall="event"
            />
          </Box>
          <Box>
            <ul>
              {data?.rules?.map((itm) => (
                <li key={`${itm}`}>{itm}</li>
              ))}
            </ul>
          </Box>
        </Paper>
        <Paper elevation={3} sx={{ p: '1%', mb: 1 }}>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="h5">Packages</Typography>
            <AddPackageForm eventId={data?._id} handleReload={setDataFetched} />
          </Box>
          <PackageCard
            packagesData={data?.packages}
            eventId={data?._id}
            handleReload={setDataFetched}
          />
        </Paper>
      </Box>
    </Container>
  );
}
