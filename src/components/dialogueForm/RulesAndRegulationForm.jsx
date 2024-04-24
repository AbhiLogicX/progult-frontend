import React from 'react';
import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';
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

export default function RulesForm({ Id, open, handleClose, rules }) {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      test: [{ rule: 'rule11' }, { rule: 'rule22' }, { rule: 'rule33' }],
    },
  });

  //   const currLocation = useLocation().pathname.split('/');

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'test',
  });

  const onSubmit = (data) => {
    // console.log(data);
    handleClose();
  };
  //   const handleSubmitForm = () => {
  //     console.log('hi');
  //   };

  return (
    <Dialog open={open} onClose={{}}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Update Rules</DialogTitle>
        <DialogContent>
          <Typography>Add or remove rules</Typography>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {fields.map((item, index) => (
              <li key={item.id}>
                <TextField
                  {...register(`test.${index}.rule`, { required: true })}
                  placeholder="Enter rule"
                  sx={{ mr: 1, mb: 1, maxWidth: 600, minWidth: 300 }}
                />
                {/* <Button color="error" type="button" onClick={() => remove(index)}>
                  Delete
                </Button> */}
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
            Cancle
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
  Id: PropTypes.string,
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  rules: PropTypes.array,
};
