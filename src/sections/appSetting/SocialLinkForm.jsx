import React from 'react';
import PropTypes from 'prop-types';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import { Box, List, Alert, Button, ListItem, TextField } from '@mui/material';

import { patchReq } from 'src/api/api';
import { error } from 'src/theme/palette';

export default function SocialForm({ dValues, handleReload, ...details }) {
  const [alert, setAlert] = React.useState(false);
  const [alertVisisble, setAlertVisible] = React.useState(false);
  const [errMessage, setErrorMessage] = React.useState('');

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      socialLinks: dValues,
      // socialLinks: [
      //   { linkName: 'ProgultInsta', link: 'Instagram' },
      //   { linkName: 'WhatsApp', link: 'ProgultWhatsApp' },
      // ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'socialLinks',
  });

  const onSubmit = async (data) => {
    data.Id = details?.Id;
    // console.log('data', data);
    await patchReq(`master/application-setting`, data).then((res) => {
      if (res.statusCode === 200) {
        // console.log(res);
        setAlert(true);
        setAlertVisible(true);
        setTimeout(() => {
          setAlert(false);
          setAlertVisible(false);
          handleReload(false);
        }, 1200);
      } else {
        setAlertVisible(true);
        setErrorMessage(res?.response?.data?.message);
        setTimeout(() => {
          setAlertVisible(false);
        }, 1000);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {alert ? (
        <>
          {alertVisisble ? (
            <Alert variant="filled" severity="success">
              updated successfully
            </Alert>
          ) : null}
        </>
      ) : null}
      {alert ? null : (
        <>
          {alertVisisble ? (
            <Alert variant="filled" severity="error">
              {errMessage !== '' ? errMessage : ` not updated`}
            </Alert>
          ) : null}
        </>
      )}
      <List>
        {fields.map((item, index) => (
          <ListItem key={item.id}>
            <Box display="flex" alignItems="end">
              <Box mr={3}>
                <TextField
                  fullWidth
                  {...register(`socialLinks.${index}.linkName`, { required: true })}
                  sx={{ mb: 2 }}
                  label="Link Name "
                />
                <Controller
                  render={({ field }) => <TextField fullWidth label="Link" {...field} />}
                  name={`socialLinks.${index}.link`}
                  control={control}
                />
              </Box>

              <Box>
                <Button
                  type="button"
                  sx={{
                    color: error.main,
                    backgroundColor: error.errorBackground,
                    '&:hover': {
                      backgroundColor: error.main,
                      color: error.errorBackground,
                    },
                  }}
                  onClick={() => remove(index)}
                >
                  Delete
                </Button>
              </Box>
            </Box>
          </ListItem>
        ))}
      </List>

      <Box p={2}>
        <Button
          type="button"
          onClick={() => {
            append({ linkName: '', link: '' });
          }}
          sx={{ mr: 1 }}
        >
          + Add
        </Button>
        <Button type="submit" variant="contained">
          Save
        </Button>
      </Box>
    </form>
  );
}

SocialForm.propTypes = {
  dValues: PropTypes.array,
  handleReload: PropTypes.func,
};
