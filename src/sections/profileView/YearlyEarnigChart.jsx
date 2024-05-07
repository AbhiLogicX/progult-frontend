/* eslint-disable */
import PropType from 'prop-types';
import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { Box } from '@mui/material';

import { UtilsMothns } from 'src/utils/formatChart';

import { primary } from 'src/theme/palette';
import { getReq } from 'src/api/api';

const labels = UtilsMothns.months({ count: 12 });

function LineChart({ id }) {
  const [fetchedData, setFetchedData] = useState(false);
  const [earningsData, setEarningsData] = useState();

  useEffect(() => {
    if (!fetchedData) {
      fetchEarnigData();
    }

    async function fetchEarnigData() {
      await getReq(`report/getMonthwiseVendorEarning?vendorId=${id}`).then((res) => {
        if (res.statusCode === 200) {
          setEarningsData(res.data);
          setFetchedData(true);
        }
      });
    }
  }, [fetchedData]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Yearly Earnings',
        backgroundColor: primary.main,
        borderColor: primary.main,
        data: earningsData
          ? earningsData.data3
          : [100, 500, 100, 1000, 2500, 5000, 4444, 1333, 4565],
      },
    ],
  };

  return <Box>{fetchedData ? <Line data={data} /> : <Line data={data} />}</Box>;
}
export default LineChart;

LineChart.propTypes = {
  id: PropType.string,
};
