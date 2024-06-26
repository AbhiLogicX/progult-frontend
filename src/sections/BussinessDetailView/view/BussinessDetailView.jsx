import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { Container } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import BussinessInfoView from '../BussinessInfoView';

export default function BussinessDetailView() {
  const [fetchedGalleryData, setFetchedGalleryData] = useState(false);
  const [gallery, setGallery] = useState();
  const [fetchedData, setFetchedData] = useState(false);
  const [bussinessData, setBussinessData] = useState();
  const [loading, setLoading] = useState(true);
  const currLocation = useLocation().pathname.split('/');
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    async function fetchBussinessData() {
      await getReq(`bussiness/detail?Id=${currLocation[3]}`).then((res) => {
        setBussinessData(res.data[0]);
        setFetchedData(true);
        setLoading(false);
      });
    }
    async function fetchBussinessGallery() {
      await getReq(`bussiness/gallery?bussinessId=${currLocation[3]}`).then((res) => {
        setGallery(res.data);
        setFetchedGalleryData(true);
      });
    }
    if (!fetchedData) {
      fetchBussinessData();
    }
    if (!fetchedGalleryData) {
      fetchBussinessGallery();
    }
  }, [fetchedData, currLocation, fetchedGalleryData]);
  setTitle('Businesses');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      {fetchedData && fetchedGalleryData ? (
        <BussinessInfoView
          bussinessData={bussinessData}
          handleReload={setFetchedData}
          gallery={gallery}
          handleGalleryReload={setFetchedGalleryData}
        />
      ) : (
        <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Container>
  );
}
