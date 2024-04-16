import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Backdrop from '@mui/material/Backdrop';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';

import { getReq } from 'src/api/api';

import BussinessInfoView from '../BussinessInfoView';

export default function BussinessDetailView() {
  const [fetchedData, setFetchedData] = useState(false);
  const [bussinessData, setBussinessData] = useState();
  const [loading, setLoading] = useState(true);
  const currLocation = useLocation().pathname.split('/');

  useEffect(() => {
    async function fetchBussinessData() {
      await getReq(`bussiness/detail?Id=${currLocation[3]}`).then((res) => {
        setBussinessData(res.data[0]);
        setFetchedData(true);
        setLoading(false);
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
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
}
