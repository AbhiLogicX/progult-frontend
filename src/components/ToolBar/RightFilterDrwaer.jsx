import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { MenuItem, TextField, Typography } from '@mui/material';

import { error } from 'src/theme/palette';

const Host = [
  {
    value: 'Default',
    label: 'All Hosts',
  },
  {
    value: 'M Bussiness',
    label: 'M Bussiness',
  },
  {
    value: 'M Bussiness',
    label: 'M Bussiness',
  },
  {
    value: 'M Bussiness',
    label: 'M Bussiness',
  },
];
const Vendor = [
  {
    value: 'Default',
    label: 'All Vendors',
  },
  {
    value: 'Harsh Agrawal',
    label: 'Harsh Agrawal',
  },
  {
    value: 'Vendor 2415',
    label: 'Vendor 2415',
  },
  {
    value: 'Pramod Shukla',
    label: 'Pramod Shukla',
  },
];
const Categoery = [
  {
    value: 'Default',
    label: 'All Categoery',
  },
  {
    value: 'Crircket',
    label: 'Crircket',
  },
  {
    value: 'Music',
    label: 'Music',
  },
  {
    value: 'Yoga',
    label: 'Yoga',
  },
];

const Bussiness = [
  {
    value: 'Default',
    label: 'All Bussiness',
  },
  {
    value: 'M Bussiness',
    label: 'M Bussiness',
  },
  {
    value: 'Guitarist',
    label: 'Guitarist',
  },
  {
    value: 'Music classes',
    label: 'Music classes',
  },
];
const Activity = [
  {
    value: 'Default',
    label: 'All Activity',
  },
  {
    value: 'Swimming',
    label: 'Swimming',
  },
  {
    value: 'Music',
    label: 'Music',
  },
  {
    value: 'zumba',
    label: 'zumba',
  },
];

export default function FilterDrawer({ open, handleClose, fromCall }) {
  const DrawerList = (
    <Box sx={{ width: 350, p: 1 }} role="presentation">
      <Typography variant="h4"> Filter</Typography>
      <TextField label="City" fullWidth sx={{ mb: 1, mt: 1 }} />
      <TextField label="State" fullWidth sx={{ mb: 1 }} />

      {fromCall !== 'customer' ? (
        <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
          {Activity.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      ) : null}
      {fromCall === 'bussiness' || fromCall === 'bookings' ? (
        <>
          <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
            {Categoery.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>

          {fromCall === 'bussiness' ? (
            <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
              {Vendor.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
              {Bussiness.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        </>
      ) : null}

      {fromCall === 'event' ? (
        <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
          {Bussiness.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      ) : null}

      {fromCall === 'event' ? (
        <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
          {Host.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
      ) : null}
      <Box textAlign="right">
        <Button
          onClick={handleClose}
          sx={{
            mr: 1,
            color: error.main,
            backgroundColor: error.errorBackground,
            '&:hover': {
              backgroundColor: error.main,
              color: error.errorBackground,
            },
          }}
        >
          Close
        </Button>
        <Button onClick={handleClose} variant="contained">
          Filter
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box component="div">
      <SwipeableDrawer open={open} onClose={handleClose} anchor="right">
        {DrawerList}
      </SwipeableDrawer>
    </Box>
  );
}

FilterDrawer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  fromCall: PropTypes.string,
};
