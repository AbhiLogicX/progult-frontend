import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';

import { Box } from '@mui/material';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import FeedBackTable from 'src/components/tableView/TableFeedback';

export default function FeedbackView() {
  const [fetchedReviewData, setFetchedReviewData] = useState(false);
  const [fetchedComplainData, setFetchedComplainData] = useState(false);
  const [reviewData, setReviewData] = useState();
  const [ComplainData, setComplainData] = useState();
  const location = useLocation().pathname.split('/');
  const { setTitle } = useContext(TitleContext);
  // console.log(location);
  useEffect(() => {
    if (location[2] === 'reviews' && !fetchedReviewData) {
      fetchFeedbackData();
    }
    if (location[2] === 'complains' && !fetchedComplainData) {
      fetchFeedbackData();
    }
    async function fetchFeedbackData() {
      // if (location[2] === 'reviews'){

      // }
      if (location[2] === 'complains') {
        await getReq(`master/complaint`).then((res) => {
          if (res.statusCode === 200) {
            setComplainData(res.data);
            setFetchedComplainData(true);
          }
        });
      }
      if (location[2] === 'reviews') {
        await getReq(`bussiness/review`).then((res) => {
          if (res.statusCode === 200) {
            setReviewData(res.data);
            setFetchedReviewData(true);
          }
        });
      }
    }
  }, [location, fetchedComplainData, fetchedReviewData]);
  // console.log(ComplainData);

  // console.log('data', reviewData);

  const complainCol = ['Complaint No', 'Complaint', 'User', 'Complaint On', 'Created On'];
  const reviwCol = ['Name', 'Review', 'Rating', 'Review On', 'Created On'];
  setTitle(location[2] === 'complains' ? 'Complaints' : 'Reviews');
  return (
    <Box sx={{ mx: 2, mt: 1 }}>
      <FeedBackTable
        tableCol={location[2] === 'complains' ? complainCol : reviwCol}
        tableData={location[2] === 'complains' ? ComplainData : reviewData}
        fromCall={location[2] === 'complains' ? 'complaint' : 'review'}
      />
    </Box>
  );
}
