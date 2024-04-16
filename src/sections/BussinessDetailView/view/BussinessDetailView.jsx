import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { Typography } from '@mui/material';
import Container from '@mui/material/Container';

import { getReq } from 'src/api/api';

import BussinessInfoView from '../BussinessInfoView';

export default function BussinessDetailView() {
  const [fetchedData, setFetchedData] = useState(false);
  const [bussinessData, setBussinessData] = useState();
  const currLocation = useLocation().pathname.split('/');

  useEffect(() => {
    async function fetchBussinessData() {
      await getReq(`bussiness/detail?Id=${currLocation[3]}`).then((res) => {
        setBussinessData(res.data[0]);
        setFetchedData(true);
      });
    }
    if (!fetchedData) {
      fetchBussinessData();
    }
  }, [fetchedData, currLocation]);

  return (
    <Container sx={{ mx: '1%' }}>
      {fetchedData ? (
        <BussinessInfoView bussinessData={bussinessData} />
      ) : (
        <Typography variant="h3">Data Fetching</Typography>
      )}
    </Container>
  );
}
