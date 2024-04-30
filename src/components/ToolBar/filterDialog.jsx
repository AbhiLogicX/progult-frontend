import PropTypes from 'prop-types';

import {
  Button,
  Dialog,
  MenuItem,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

const Host = [
  {
    value: 'Default',
    label: 'All Hosts',
  },
  {
    value: 'M Bussiness',
    label: 'M Bussiness',
  },
  {
    value: 'M Bussiness',
    label: 'M Bussiness',
  },
  {
    value: 'M Bussiness',
    label: 'M Bussiness',
  },
];
const Vendor = [
  {
    value: 'Default',
    label: 'All Vendors',
  },
  {
    value: 'Harsh Agrawal',
    label: 'Harsh Agrawal',
  },
  {
    value: 'Vendor 2415',
    label: 'Vendor 2415',
  },
  {
    value: 'Pramod Shukla',
    label: 'Pramod Shukla',
  },
];
const Categoery = [
  {
    value: 'Default',
    label: 'All Categoery',
  },
  {
    value: 'Crircket',
    label: 'Crircket',
  },
  {
    value: 'Music',
    label: 'Music',
  },
  {
    value: 'Yoga',
    label: 'Yoga',
  },
];

const Bussiness = [
  {
    value: 'Default',
    label: 'All Bussiness',
  },
  {
    value: 'M Bussiness',
    label: 'M Bussiness',
  },
  {
    value: 'Guitarist',
    label: 'Guitarist',
  },
  {
    value: 'Music classes',
    label: 'Music classes',
  },
];

// const City = [
//   {
//     value: 'Default',
//     label: 'All City',
//   },
//   {
//     value: 'Bengaluru',
//     label: 'Bengaluru',
//   },
//   {
//     value: 'Hyderabad',
//     label: 'Hyderabad',
//   },
//   {
//     value: 'Vizag',
//     label: 'Vizag',
//   },
// ];

// const State = [
//   {
//     value: 'Default',
//     label: 'All State',
//   },
//   {
//     value: 'Chhattisgarh',
//     label: 'Chhattisgarh',
//   },
//   {
//     value: 'Karnataka',
//     label: 'Karnataka',
//   },
//   {
//     value: 'Andhara Pradesh',
//     label: 'Andhara Pradesh',
//   },
// ];

const Activity = [
  {
    value: 'Default',
    label: 'All Activity',
  },
  {
    value: 'Swimming',
    label: 'Swimming',
  },
  {
    value: 'Music',
    label: 'Music',
  },
  {
    value: 'zumba',
    label: 'zumba',
  },
];
export default function FilterDialog({ open, handleClose, fromCall }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle>Filter</DialogTitle>
      <DialogContent>
        <TextField label="City" fullWidth sx={{ mb: 1, mt: 1 }} />
        <TextField label="State" fullWidth sx={{ mb: 1 }} />

        {fromCall !== 'customer' ? (
          <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
            {Activity.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
        {fromCall === 'bussiness' || fromCall === 'bookings' ? (
          <>
            <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
              {Categoery.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>
                  {opt.label}
                </MenuItem>
              ))}
            </TextField>

            {fromCall === 'bussiness' ? (
              <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
                {Vendor.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            ) : (
              <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
                {Bussiness.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          </>
        ) : null}

        {fromCall === 'event' ? (
          <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
            {Bussiness.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        ) : null}

        {fromCall === 'event' ? (
          <TextField select defaultValue="Default" fullWidth sx={{ mb: 1 }}>
            {Host.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancle</Button>
        <Button onClick={handleClose}>Filter</Button>
      </DialogActions>
    </Dialog>
  );
}

FilterDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  fromCall: PropTypes.string,
};
