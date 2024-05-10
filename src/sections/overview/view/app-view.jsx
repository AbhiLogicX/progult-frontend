import { useState, useEffect, useContext } from 'react';
// import { faker } from '@faker-js/faker';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// import Typography from '@mui/material/Typography';

// import Iconify from 'src/components/iconify';
import { getReq } from 'src/api/api';
import { TitleContext } from 'src/context/mainContext';

// import AppTasks from '../app-tasks';
// import AppNewsUpdate from '../app-news-update';
// import AppOrderTimeline from '../app-order-timeline';
// import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';
// import AppTrafficBySite from '../app-traffic-by-site';
// import AppCurrentSubject from '../app-current-subject';
// import AppConversionRates from '../app-conversion-rates';

// ----------------------------------------------------------------------

export default function AppView() {
  const [fetchedData, setFetchedData] = useState(false);
  const [dashData, setDashData] = useState();
  const [monthWiseData, setMonthWiseData] = useState();
  const [categoryWiseData, setcategoryWiseData] = useState();
  const { setTitle } = useContext(TitleContext);

  useEffect(() => {
    if (!fetchedData) {
      fetchDashData();
    }
    async function fetchDashData() {
      await getReq(`report/dashboardCounts`).then((res) => {
        setDashData(res.data);
      });
      await getReq(`report/monthwiseBussiness`).then((res) => {
        // console.log('month', res.data);
        setMonthWiseData(res.data);
      });
      await getReq(`report/categoryWiseBussiness`).then((res) => {
        setcategoryWiseData(res.data);
      });
      setFetchedData(true);
    }
  }, [fetchedData]);

  setTitle('Dashboard');
  return (
    <Container maxWidth="xl" sx={{ mt: 1 }}>
      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Monthly Booking"
            total={dashData?.monthlyBussiness}
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            pathRe="/bookings/bussiness"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Coustmers"
            total={dashData?.totalCustomer}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            pathRe="/customers"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Bussiness Listed"
            total={dashData?.totalBussiness}
            color="warning"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            pathRe="/bussiness-list"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Event Listed"
            total={dashData?.totalEvent}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
            pathRe="/evnet-list"
          />
        </Grid>

        <Grid xs={12} md={6} lg={12}>
          <AppWebsiteVisits
            title="Bussinesses"
            chart={{
              labels: monthWiseData?.label,
              series: [
                {
                  name: 'Monthly bussiness',
                  type: 'column',
                  fill: 'solid',
                  data: monthWiseData?.data1,
                },
                {
                  name: 'Monthly Event',
                  type: 'area',
                  fill: 'gradient',
                  data: monthWiseData?.data2,
                },
                {
                  name: 'Monthly Bussiness Booking',
                  type: 'line',
                  fill: 'solid',
                  data: monthWiseData?.data3,
                },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="Bussinesses in States"
            chart={{
              series: [
                { label: 'Delhi', value: 4344 },
                { label: 'Chhattisgarh', value: 5435 },
                { label: 'Karnataka', value: 1443 },
                { label: 'Telangana', value: 4443 },
              ],
            }}
          />
        </Grid> */}
        <Grid xs={12}>
          <AppWebsiteVisits
            title="Categories"
            chart={{
              labels: categoryWiseData?.label,
              series: [
                {
                  name: 'Dance',
                  type: 'column',
                  fill: 'solid',
                  data: categoryWiseData?.data,
                },
              ],
            }}
          />
        </Grid>

        {/* <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid> */}

        {/* <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid> */}
      </Grid>
    </Container>
  );
}
