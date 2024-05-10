import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { alpha, styled } from '@mui/material/styles';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Paper, Button, MenuItem, TextField, Typography } from '@mui/material';

import { getReq } from 'src/api/api';
import { grey } from 'src/theme/palette';

import FilterDrawer from './RightFilterDrwaer';

// import label from '../label';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),

  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
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

export default function TableFilterToolBar({ fromCall, filterData, setFilterData, handleReload }) {
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [fetchedData, setFetchedData] = useState(false);
  const [customerList, setCustomerList] = useState();

  useEffect(() => {
    if (!fetchedData) {
      fetchCutomerList();
    }
    async function fetchCutomerList() {
      await getReq(`user/list`).then((res) => {
        if (res.statusCode === 200) {
          setCustomerList(res.data);
          setFetchedData(true);
        }
      });
    }
  });

  const handleChangeFromDate = (e) => {
    filterData.fromDate = e.target.value;
    // console.log(filterData);
  };

  const handleChangeToDate = (e) => {
    filterData.toDate = e.target.value;
    // console.log('filterData at form', filterData);
  };

  const handleCutomerSelect = (e) => {
    filterData.userId = e.target.value;
    // console.log(filterData);
  };

  const handleOpenFilter = () => {
    setOpenFilterDialog(true);
  };
  const handleCloseFilter = () => {
    setOpenFilterDialog(false);
  };
  // console.log('filterData', filterData);

  const handleFilterBtn = () => {
    handleReload(false);
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', p: 1, mb: 2 }}>
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="flex-end" width="35%">
          <Box mr={1}>
            <Typography>From Date</Typography>
            <TextField
              type="date"
              inputProps={{ style: { padding: 7 } }}
              onChange={handleChangeFromDate}
            />
          </Box>
          <Box mr={1}>
            <Typography>To Date</Typography>
            <TextField
              type="date"
              inputProps={{ style: { padding: 7 } }}
              onChange={handleChangeToDate}
            />
          </Box>
          {fromCall === 'bookings' || fromCall === 'reports' ? (
            <TextField select fullWidth label="Select Customer" onChange={handleCutomerSelect}>
              {customerList?.map((opt) => (
                <MenuItem key={opt._id} value={opt._id}>
                  {opt.fullName}
                </MenuItem>
              ))}
            </TextField>
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
            <Search sx={{ bgcolor: grey[200], display: 'flex', alignItems: 'center' }}>
              {/* <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper> */}
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              <Button variant="contained" onClick={handleFilterBtn}>
                <SearchIcon />
              </Button>
            </Search>
          </Box>
          {fromCall === 'vendor' ? null : (
            <Box>
              <Button sx={{ pb: 1, pt: 1 }} onClick={handleOpenFilter}>
                <FilterAltIcon />
              </Button>
              <FilterDrawer
                open={openFilterDialog}
                handleClose={handleCloseFilter}
                fromCall={fromCall}
                filterData={filterData}
                setFilterData={setFilterData}
                handleReload={handleReload}
              />
              {/* <FilterDialog
                open={openFilterDialog}
                handleClose={handleCloseFilter}
                fromCall={fromCall}
              /> */}
            </Box>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

TableFilterToolBar.propTypes = {
  fromCall: PropTypes.string,
  handleReload: PropTypes.func,
  filterData: PropTypes.object,
  setFilterData: PropTypes.func,
};
