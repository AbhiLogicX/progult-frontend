import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

import properties from 'src/config/properties';

import EditDialogForm from '../dialogueForm/EditDialogForm';
import DialogComponent from '../dialogueForm/DialogComponent';

export default function TableViewMaster({ columns, actionbtn, tableData, fromCall, handleReload }) {
  // const splitFromCall = fromCall.split('/');

  // const handleSubmit = async (titleName, selectedFile, description, idEdit) => {
  //   console.log('Edit btn', titleName, selectedFile, description);
  //   const formData = new FormData();
  //   formData.append('title', titleName);
  //   formData.append('description', description);
  //   formData.append('image', selectedFile);
  //   formData.append('domainId', idEdit);
  //   const result = await patchReq(`${fromCall}`, formData); // we have to handle the success and error
  //   if (result.statusCode === 200) {
  //     handleClose();
  //     handleReload(false);
  //   }

  //   // window.location.reload();
  // };

  // async function handleDeleteClick(id) {
  //   const result = await patchReq(`domain/${fromCall}/detail?Id=${id}&status=delete`);
  //   // window.location.reload();
  // }

  // async function statusButtonHandler(id, status) {
  //   console.log('status patch working');
  //   if (status === 'active') {
  //     const result = await patchReq(`${fromCall}/detail?Id=${id}&status=in-active`);
  //     console.log('Patch call', result);
  //   }
  //   const result = await patchReq(`${fromCall}/detail?Id=${id}&status=in-active`);
  //   console.log('Patch call', result);
  //   // window.location.reload();
  // }

  if (actionbtn && !columns.includes('Action')) {
    columns.push('Action');
  }
  // const BASE_IMG_URL = 'https://proglut.onrender.com/';
  // console.log(tableData);
  return (
    <Paper elevation={3} sx={{ width: '100%' }}>
      <TableContainer component={Box}>
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
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {row.image ? (
                      <TableCell component="th" scope="row">
                        <Box>
                          <img
                            src={`${properties.BASE_DOMAIN_IMAGE_URL}${row.image}`}
                            alt="Cover of master"
                            style={{
                              width: '100px',
                              height: '100px',
                              borderRadius: fromCall === 'master/banner' ? '10%' : '50%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                      </TableCell>
                    ) : null}
                    <TableCell>{row.title}</TableCell>
                    {row.status ? (
                      <TableCell>
                        {/* {row.status === 'in-active' ? (
                          <Button
                            variant="outlined"
                            color="error"
                            onclick={() => statusButtonHandler(row._id, row.status)}
                          >
                            {row.status}
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            color="success"
                            onclick={() => statusButtonHandler(row._id, row.status)}
                          >
                            {row.status}
                          </Button>
                        )} */}
                        <DialogComponent
                          btnTitle={row.status}
                          msgTitle={row.title}
                          statusActive={row.status === 'active' ? row.status : null}
                          domainId={row._id}
                          domainCall={fromCall}
                          handleReload={handleReload}
                        />
                      </TableCell>
                    ) : null}
                    <TableCell>
                      <Box sx={{ display: 'flex' }}>
                        {actionbtn.map((btnItm) => {
                          if (btnItm === 'Delete') {
                            return (
                              // <Button
                              //   variant="contained"
                              //   sx={{ mr: 2 }}
                              //   color="error"
                              //   onClick={() => handleDeleteClick(row._id)}
                              // >
                              //   {btnItm}
                              // </Button>
                              <DialogComponent
                                deleteVar="Delete"
                                btnTitle={btnItm}
                                msgTitle={row.title}
                                domainId={row._id}
                                domainCall={fromCall}
                                handleReload={handleReload}
                              />
                            );
                          }
                          return (
                            <>
                              {/* <Button variant="contained" sx={{ mr: 2 }} onClick={handleClickOpen}>
                                  {btnItm}
                                </Button>
                                <FormDialogue
                                  open={open}
                                  handleClose={handleClose}
                                  handleSubmit={handleSubmit}
                                  fromCall={`Edit ${splitFromCall[1]}`}
                                  idEdit={row._id}
                                /> */}
                              <Box mr={1}>
                                <EditDialogForm
                                  domainCall={fromCall}
                                  mId={row._id}
                                  mdescription={row?.description}
                                  mtitle={row.title}
                                  handleReload={handleReload}
                                />
                              </Box>
                            </>
                          );
                        })}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              : tableData?.map((row) => (
                  <TableRow
                    key={row.title}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    {row.image ? (
                      <TableCell component="th" scope="row">
                        <Box>
                          <img src="/assets/images/images(1).png" alt="master Cover" />
                        </Box>
                      </TableCell>
                    ) : null}
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    {row.status ? <TableCell>{row.status}</TableCell> : null}
                    {row.description ? <TableCell>{row.description}</TableCell> : null}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

TableViewMaster.propTypes = {
  columns: PropTypes.array,
  actionbtn: PropTypes.array,
  tableData: PropTypes.array,
  fromCall: PropTypes.string,
  handleReload: PropTypes.func,
};
