import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: icon('ic_analytics'),
  },
  {
    title: 'vendors',
    path: '/dashboard/vendors',
    icon: icon('ic_user'),
  },
  {
    title: 'users',
    path: '/users',
    icon: icon('ic_user'),
  },
  {
    title: 'Master',
    path: '/master ',
    icon: icon('ic_cart'),
    subNav: [
      { title: 'Category', icon: icon(), path: '/master/category' },
      { title: 'Activities', icon: icon(), path: '/products/category' },
      { title: 'Aminities', icon: icon(), path: '/products/category' },
      { title: 'Unit', icon: icon(), path: '/products/category' },
    ],
  },
  {
    title: 'bussiness list',
    path: '/bussiness-list',
    icon: icon('ic_cart'),
  },
  {
    title: 'app settings',
    path: '/app-setting',
    icon: icon('ic_cart'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
