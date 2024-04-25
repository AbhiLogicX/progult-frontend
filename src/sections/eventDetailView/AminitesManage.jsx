import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
  List,
  Button,
  Dialog,
  ListItem,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { getReq, postReq } from 'src/api/api';

export default function AmenitiesManageForm({
  openDialog,
  handleClose,
  dValues,
  handleReload,
  Id,
  fromCall,
}) {
  const [fetchData, setData] = useState();
  const [fetchedData, setfetchedData] = useState(false);
  const [checkedValues, setCheckedValues] = useState();

  useEffect(() => {
    if (!fetchedData) {
      fetchAminitieData();
    }
    setCheckedValues(dValues);
    async function fetchAminitieData() {
      await getReq('domain/aminities').then((res) => {
        setData(res.data);
        setfetchedData(true);
      });
    }
  }, [fetchedData, dValues]);

  // function addDefaultValues() {
  //   for (let i = 0; i < dValues?.length; i += 1) {
  //     const obj = dValues[i];
  //     if (!checkedValues.includes(obj._id)) {
  //       checkedValues.push(obj._id);
  //     }
  //   }
  // }

  // addDefaultValues();
  // console.log('cross check', checkedValues);
  const handleCheck = (e) => {
    const { name, checked } = e.target;

    if (checked) {
      setCheckedValues((prevState) => [...prevState, name]);
    } else {
      setCheckedValues((prevState) => prevState.filter((item) => item !== name));
    }
  };

  async function handleAminitiePost(values) {
    const dataPost = {
      aminityId: values,
      eventId: Id,
      bussinessId: Id,
    };
    await postReq(`${fromCall}/aminities`, dataPost).then((res) => {
      if (res.statusCode === 200) {
        handleReload(false);
      }
    });
  }

  const handleAminitieDialogSubmit = (e) => {
    e.preventDefault();
    // console.log('Checked values:', checkedValues);
    handleAminitiePost(checkedValues);
    handleClose();
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <form onSubmit={handleAminitieDialogSubmit}>
        <DialogTitle
          id="alert-dialog-title"
          sx={{ display: 'flex', justifyContent: 'space-between' }}
        >
          Edit Info
        </DialogTitle>
        <DialogContent>
          <Typography mb={1}>Select you Aminites</Typography>
          {/* {fetchData?.map((itm) => (
          <FormControlLabel
            value={itm._id}
            checked={dValues?.find((obj) => obj._id === itm._id) ? checkedVal : unCheckedVal}
            control={<Checkbox />}
            label={itm.title}
            onChange={handleCheck}
            labelPlacement="top"
          />
        ))} */}
          <List>
            {fetchData?.map((itm) => (
              <ListItem>
                {checkedValues?.find((obj) => obj === itm._id) ? (
                  <label htmlFor={itm._id}>
                    <input type="checkbox" name={itm._id} onChange={handleCheck} defaultChecked />
                    {itm.title}
                  </label>
                ) : (
                  <label htmlFor={itm._id}>
                    <input type="checkbox" name={itm._id} onChange={handleCheck} />
                    {itm.title}
                  </label>
                )}
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

AmenitiesManageForm.propTypes = {
  openDialog: PropTypes.string,
  handleClose: PropTypes.func,
  dValues: PropTypes.object,
  handleReload: PropTypes.func,
  Id: PropTypes.string,
  fromCall: PropTypes.string,
};
