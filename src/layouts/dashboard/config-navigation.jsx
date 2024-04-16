import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'bookings',
    path: '/',
    icon: icon('ic_booking'),
  },
  {
    title: 'Subscriptions',
    path: '/',
    icon: icon('ic_subscription'),
  },
  {
    title: 'bussiness list',
    path: '/bussiness-list',
    icon: icon('ic_city'),
  },
  {
    title: 'event list',
    path: '/evnet-list',
    icon: icon('ic_celenderday'),
  },
  {
    title: 'customers',
    path: '/customers',
    icon: icon('ic_userslist'),
  },
  {
    title: 'vendors',
    path: '/vendors',
    icon: icon('ic_vendor'),
  },
  {
    title: 'reports',
    path: '/',
    icon: icon('ic_reports'),
  },
  {
    title: 'notification',
    path: '/',
    icon: icon('ic_bell'),
  },
  {
    title: 'Master',
    path: '/master ',
    icon: icon('ic_sitemap'),
    subNav: [
      { title: 'Category', icon: icon('ic_masterCategoery'), path: '/master/category' },
      { title: 'Activities', icon: icon(), path: '/master/activites' },
      { title: 'Aminities', icon: icon('ic_magic'), path: '/master/aminities' },
      { title: 'Unit', icon: icon(), path: '/master/unit' },
    ],
  },

  {
    title: 'app settings',
    path: '/app-setting',
    icon: icon('ic_appSettings'),
  },
  // {
  //   title: 'login',
  //   path: '/login',
  //   icon: icon('ic_lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic_disabled'),
  // },
];

export default navConfig;
