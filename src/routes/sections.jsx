import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import CustomerListPage from 'src/pages/CustomerListPage';

export const IndexPage = lazy(() => import('src/pages/app'));
export const VendorPage = lazy(() => import('src/pages/vendorListPage'));
// export const BlogPage = lazy(() => import('src/pages/blog'));
// export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
// export const AppSettingPage = lazy(() => import('src/pages/appSettingPage'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const MasterCategoreyPage = lazy(() => import('src/pages/masterCategorey'));
// export const BussinessListPage = lazy(() => import('src/pages/bussinessList'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const authStatus = JSON.parse(localStorage.getItem("items"))
  useEffect(() => {

    if (authStatus) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

  }, [authStatus,isLoggedIn])

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
        // { path: 'products', element: <ProductsPage /> },
        { path: 'master/category', element: <MasterCategoreyPage /> },
        { path: 'customers', element: <CustomerListPage /> },
        // { path: 'blog', element: <BlogPage /> },
        // { path: 'Master', element: <Master /> },
        // { path: 'bussiness-list', element: <BussinessListPage /> },
        // { path: 'bussiness-list', element: <BussinessListPage /> },
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
