import { useContext } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { TitleContext } from 'src/context/mainContext';

export default function AppSettingView() {
  const { setTitle } = useContext(TitleContext);

  setTitle('App Settings');
  return (
    <Container>
      {/* <Typography variant="h4" sx={{ mb: 5 }}>
        App Settings
      </Typography> */}

      <Box>
        <Box sx={{ mb: 5, border: '1px darkgrey solid', borderRadius: 0.75, p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Basic Details
          </Typography>
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            sx={{ mr: 2, mb: 2, width: '25%' }}
          />
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            sx={{ mr: 2, mb: 2, width: '25%' }}
          />
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            sx={{ mr: 2, mb: 2, width: '25%' }}
          />
          <TextField
            id="standard-basic"
            label="mobile"
            variant="standard"
            sx={{ mr: 2, mb: 2, width: '25%' }}
          />
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Address
            </Typography>
            <TextField
              id="standard-basic"
              label="City"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <TextField
              id="standard-basic"
              label="State"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <TextField
              id="standard-basic"
              label="Street"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <TextField
              id="standard-basic"
              label="Area"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <TextField
              id="standard-basic"
              label="Pin code"
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
            <br />
            <TextField
              id="standard-basic"
              label="Full Address"
              fullWidth
              variant="standard"
              sx={{ mr: 2, mb: 2, width: '25%' }}
            />
          </Box>
        </Box>
        <Box sx={{ mb: 5, border: '1px darkgrey solid', borderRadius: 0.75, p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Image Details
          </Typography>
        </Box>
        <Box sx={{ mb: 5, border: '1px darkgrey solid', borderRadius: 0.75, p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            SEO Details
          </Typography>
        </Box>
        <Box sx={{ mb: 5, border: '1px darkgrey solid', borderRadius: 0.75, p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Social Link Details
          </Typography>
        </Box>
        <Box sx={{ mb: 5, border: '1px darkgrey solid', borderRadius: 0.75, p: 2 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Terms & Condition Details
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
