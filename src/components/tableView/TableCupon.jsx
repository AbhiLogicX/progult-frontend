import * as React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { deleteReq } from 'src/api/api';
import { error } from 'src/theme/palette';

import CouponDialogForm from '../dialogueForm/EditCuponDialog';

export default function CouponTableView({ columns, actionbtn, tableData, handleReload }) {
  const [openEditForm, setOpenEditForm] = React.useState(false);

  const handleOpenForm = () => {
    setOpenEditForm(true);
  };

  const handleCloseForm = () => {
    setOpenEditForm(false);
  };

  const handleDelete = async (cupId) => {
    // console.log(cupId);
    await deleteReq(`domain/coupon?Id=${cupId}&status=delete`);
    handleReload(false);
    // domain/coupon?Id=663b69d2673fd6e8367b4096&status=delete
  };

  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }

  // console.log('coupon', tableData);

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
                    {/* <TableCell component="th" scope="row">
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
                    </TableCell> */}
                    <TableCell component="th" scope="row">
                      {row.code}
                    </TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{`₹${row.minAmt}`}</TableCell>
                    <TableCell>
                      {row.disType === 'flat' ? `flat ₹${row.discount}` : `${row.discount}%`}
                    </TableCell>
                    <TableCell>{`${format(new Date(row.startDate), 'dd-MMM-yyyy')} to ${format(
                      new Date(row.endDate),
                      'dd-MMM-yyyy'
                    )}`}</TableCell>
                    {/* <TableCell>{row.domain[0].title}</TableCell>
                    <TableCell>{`${row.address.city} / ${row.address.state}`}</TableCell>
                    <TableCell>{row.owner[0].fullName}</TableCell>
                    <TableCell>{row.status}</TableCell> */}
                    {/* <TableCell>
                      {' '}
                      <Box display="flex">
                        <StarIcon fontSize="medium" sx={{ mr: 1, color: primary.main }} />
                        {row.rating ? row.rating : 0}
                      </Box>
                    </TableCell> */}
                    <TableCell>
                      <Box display="flex">
                        {actionbtn.map((btnItm) => {
                          if (btnItm === 'Delete') {
                            return (
                              <Button
                                sx={{
                                  mr: 2,
                                  color: error.main,
                                  backgroundColor: error.errorBackground,
                                  '&:hover': {
                                    backgroundColor: error.main,
                                    color: error.errorBackground,
                                  },
                                }}
                                onClick={() => {
                                  handleDelete(row._id);
                                }}
                              >
                                {btnItm}
                              </Button>
                            );
                          }
                          return (
                            <Button variant="contained" sx={{ mr: 1 }} onClick={handleOpenForm}>
                              {btnItm}
                            </Button>
                          );
                        })}
                        <CouponDialogForm
                          open={openEditForm}
                          handleClose={handleCloseForm}
                          cupDetails={row}
                          fromCall="edit"
                          handleReload={handleReload}
                        />
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

CouponTableView.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
  handleReload: PropTypes.func,
};
