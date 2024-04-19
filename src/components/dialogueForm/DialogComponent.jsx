import * as React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CheckIcon from '@mui/icons-material/Check';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';

import { patchReq } from 'src/api/api';
import { error } from 'src/theme/palette';

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
  const [alert, setAlert] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  const splitDomain = domainCall.split('/');

  async function handleDeleteClose(id) {
    const dataToDelete = {
      Id: id,
      status: 'delete',
    };

    if (splitDomain[0] === 'user' || splitDomain[0] === 'vendor') {
      const result = await patchReq(`${domainCall}`, dataToDelete);
      if (result.statusCode === 200) {
        setAlert(true);
        setTimeout(() => {
          handleReload(false);
          setOpen(false);
        }, 1000);
      }
    } else {
      const result = await patchReq(`${domainCall}/detail?Id=${id}&status=delete`);
      if (result.statusCode === 200) {
        setAlert(true);
        setTimeout(() => {
          handleReload(false);
          setOpen(false);
        }, 1000);
      }
    }
  }

  async function handleStatusClose(id) {
    if (btnTitle === 'active') {
      const result = await patchReq(`${domainCall}/detail?Id=${id}&status=in-active`);
      if (result.statusCode === 200) {
        setAlert(true);
        setTimeout(() => {
          handleReload(false);
          setOpen(false);
        }, 1000);
      }
    } else {
      const result = await patchReq(`${domainCall}/detail?Id=${id}&status=active`);
      if (result.statusCode === 200) {
        setAlert(true);
        setTimeout(() => {
          handleReload(false);
          setOpen(false);
        }, 1000);
      }
    }
  }

  return (
    <>
      {deleteVar ? (
        <Box>
          <Button
            sx={{
              color: error.main,
              backgroundColor: error.errorBackground,
              '&:hover': {
                backgroundColor: error.main,
                color: error.errorBackground,
              },
            }}
            onClick={handleClickOpen}
          >
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
            {alert ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {`${splitDomain[1]} Deleted successfully`}
              </Alert>
            ) : (
              <>
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
              </>
            )}
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
            {alert ? (
              <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                {`${splitDomain[1]} status updated successfully`}
              </Alert>
            ) : (
              <>
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
              </>
            )}
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
