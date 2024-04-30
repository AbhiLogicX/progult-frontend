import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { grey } from '@mui/material/colors';
import TabContext from '@mui/lab/TabContext';
import EditIcon from '@mui/icons-material/Edit';
import { Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
// import TabList from '@mui/lab/TabList';

import { error, primary } from 'src/theme/palette';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <TabContext value={value}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            mb: 3,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            sx={{
              bgcolor: grey[200],
              width: '98%',
              display: 'flex',
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
            }}
          >
            <Tab value="1" label="Monday" />
            <Tab value="2" label="Tuesday" />
            <Tab value="3" label="Wednesday" />
            <Tab value="4" label="Thursday" />
            <Tab value="5" label="Friday" />
            <Tab value="6" label="Saturday" />
            <Tab value="7" label="Sunday" />
          </Tabs>
        </Box>

        <Box sx={{ width: '100%' }}>
          <TabPanel value="1">
            <Box display="flex" flexWrap="wrap">
              <RenderCard />
              <RenderCard />
              <RenderCard />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <Box display="flex" flexWrap="wrap">
              <RenderCard />
            </Box>
          </TabPanel>
          <TabPanel value="3">
            <Box display="flex" flexWrap="wrap">
              <RenderCard />
              <RenderCard />
            </Box>
          </TabPanel>
          <TabPanel value="4">Item Four</TabPanel>
          <TabPanel value="5">Item Five</TabPanel>
          <TabPanel value="6">Item Six</TabPanel>
          <TabPanel value="7">Item Seven</TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}

function RenderCard({ data }) {
  return (
    <Box bgcolor="white" p={2} borderRadius={2} mr={2} mb={2}>
      <Box display="flex" alignItems="flex-end">
        <Typography variant="h4">₹149</Typography>
        <Typography variant="h6">/ head</Typography>
      </Box>
      <Typography variant="subtitle1" mb={1}>
        05:00AM to 10:00AM
      </Typography>
      <Box>
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
        >
          <DeleteIcon /> Delete
        </Button>
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
        >
          <EditIcon /> Edit
        </Button>
      </Box>
    </Box>
  );
}

RenderCard.propTypes = {
  data: PropTypes.object,
};
