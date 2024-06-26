import { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import { TitleProvider, BussinessDetailProvider } from 'src/context/mainContext';

import Nav from './nav';
import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <TitleProvider>
      <BussinessDetailProvider>
        <Header onOpenNav={() => setOpenNav(true)} />
        <Box
          sx={{
            minHeight: 1,
            display: 'flex',
            flexDirection: { xs: 'column', lg: 'row' },
          }}
        >
          <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
          <Main>{children}</Main>
        </Box>
      </BussinessDetailProvider>
    </TitleProvider>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
