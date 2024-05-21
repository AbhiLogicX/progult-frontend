import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Backdrop, CircularProgress } from '@mui/material';
// import Typography from '@mui/material/Typography';

import { getReq } from 'src/api/api';

import BasicInfoView from '../BasicInfoView';

export default function ProfileView() {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      });
    }
    if (location[1] === 'customers') {
      await getReq(`user/detail?Id=${Id}`).then((res) => {
        setProfileData(res);
        setFetchedData(true);
        setLoading(false);
      });
    }
  }
  // console.log(profileData);
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <Box width="100%">
        {fetchedData ? (
          <BasicInfoView profiledata={profileData} handleReload={setFetchedData} />
        ) : (
          <Backdrop
            open={loading}
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </Box>
    </Container>
  );
}
