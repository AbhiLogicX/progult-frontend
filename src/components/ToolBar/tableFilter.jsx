import PropTypes from 'prop-types';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import { Box, Paper, MenuItem, TextField, Typography } from '@mui/material';

import { grey } from 'src/theme/palette';
// import label from '../label';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

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

// const Bussiness = [
//   {
//     value: 'Default',
//     label: 'All Host',
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

export default function TableFilterToolBar({ fromCall }) {
  return (
    <Paper elevation={3} sx={{ width: '100%', p: '1%', mb: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="flex-end" width="100%">
          <Box display="flex" alignItems="center" mr={2}>
            <Typography fontWeight={700} mr={1}>
              From Date:
            </Typography>
            <TextField type="date" />
          </Box>
          <Box display="flex" alignItems="center">
            <Typography fontWeight={700} mr={1}>
              To Date:
            </Typography>
            <TextField type="date" />
          </Box>
        </Box>
        <Box display="flex" width="100%" justifyContent="end">
          {fromCall === 'bussiness' || fromCall === 'bookings' ? (
            <Box>
              <TextField select defaultValue="Default">
                {Categoery.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          ) : null}

          <Box>
            <Search sx={{ bgcolor: grey[200], height: 58, display: 'flex', alignItems: 'center' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}

TableFilterToolBar.propTypes = {
  fromCall: PropTypes.string,
};
