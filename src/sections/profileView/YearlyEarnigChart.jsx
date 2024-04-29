/* eslint-disable */
import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';

import { Box } from '@mui/material';

import { UtilsMothns } from 'src/utils/formatChart';

import { primary } from 'src/theme/palette';

const labels = UtilsMothns.months({ count: 12 });
const data = {
  labels,
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: primary.main,
      borderColor: primary.main,
      data: [100, 500, 100, 1000, 2500, 5000, 4444, 1333, 4565],
    },
  ],
};
function LineChart() {
  return (
    <Box>
      <Line data={data} />
    </Box>
  );
}
export default LineChart;
