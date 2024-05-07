import * as React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import { RouterLink } from 'src/routes/components';

import DialogComponent from '../dialogueForm/DialogComponent';

export default function TableView({ columns, actionbtn, tableData, fromCall, handleReload }) {
  const location = useLocation().pathname.split('/');

  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }
  // console.log(tableData);

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
              ? tableData?.map((row) => (
                  <TableRow
                    key={row.fullName}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      '& > *': { padding: 1 },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Box>
                        <Typography>{row.fullName}</Typography>
                        <Typography variant="caption">{row.uniqCode}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.mobile}</TableCell>
                    {columns.includes('City/State') && (
                      <TableCell>{`${row?.address?.city || ' '} , ${
                        row?.address?.state || ' '
                      }`}</TableCell>
                    )}
                    <TableCell>{row.status}</TableCell>
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
                            href={`/${location[1]}/detail/${row._id}`}
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

TableView.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
  handleReload: PropTypes.func,
  fromCall: PropTypes.func,
};
