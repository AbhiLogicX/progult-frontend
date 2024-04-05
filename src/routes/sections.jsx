import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const VendorPage = lazy(() => import('src/pages/vendorListPage'));
export const MasterActivityPage = lazy(() => import('src/pages/masterActivityList'));
export const MasterAminitePage = lazy(() => import('src/pages/masterAminiteList'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const AppSettingPage = lazy(() => import('src/pages/appSettingPage'));
// export const ProductsPage = lazy(() => import('src/pages/products'));
export const MasterCategoreyPage = lazy(() => import('src/pages/masterCategorey'));
export const BussinessListPage = lazy(() => import('src/pages/bussinessList'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'vendors', element: <VendorPage /> },
        // { path: 'products', element: <ProductsPage /> },
        { path: 'master/category', element: <MasterCategoreyPage /> },
        { path: 'master/activites', element: <MasterActivityPage /> },
        { path: 'master/aminites', element: <MasterAminitePage /> },
        // { path: 'blog', element: <BlogPage /> },
        // { path: 'Master', element: <Master /> },
        { path: 'bussiness-list', element: <BussinessListPage /> },
        { path: 'app-setting', element: <AppSettingPage /> },
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
