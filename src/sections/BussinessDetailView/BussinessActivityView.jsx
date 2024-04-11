import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Typography } from '@mui/material';

import { getReq } from 'src/api/api';

export function BussinessActivityView({ bussinessId }) {
  const [activityData, setActivityData] = useState();
  const [fetchedData, setFetchedData] = useState(false);

  useEffect(() => {
    if (!fetchedData) {
      fetchIdData();
    }
  });

  async function fetchIdData() {
    await getReq(`bussinessActivity?bussinessId=${bussinessId}`).then((res) => {
      setActivityData(res);
      setFetchedData(true);
      console.log(activityData);
    });
  }

  return <Typography>Bussiness Activity</Typography>;
}

BussinessActivityView.propTypes = {
  bussinessId: PropTypes.string,
};
