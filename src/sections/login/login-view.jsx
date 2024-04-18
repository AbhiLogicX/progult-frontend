import { useState } from 'react';
import { useForm } from 'react-hook-form';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { alpha, useTheme } from '@mui/material/styles';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { postReq } from 'src/api/api';
import { bgGradient } from 'src/theme/css';

// import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // const handleClick = () => {
  //   router.push('/dashboard');
  // };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const loginsubmit = async (data) => {
    // console.log(data)
    setLoading(true);
    setError('');
    try {
      const session = await postReq('admin/login', data);
      if (session.success) {
        // console.log(session);
        localStorage.setItem('items', JSON.stringify(session.data));
        localStorage.setItem('tokens', JSON.stringify(session.extra));
        setLoading(false);
        router.push('/');
      } else {
        setLoading(false);
        setError(session.message);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const renderForm = (
    <form onSubmit={handleSubmit(loginsubmit)}>
      <Stack spacing={3} marginBottom="2rem">
        <TextField
          name="email"
          label="Email address"
          {...register('email', {
            required: 'Email is required',
            validate: {
              matchPatern: (value) =>
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                'Email address must be a valid address',
            },
          })}
        />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password', { required: true, minLength: 6 })}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Login
      </LoadingButton>

      {error && <Typography color="error">{error}</Typography>}
    </form>
  );

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      {/* <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      /> */}
      <Box
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      >
        <img src="/assets/logo/progultlogo.png" alt="loginCover" width="100px" height="100px" />
      </Box>

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
            justifyItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography alignItems="center" justifySelf="center" marginBottom="1rem" variant="h5">
            Welcome To Proglut Admin
          </Typography>

          <Divider sx={{ my: 3 }} />

          {!loading ? renderForm : 'Verifying...'}
        </Card>
      </Stack>
    </Box>
  );
}
