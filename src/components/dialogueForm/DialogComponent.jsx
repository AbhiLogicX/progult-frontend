import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { patchReq } from 'src/api/api';

export default function DialogComponent({
  deleteVar,
  statusActive,
  btnTitle,
  msgTitle,
  domainId,
  domainCall,
  handleReload,
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const splitDomain = domainCall.split('/');
  console.log(splitDomain);

  async function handleDeleteClose(id) {
    if (splitDomain[0] === 'user' || splitDomain[0] === 'vendor') {
      const result = await patchReq(`${domainCall}?Id=${id}&status=delete`);
      if (result.statusCode === 200) {
        handleReload(false);
        setOpen(false);
      }
    } else {
      const result = await patchReq(`${domainCall}/detail?Id=${id}&status=delete`);
      if (result.statusCode === 200) {
        handleReload(false);
        setOpen(false);
      }
    }
  }

  async function handleStatusClose(id) {
    if (btnTitle === 'active') {
      const result = await patchReq(`${domainCall}/detail?Id=${id}&status=in-active`);
      if (result.statusCode === 200) {
        handleReload(false);
        setOpen(false);
      }
    } else {
      const result = await patchReq(`${domainCall}/detail?Id=${id}&status=active`);
      if (result.statusCode === 200) {
        handleReload(false);
        setOpen(false);
      }
    }
  }

  return (
    <>
      {deleteVar ? (
        <Box>
          <Button color="error" variant="contained" onClick={handleClickOpen}>
            {btnTitle}
          </Button>
        </Box>
      ) : (
        <Box>
          {statusActive ? (
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
              {btnTitle}
            </Button>
          ) : (
            <Button variant="outlined" color="error" onClick={handleClickOpen}>
              {btnTitle}
            </Button>
          )}
        </Box>
      )}

      {deleteVar ? (
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{`Delete ${msgTitle}`}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you Sure you want to delete {msgTitle} ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="error">
              Disagree
            </Button>
            <Button
              onClick={() => {
                handleDeleteClose(domainId);
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={open}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {statusActive ? `in-active  ${msgTitle} ` : `Active ${msgTitle}`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {statusActive
                ? `Are you Sure you want to in-active ${msgTitle} ?`
                : `Are you Sure you want to active ${msgTitle} ?`}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="error">
              Disagree
            </Button>
            <Button
              onClick={() => {
                handleStatusClose(domainId);
              }}
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

//-----------------------------------------------------------------------

DialogComponent.propTypes = {
  deleteVar: PropTypes.string,
  statusActive: PropTypes.string,
  btnTitle: PropTypes.string.isRequired,
  msgTitle: PropTypes.string.isRequired,
  domainId: PropTypes.string.isRequired,
  domainCall: PropTypes.string.isRequired,
  handleReload: PropTypes.func,
};
