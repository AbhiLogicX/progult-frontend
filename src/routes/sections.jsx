import { Outlet, useRoutes } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';

import { getReq } from 'src/api/api';
import DashboardLayout from 'src/layouts/dashboard';
import CustomerListPage from 'src/pages/CustomerListPage';

export const IndexPage = lazy(() => import('src/pages/app'));
export const VendorPage = lazy(() => import('src/pages/vendorListPage'));
export const MasterActivityPage = lazy(() => import('src/pages/masterActivityList'));
export const MasterAdvertisePage = lazy(() => import('src/pages/masterAdvertise'));
export const MasterAminitiesPage = lazy(() => import('src/pages/masterAminiteList'));
export const MasterUnitPage = lazy(() => import('src/pages/masterUnitList'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const AppSettingPage = lazy(() => import('src/pages/appSettingPage'));
export const ProfileViewPage = lazy(() => import('src/pages/profileViewPage'));
export const MasterCategoreyPage = lazy(() => import('src/pages/masterCategorey'));
export const BussinessListPage = lazy(() => import('src/pages/bussinessList'));
export const EventListPage = lazy(() => import('src/pages/EventListView'));
export const EventDetailViewPage = lazy(() => import('src/pages/eventDetailPage'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const BussinessDetailPage = lazy(() => import('src/pages/BussinessDetailPage'));
export const BookingsPage = lazy(() => import('src/pages/bookingsPage'));
export const SubscriptionPage = lazy(() => import('src/pages/subscriptionPage'));
export const NotificationPage = lazy(() => import('src/pages/NotificationPage'));
export const ReportsPage = lazy(() => import('src/pages/reportsPage'));
export const TermsPage = lazy(() => import('src/pages/termsAndCondition'));
export const PrivacyPage = lazy(() => import('src/pages/privacyAndPolicy'));
export const ContactPage = lazy(() => import('src/pages/contactUsPage'));
export const MasterBannerPage = lazy(() => import('src/pages/masterBannerList'));
export const ActivitySlotEdit = lazy(() => import('src/pages/activitySlotEdit'));
export const BookingDetailsPage = lazy(() => import('src/pages/BookingDetailPage'));
export const AdminProfilePage = lazy(() => import('src/pages/adminProfileView'));
export const FeedbackPages = lazy(() => import('src/pages/Feedbackview'));
export const CuponsPage = lazy(() => import('src/pages/cuponsPage'));
// ----------------------------------------------------------------------

export default function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authStatus = JSON.parse(localStorage.getItem('items'));

  useEffect(() => {
    if (authStatus) {
      getVerify();
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authStatus, isLoggedIn]);

  function getVerify() {
    let verified = false;
    getReq(`admin/detail`).then((res) => {
      if (res.statusCode === 200) {
        verified = true;
      }
    });
    return verified;
  }

  const routes = useRoutes([
    {
      element: isLoggedIn ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <LoginPage />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'vendors', element: <VendorPage /> },
        { path: 'master/category', element: <MasterCategoreyPage /> },
        { path: 'master/aminities', element: <MasterAminitiesPage /> },
        { path: 'master/activites', element: <MasterActivityPage /> },
        { path: 'master/banner', element: <MasterBannerPage /> },
        { path: 'master/advertise', element: <MasterAdvertisePage /> },
        { path: 'customers', element: <CustomerListPage /> },
        { path: 'master/unit', element: <MasterUnitPage /> },
        { path: 'customers/detail/:Id', element: <ProfileViewPage /> },
        { path: 'vendors/detail/:Id', element: <ProfileViewPage /> },
        { path: 'admin/profile', element: <AdminProfilePage /> },
        { path: 'bussiness/detail/:bussinessId', element: <BussinessDetailPage /> },
        { path: 'bussiness-list', element: <BussinessListPage /> },
        { path: 'evnet-list', element: <EventListPage /> },
        { path: 'event/detail/:eventId', element: <EventDetailViewPage /> },
        { path: 'app-setting', element: <AppSettingPage /> },
        { path: 'bookings/event', element: <BookingsPage /> },
        { path: 'bookings/bussiness', element: <BookingsPage /> },
        { path: 'subscriptions', element: <SubscriptionPage /> },
        { path: 'notification', element: <NotificationPage /> },
        { path: 'reports', element: <ReportsPage /> },
        { path: 'coupons', element: <CuponsPage /> },

        {
          path: 'booking/detail/:bookingType/:bookingId',
          element: <BookingDetailsPage />,
        },
        {
          path: 'bussiness/detail/:bussinessId/editSlots/:activityId',
          element: <ActivitySlotEdit />,
        },
        {
          path: 'feedback/reviews',
          element: <FeedbackPages />,
        },
        {
          path: 'feedback/complains',
          element: <FeedbackPages />,
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: 'terms',
      element: <TermsPage />,
    },
    {
      path: 'privacy',
      element: <PrivacyPage />,
    },
    {
      path: 'contactUs',
      element: <ContactPage />,
    },
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
