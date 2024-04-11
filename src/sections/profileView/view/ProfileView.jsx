import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getReq } from 'src/api/api';

import BasicInfoView from '../BasicInfoView';

export default function ProfileView() {
  const [profileData, setProfileData] = useState({});
  const [fetchedData, setFetchedData] = useState(false);

  const { Id } = useParams();

  const location = useLocation().pathname.split('/');

  useEffect(() => {
    if (!fetchedData) {
      fetchIdData();
    }
  });

  async function fetchIdData() {
    if (location[1] === 'vendors') {
      await getReq(`vendor/detail?Id=${Id}`).then((res) => {
        setProfileData(res);
        setFetchedData(true);
      });
    }
    if (location[1] === 'customers') {
      await getReq(`user/detail?Id=${Id}`).then((res) => {
        setProfileData(res);
        setFetchedData(true);
      });
    }
  }

  return (
    <Container component="div" sx={{ mx: '1%' }}>
      <Stack sx={{ width: 1400 }}>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Profile View
        </Typography>
        <Box>
          {fetchedData ? (
            <BasicInfoView profiledata={profileData} handleReload={setFetchedData} />
          ) : null}
        </Box>
      </Stack>
    </Container>
  );
}
