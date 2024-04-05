import * as React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Image } from '@mui/icons-material';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function TableViewBussiness({ columns, actionbtn, tableData }) {
  console.log('This is table data', tableData);
  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }

  return (
    <TableContainer component={Paper} sx={{ mx: 0 }}>
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
            ? tableData.map((row) => (
                <TableRow key={row._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    <Box>
                      <Image src="/assets/images/images(1).png" alt="Image is rendering" />
                    </Box>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>
                  <TableCell>{row.domain[0].title}</TableCell>
                  <TableCell>{`${row.address.city} / ${row.address.state}`}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>{row.owner[0].fullName}</TableCell>
                  <TableCell>Active</TableCell>
                  <TableCell>{`${row.rating} / ${row.reviewcount}`}</TableCell>
                  <TableCell>
                    {actionbtn.map((btnItm) => {
                      if (btnItm === 'Delete') {
                        return (
                          <Button variant="contained" sx={{ mr: 2 }} color="error">
                            {btnItm}
                          </Button>
                        );
                      }
                      return (
                        <Button variant="contained" sx={{ mr: 2 }}>
                          {btnItm}
                        </Button>
                      );
                    })}
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
  );
}

TableViewBussiness.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
};
