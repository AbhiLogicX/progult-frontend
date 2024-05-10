import format from 'date-fns/format';
import { useState, useEffect, useContext } from 'react';

import { Container } from '@mui/material';

import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

import ReportTable from 'src/components/tableView/TableReports';
import TableFilterToolBar from 'src/components/ToolBar/tableFilter';

export default function ReportsView() {
  const { setTitle } = useContext(TitleContext);
  const [fetchedData, setFetchedData] = useState(false);
  const [reportsData, setReportsData] = useState();
  const [filterData, setFilterData] = useState({
    fromDate: '',
    toDate: format(new Date(), 'yyyy-MM-dd'),
    vendorId: '',
    activityId: '',
    domain: '',
    state: '',
    city: '',
    bussinessId: '',
    userId: '',
    hostName: '',
    status: '',
  });
  // report/activityWiseBooking

  const urlStr = `report/activityWiseBooking?${
    filterData.bussinessId !== '' ? `bussinessId=${filterData.bussinessId}` : ''
  }${filterData.activityId !== '' ? `&activityId=${filterData.activityId}` : ''}${
    filterData.state !== '' ? `&state=${filterData.state}` : ''
  }${filterData.city !== '' ? `&city=${filterData.city}` : ''}${
    filterData.fromDate !== '' ? `&fromDate=${filterData.fromDate}` : ''
  }${filterData.toDate !== '' ? `&toDate=${filterData.toDate}` : ''}
  ${filterData.domain !== '' ? `&domain=${filterData.domain}` : ''}
  ${filterData.userId !== '' ? `&userId=${filterData.userId}` : ''}${
    filterData.vendorId !== '' ? `&vendorId=${filterData.vendorId}` : ''
  }${filterData.status !== '' ? `&status=${filterData.status}` : ''}`;

  useEffect(() => {
    if (!fetchedData) {
      fetchReportsData();
    }
    async function fetchReportsData() {
      await getReq(urlStr).then((res) => {
        if (res.statusCode === 200) {
          setReportsData(res.data);
          setFetchedData(true);
        }
        if (res.response.data.statusCode === 404) {
          setReportsData([]);
          setFetchedData(true);
        }
      });
    }
  }, [fetchedData, urlStr]);

  setTitle('Reports');
  return (
    <Container sx={{ p: '1%', overflowX: 'auto', maxWidth: 'unset !important' }}>
      <TableFilterToolBar
        fromCall="reports"
        filterData={filterData}
        setFilterData={setFilterData}
        handleReload={setFetchedData}
      />

      {fetchedData ? <ReportTable reportData={reportsData} /> : null}
    </Container>
  );
}
