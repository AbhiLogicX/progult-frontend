/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';

// import axios from 'axios';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import ThemeProvider from 'src/theme';
import Router from 'src/routes/sections';
import { UserDetailProvider } from './context/mainContext';

// axios.defaults.withCredentials = true;
// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <UserDetailProvider>
        <Router />
      </UserDetailProvider>
    </ThemeProvider>
  );
}
