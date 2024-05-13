import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { getReq } from 'src/api/api';
import { primary } from 'src/theme/palette';
import properties from 'src/config/properties';
import { BussinessDetailsContext } from 'src/context/mainContext';

// import BussinessActivityDialog from 'src/components/dialogueForm/BussinessActivityDialog';

//  bussinessActivity?bussinessId=66069bfe7f083dba90191320

export function BussinessActivityView({ bussinessId, dataFetched, handleFetchedData }) {
  const [activityData, setActivityData] = useState();

  useEffect(() => {
    if (!dataFetched) {
      fetchActivites();
    }

    async function fetchActivites() {
      await getReq(`bussinessActivity?bussinessId=${bussinessId}`).then((res) => {
        if (res.statusCode === 200) {
          setActivityData(res.data);
          handleFetchedData(true);
          // console.log(res);
        }
      });
    }
  }, [dataFetched, bussinessId, handleFetchedData]);
  // console.log('activityData', activityData);
  return (
    <Grid container>
      {activityData?.map((itm) => (
        <RenderCard crdData={itm} />
      ))}
    </Grid>
  );
}

function RenderCard({ crdData }) {
  const { bussinessDetails } = useContext(BussinessDetailsContext);
  const handleDetailsAct = (title) => {
    bussinessDetails.selectedActiviytSlot = title;
  };
  // const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const handleSumit = () => {
  //   setOpen(false);
  // };
  // console.log(crdData);

  return (
    <Grid xs={3}>
      <Paper elevation={5} sx={{ alignItems: 'center', mr: 2, mb: 1 }}>
        <Box>
          <img
            src={`${properties.BASE_DOMAIN_IMAGE_URL}${crdData?.activityId.image}`}
            alt="activity cover"
            style={{
              aspectRatio: 4 / 3,
              width: '100%',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        </Box>
        <Box p="5%">
          <Typography variant="h6" textAlign="center">
            {crdData?.activityId.title}
          </Typography>
          <Typography fontWeight={500} textAlign="center" mb={1}>
            {`Slots: ${crdData?.slots?.length === undefined ? '' : crdData?.slots?.length}`}
          </Typography>
          <Box
            onClick={() => {
              handleDetailsAct(crdData?.activityId.title);
            }}
          >
            <Button
              sx={{
                bgcolor: 'white',
                color: primary.main,
                '&:hover': {
                  backgroundColor: primary.main,
                  color: 'white',
                },
              }}
              fullWidth
              component={RouterLink}
              href={`/bussiness/detail/${crdData.bussinessId}/editSlots/${crdData._id}`}
            >
              <EditIcon /> Edit
            </Button>
          </Box>
          {/* <BussinessActivityDialog
            openDialog={open}
            handleClose={handleClose}
            handleSubmit={handleSumit}
            dialogData={crdData}
          /> */}
        </Box>
      </Paper>
    </Grid>
  );
}

// BussinessActivityView.propTypes = {
//   bussinessId: PropTypes.string,
// };

BussinessActivityView.propTypes = {
  bussinessId: PropTypes.string,
  dataFetched: PropTypes.bool,
  handleFetchedData: PropTypes.func,
};

RenderCard.propTypes = {
  crdData: PropTypes.object,
};
