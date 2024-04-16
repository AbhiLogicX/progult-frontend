import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Box, Grid } from '@mui/material';

import { getReq } from 'src/api/api';

import AddonCards from './AddonCards';

export function FoodAndItem({ bussinessId, fromCall }) {
  const [data, setData] = useState();
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await getReq(`${fromCall}?bussinessId=${bussinessId}`).then((res) => {
        setData(res.data);
        setDataFetched(true);
      });
    }
    if (!dataFetched) {
      fetchData();
    }
  }, [dataFetched, bussinessId, fromCall]);
  return (
    <Box>
      <Grid container>
        {data?.map((dataItm) => (
          <Grid xs={4} mb={1}>
            <AddonCards
              data={dataItm}
              key={`${dataItm.title}${bussinessId}`}
              handleAddonReload={dataFetched}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

// food?bussinessId=66069bfe7f083dba90191320

FoodAndItem.propTypes = {
  fromCall: PropTypes.string,
  bussinessId: PropTypes.string,
};
