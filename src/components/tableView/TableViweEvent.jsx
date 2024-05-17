import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import StarIcon from '@mui/icons-material/Star';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { RouterLink } from 'src/routes/components';

import properties from 'src/config/properties';
import { error, primary, customColors } from 'src/theme/palette';

export default function TableViewEvent({ columns, actionbtn, tableData }) {
  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }

  // console.log('td', tableData[0].bussinessId.brandLogo);
  // console.log(tableData);
  return (
    <Paper elevation={3} sx={{ width: '100%' }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((colItem) => (
                <TableCell>{colItem}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {actionbtn
              ? tableData?.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box>
                        {row.brandLogo ? (
                          <img
                            src={`${properties.BASE_BUSSINESS_IMAGE_URL}${row.brandLogo}`}
                            alt="Bussiness Cover"
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 25,
                            }}
                          />
                        ) : (
                          <img
                            src="/assets/images/imgPlace.png"
                            alt="Bussiness Cover"
                            style={{
                              width: 100,
                              height: 100,
                              borderRadius: 25,
                            }}
                          />
                        )}
                      </Box>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {row?.title}
                    </TableCell>
                    <TableCell>{`${row.address.city} / ${row.address.state}`}</TableCell>
                    <TableCell>{row.owner[0].fullName}</TableCell>
                    <TableCell>
                      <Box>{row?.bussinessId?.title}</Box>
                    </TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <StarIcon fontSize="medium" sx={{ mr: 1, color: primary.main }} />
                        {row.rating !== null ? row.rating : 0}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box display="flex">
                        {actionbtn.map((btnItm) => {
                          if (btnItm === 'Delete') {
                            return (
                              <Button
                                variant="contained"
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
                                {btnItm}
                              </Button>
                            );
                          }
                          return (
                            <Button
                              variant="contained"
                              sx={{
                                mr: 1,
                                backgroundColor: customColors.orangePrimary,
                                '&:hover': {
                                  backgroundColor: customColors.darkOrange,
                                },
                              }}
                              component={RouterLink}
                              href={`/event/detail/${row._id}`}
                            >
                              {btnItm}
                            </Button>
                          );
                        })}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              : tableData.map((row) => (
                  <TableRow
                    key={row.fullName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.fullName}
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    <TableCell>{row.status}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

TableViewEvent.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
};
