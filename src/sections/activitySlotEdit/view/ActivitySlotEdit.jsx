// import { useContext } from 'react';

import { grey } from '@mui/material/colors';
import { Box, Button, Typography } from '@mui/material';

import { error, primary } from 'src/theme/palette';
// import { EditSlotContext } from 'src/context/mainContext';

import LabTabs from 'src/components/menus/TabMenu';

export default function EditSlot() {
  // const { slotData } = useContext(EditSlotContext);

  // console.log('this at edit slot', slotData);
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
            <img
              src="/assets/images/imgPlace.png"
              alt="Bussiness Cover"
              style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
              }}
            />
          </Box>
          <Box>
            <Typography variant="h3">Bussiness Title</Typography>
            <Box display="flex">
              <Typography variant="subtitle1" color={grey[400]} mr={1}>
                Activity:
              </Typography>
              <Typography variant="subtitle1" color={primary.main}>
                Swimming
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          <Button variant="contained">Add Sots</Button>
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
        <LabTabs />
      </Box>
    </Box>
  );
}
