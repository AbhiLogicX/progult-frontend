import { useState,useEffect } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';
import ListItemButton from '@mui/material/ListItemButton';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { account } from 'src/_mock/account';

import Logo from 'src/components/logo';
import Scrollbar from 'src/components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();

  const upLg = useResponsive('up', 'lg');

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}
    >
      <Avatar src={account.photoURL} alt="photoURL" />

      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">{account.displayName}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  // const renderUpgrade = (
  //   <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
  //     <Stack alignItems="center" spacing={3} sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
  //       <Box
  //         component="img"
  //         src="/assets/illustrations/illustration_avatar.png"
  //         sx={{ width: 100, position: 'absolute', top: -50 }}
  //       />

  //       <Box sx={{ textAlign: 'center' }}>
  //         <Typography variant="h6">Get more?</Typography>

  //         <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
  //           From only $69
  //         </Typography>
  //       </Box>

  //       <Button
  //         href="https://material-ui.com/store/items/minimal-dashboard/"
  //         target="_blank"
  //         variant="contained"
  //         color="inherit"
  //       >
  //         Upgrade to Pro
  //       </Button>
  //     </Stack>
  //   </Box>
  // );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}
    >
      <Logo sx={{ mt: 3, ml: 4, mb: 5 }} />

      {/* {renderAccount} */}

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
        backgroundColor: '#212b36',
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

// ----------------------------------------------------------------------

function CollapseableMenu({ propItem }) {
  const pathname = usePathname();
  const active = propItem.path === pathname;
  return (
    <Box
      component="div"
      disablePadding
      sx={{ width: '100%', borderRadius: 0.75, color: '#ffffff' }}
    >
      <ListItemButton component={RouterLink} href={propItem.path}>
        <ListItemIcon>
          <StarBorder />
        </ListItemIcon>
        <ListItemText primary={propItem.title} />
      </ListItemButton>
    </Box>
  );
}

function NavItem({ item }) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const active = item.path === pathname;
  return (
    <ListItemButton
      onClick={item.subNav ? handleClick : null}
      component={item.subNav ? null : RouterLink}
      href={item.subNav ? null : item.path}
      sx={{
        minHeight: 44,
        borderRadius: 0.75,
        typography: 'body2',
        color: 'text.white',
        textTransform: 'capitalize',
        fontWeight: 'fontWeightMedium',
        ...(active && {
          color: 'primary.main',
          fontWeight: 'fontWeightSemiBold',
          bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          '&:hover': {
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
          },
        }),
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100%' }}
      >
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ width: 24, height: 24, mr: 2 }}>{item.icon}</Box>
          <Box component="span" sx={{ display: 'flex' }}>
            <Box>{item.title}</Box>
            <Box>{item.subNav ? <>{open ? <ExpandLess /> : <ExpandMore />}</> : null}</Box>
          </Box>
        </Box>
        {item.subNav ? (
          <Collapse in={open} timeout="auto" unmountOnExit>
            {item.subNav.map((subItem) => (
              <CollapseableMenu propItem={subItem} />
            ))}
          </Collapse>
        ) : null}
      </Box>
    </ListItemButton>
  );
}

NavItem.propTypes = {
  item: PropTypes.object,
};

CollapseableMenu.propTypes = {
  propItem: PropTypes.object,
};
