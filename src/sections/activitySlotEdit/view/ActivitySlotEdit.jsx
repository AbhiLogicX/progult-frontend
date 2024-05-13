import { useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';

import { grey } from '@mui/material/colors';
import { Box, Button, Typography } from '@mui/material';

import properties from 'src/config/properties';
import { error, primary } from 'src/theme/palette';
import { BussinessDetailsContext } from 'src/context/mainContext';

import LabTabs from 'src/components/menus/TabMenu';
import BussActivityTimeForm from 'src/components/menus/AddEditSlotDialog';

export default function EditSlot() {
  const { bussinessDetails } = useContext(BussinessDetailsContext);
  // const { slotData } = useContext(EditSlotContext);
  const [fetchedSlotData, setFetchedSlotData] = useState(false);
  const locationVars = useLocation().pathname.split('/');
  // console.log('this at edit slot', slotData);

  // console.log('bussinessDetails', bussinessDetails);
  return (
    <Box width="100%">
      <Box
        bgcolor="white"
        p={2}
        borderRadius={1}
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box display="flex" alignItems="center">
          <Box mr={2}>
            {bussinessDetails.brandLogo ? (
              <img
                src={`${properties.BASE_BUSSINESS_IMAGE_URL}${bussinessDetails.brandLogo}`}
                alt="Bussiness Cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                }}
              />
            ) : (
              <img
                src="/assets/images/imgPlace.png"
                alt="Bussiness Cover"
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                }}
              />
            )}
          </Box>
          <Box>
            <Typography variant="h3">{bussinessDetails.title}</Typography>
            <Box display="flex">
              <Typography variant="subtitle1" color={grey[400]} mr={1}>
                Activity:
              </Typography>
              <Typography variant="subtitle1" color={primary.main}>
                {bussinessDetails.selectedActiviytSlot}
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <BussActivityTimeForm
            fromCall="add"
            bussActivityId={locationVars[5]}
            handleReload={setFetchedSlotData}
          />
          <Button
            sx={{
              ml: 1,
              color: error.main,
              bgcolor: error.errorBackground,
              '&:hover': {
                backgroundColor: error.main,
                color: error.errorBackground,
              },
            }}
          >
            Remove
          </Button>
        </Box>
      </Box>
      <Box>
        <LabTabs
          bussActivityId={locationVars[5]}
          fetchedSlotData={fetchedSlotData}
          setFetchedSlotData={setFetchedSlotData}
        />
      </Box>
    </Box>
  );
}
