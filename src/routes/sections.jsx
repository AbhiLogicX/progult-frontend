import { Outlet, useRoutes } from 'react-router-dom';
import { lazy, Suspense, useState, useEffect } from 'react';

import DashboardLayout from 'src/layouts/dashboard';
import CustomerListPage from 'src/pages/CustomerListPage';

export const IndexPage = lazy(() => import('src/pages/app'));
export const VendorPage = lazy(() => import('src/pages/vendorListPage'));
export const MasterActivityPage = lazy(() => import('src/pages/masterActivityList'));
export const MasterAminitiesPage = lazy(() => import('src/pages/masterAminiteList'));
export const MasterUnitPage = lazy(() => import('src/pages/masterUnitList'));
export const LoginPage = lazy(() => import('src/pages/login'));
// export const AppSettingPage = lazy(() => import('src/pages/appSettingPage'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const MasterCategoreyPage = lazy(() => import('src/pages/masterCategorey'));
export const BussinessListPage = lazy(() => import('src/pages/bussinessList'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const authStatus = JSON.parse(localStorage.getItem('items'));
  useEffect(() => {
    if (authStatus) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authStatus, isLoggedIn]);

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
        { path: 'customers', element: <CustomerListPage /> },
        { path: 'master/unit', element: <MasterUnitPage /> },
        // { path: 'Master', element: <Master /> },
        { path: 'bussiness-list', element: <BussinessListPage /> },
        // { path: 'app-setting', element: <AppSettingPage /> },
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
    // {
    //   path: '*',
    //   element: <Navigate to="/404" replace />,
    // },
  ]);

  return routes;
}
