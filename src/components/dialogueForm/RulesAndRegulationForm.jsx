import React from 'react';
import PropTypes from 'prop-types';
import { useForm, useFieldArray } from 'react-hook-form';

import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Button,
  Dialog,
  TextField,
  IconButton,
  Typography,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

import { postReq } from 'src/api/api';

export default function RulesForm({ open, handleClose, rules, handleReload, Id, fromCall }) {
  const { register, control, handleSubmit, setValue } = useForm({
    defaultValues: {
      test: rules?.map((rule) => ({ rule })),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test',
  });

  // Function to set default values if rules prop changes
  React.useEffect(() => {
    setValue(
      'test',
      rules?.map((rule) => ({ rule }))
    );
  }, [rules, setValue]);

  const onSubmit = async (data) => {
    const rulesData = data.test.map((itm) => itm.rule);
    // console.log('data', rulesData);
    await postReq(`${fromCall}/rules`, { rules: rulesData, eventId: Id, bussinessId: Id }).then(
      (res) => {
        if (res.statusCode === 200) {
          handleClose();
          handleReload(false);
        }
      }
    );
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update Rules</DialogTitle>
        <DialogContent>
          <Typography>Add or remove rules</Typography>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {fields.map((item, index) => (
              <li key={item.id}>
                <TextField
                  {...register(`test.${index}.rule`, { required: true })}
                  defaultValue={item.rule} // Set default value here
                  placeholder="Enter rule"
                  sx={{ mr: 1, mb: 1, maxWidth: 600, minWidth: 300 }}
                />
                <IconButton aria-label="delete" color="error" onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
          <Box padding={0} margin={0}>
            <Button
              variant="contained"
              type="button"
              onClick={() => {
                append({ rule: '' });
              }}
            >
              + Add Rule
            </Button>
          </Box>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

RulesForm.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  rules: PropTypes.arrayOf(PropTypes.string).isRequired,
  Id: PropTypes.string,
  handleReload: PropTypes.func,
  fromCall: PropTypes.string,
};
