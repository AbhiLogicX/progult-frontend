import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
  Button,
  Dialog,
  Checkbox,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
  FormControlLabel,
} from '@mui/material';

import { getReq } from 'src/api/api';

export default function AmenitiesManageForm({ openDialog, handleClose, dValues, handleSubmit }) {
  const [fetchData, setData] = useState();
  const [fetchedData, setfetchedData] = useState(false);
  const [checked, setChecked] = useState([]);

  const checkedVal = true;
  const unCheckedVal = false;

  useEffect(() => {
    if (!fetchedData) {
      fetchAminitieData();
    }
  });

  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  async function fetchAminitieData() {
    await getReq('domain/aminities').then((res) => {
      setData(res.data);
      setfetchedData(true);
    });
  }

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle
        id="alert-dialog-title"
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        Edit Info
      </DialogTitle>
      <DialogContent>
        <Typography mb={1}>Select you Aminites</Typography>
        {fetchData?.map((itm) => (
          <FormControlLabel
            value={itm._id}
            checked={dValues?.find((obj) => obj._id === itm._id) ? checkedVal : unCheckedVal}
            control={<Checkbox />}
            label={itm.title}
            onChange={handleCheck}
            labelPlacement="top"
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleSubmit(checked);
          }}
          variant="contained"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AmenitiesManageForm.propTypes = {
  openDialog: PropTypes.string,
  handleClose: PropTypes.func,
  dValues: PropTypes.object,
  handleSubmit: PropTypes.func,
};
