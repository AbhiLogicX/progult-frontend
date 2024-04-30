import { useState } from 'react';
import PropTypes from 'prop-types';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Paper, Button, MenuItem, TextField, Typography } from '@mui/material';

import { grey } from 'src/theme/palette';

import FilterDialog from './filterDialog';
// import label from '../label';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 1),
    // vertical padding + font size from searchIcon

    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Customer = [
  {
    value: 'Default',
    label: 'All Customer',
  },
  {
    value: 'Pramod Shukla',
    label: 'Pramod Shukla',
  },
  {
    value: 'Mukul',
    label: 'Mukul',
  },
  {
    value: 'Test user 1',
    label: 'Test user 1',
  },
];

// const Bussiness = [
//   {
//     value: 'Default',
//     label: 'All Bussiness',
//   },
//   {
//     value: 'M Bussiness',
//     label: 'M Bussiness',
//   },
//   {
//     value: 'Guitarist',
//     label: 'Guitarist',
//   },
//   {
//     value: 'Music classes',
//     label: 'Music classes',
//   },
// ];

// const Vendor = [
//   {
//     value: 'Default',
//     label: 'All Vendors',
//   },
//   {
//     value: 'Harsh Agrawal',
//     label: 'Harsh Agrawal',
//   },
//   {
//     value: 'Vendor 2415',
//     label: 'Vendor 2415',
//   },
//   {
//     value: 'Pramod Shukla',
//     label: 'Pramod Shukla',
//   },
// ];

// const Host = [
//   {
//     value: 'Default',
//     label: 'All Hosts',
//   },
//   {
//     value: 'M Bussiness',
//     label: 'M Bussiness',
//   },
//   {
//     value: 'M Bussiness',
//     label: 'M Bussiness',
//   },
//   {
//     value: 'M Bussiness',
//     label: 'M Bussiness',
//   },
// ];

export default function TableFilterToolBar({ fromCall }) {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilterDialog(true);
  };
  const handleCloseFilter = () => {
    setOpenFilterDialog(false);
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', p: '1%', mb: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="flex-end">
          <Box mr={1}>
            <Typography fontWeight={700}>From Date</Typography>
            <TextField type="date" />
          </Box>
          <Box mr={1}>
            <Typography fontWeight={700}>To Date</Typography>
            <TextField type="date" />
          </Box>
          {fromCall === 'bookings' ? (
            <Box>
              <TextField select defaultValue="Default">
                {Customer.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          ) : null}
        </Box>

        <Box display="flex" justifyContent="end" alignItems="center">
          {/* {fromCall === 'bussiness' || fromCall === 'bookings' ? (
            <Box>
              <TextField select defaultValue="Default" sx={{ ml: 1, mb: 1 }}>
                {Categoery.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>

              {fromCall === 'bussiness' ? (
                <TextField select defaultValue="Default" sx={{ ml: 1, mr: 1 }}>
                  {Vendor.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField select defaultValue="Default" sx={{ ml: 1, mr: 1 }}>
                  {Bussiness.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            </Box>
          ) : null}

          {fromCall === 'event' ? (
            <TextField select defaultValue="Default" sx={{ ml: 1, mr: 1 }}>
              {Bussiness.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          ) : null}

          {fromCall === 'event' ? (
            <TextField select defaultValue="Default" sx={{ ml: 1, mr: 1 }}>
              {Host.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>
          ) : null} */}
          <Box Box display="flex" alignItems="center">
            <Search sx={{ bgcolor: grey[200], height: 58, display: 'flex', alignItems: 'center' }}>
              {/* <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper> */}
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              <Button variant="contained" sx={{ pt: 1.2, pb: 1.2, mr: 1 }}>
                <SearchIcon />
              </Button>
            </Search>
          </Box>
          {fromCall === 'vendor' ? null : (
            <Box>
              <Button sx={{ pb: 1, pt: 1 }} onClick={handleOpenFilter}>
                <FilterAltIcon />
              </Button>
              <FilterDialog
                open={openFilterDialog}
                handleClose={handleCloseFilter}
                fromCall={fromCall}
              />
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

TableFilterToolBar.propTypes = {
  fromCall: PropTypes.string,
};
