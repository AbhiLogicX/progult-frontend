import * as React from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { RouterLink } from 'src/routes/components';

import DialogComponent from '../dialogueForm/DialogComponent';

export default function TableViewBooking({
  columns,
  actionbtn,
  tableData,
  fromCall,
  handleReload,
}) {
  // const location = useLocation().pathname.split('/');
  const date = new Date();

  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }
  // console.log('tableData', tableData, fromCall);
  return (
    <Paper elevation={3} sx={{ width: '100%' }}>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ '& > *': { padding: 1.5 } }}>
              {columns.map((colItem) => (
                <TableCell>{colItem}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {actionbtn
              ? tableData.map((row) => (
                  <TableRow
                    key={row.bookNo}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '& > *': { padding: 1 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      {row.bookNo}
                    </TableCell>
                    <TableCell>
                      {fromCall === 'bussiness' ? row.owner?.fullName : row.customerId?.fullName}
                    </TableCell>
                    <TableCell>
                      {fromCall === 'bussiness' ? row.bussinessId?.title : row.eventId?.title}
                    </TableCell>
                    <TableCell>
                      {`${date.getDate(row.createdAt)}/${date.getMonth(
                        row.createdAt
                      )}/${date.getFullYear(row.createdAt)}`}
                    </TableCell>
                    <TableCell>{row?.totalPayable}</TableCell>
                    <TableCell>{row.isPaid ? 'Paid' : 'Un-Paid'}</TableCell>
                    <TableCell sx={{ display: 'flex' }}>
                      {actionbtn.map((btnItm) => {
                        if (btnItm === 'Delete') {
                          return (
                            <DialogComponent
                              deleteVar="Delete"
                              btnTitle={btnItm}
                              msgTitle={row.title}
                              domainId={row._id}
                              domainCall={`${fromCall}/update-status`}
                              handleReload={handleReload}
                            />
                          );
                        }
                        return (
                          <Button
                            variant="contained"
                            sx={{ mr: 2 }}
                            component={RouterLink}
                            href={`/booking/detail/${fromCall}/${row._id}`}
                          >
                            {btnItm}
                          </Button>
                        );
                      })}
                    </TableCell>
                  </TableRow>
                ))
              : tableData?.map((row) => (
                  <TableRow
                    key={row.fullName}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.bookNo}
                    </TableCell>
                    <TableCell>{row.customerId.fullName}</TableCell>
                    <TableCell>{row.businessId.title}</TableCell>
                    <TableCell>
                      {`${date.getDate(row.createdAt)}/${date.getMonth(
                        row.createdAt
                      )}/${date.getFullYear(row.createdAt)}`}
                    </TableCell>
                    <TableCell>{row?.totalPayable}</TableCell>
                    <TableCell>{row.isPaid ? 'Paid' : 'Un-Paid'}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

TableViewBooking.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
  handleReload: PropTypes.func,
  fromCall: PropTypes.func,
};
