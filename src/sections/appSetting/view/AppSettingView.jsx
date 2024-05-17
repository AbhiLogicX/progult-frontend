import { useState, useEffect, useContext } from 'react';

import Box from '@mui/material/Box';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import AppSettingForm from '../AppSettingForm';

export default function AppSettingView() {
  const { setTitle } = useContext(TitleContext);
  const [fetchedData, setFetchedData] = useState(false);
  const [appSettingData, setAppSettingData] = useState();
  useEffect(() => {
    if (!fetchedData) {
      fetchAppSettingData();
    }
    async function fetchAppSettingData() {
      await getReq(`master/application-setting`).then((res) => {
        if (res.statusCode === 200) {
          setAppSettingData(res.data);
          setFetchedData(true);
        }
      });
    }
  }, [fetchedData]);

  setTitle('App Settings');
  return (
    <Box sx={{ mt: 1, mx: 2 }}>
      {/* <Typography variant="h4" sx={{ mb: 5 }}>
        App Settings
      </Typography> */}
      {fetchedData ? (
        <AppSettingForm AppData={appSettingData} handleReload={setFetchedData} />
      ) : null}
    </Box>
  );
}
