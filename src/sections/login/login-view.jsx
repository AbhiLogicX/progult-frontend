import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, useContext } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
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
import { UserDetailsContext } from 'src/context/mainContext';

// import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [renderForm, setRenderForm] = useState('vendor');
  const [sendOTP, setSendOTP] = useState(false);
  const { userDetails, setUserDetails } = useContext(UserDetailsContext);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormAdmin = () => {
    setRenderForm('admin');
  };

  const handleFormVendor = () => {
    setRenderForm('vendor');
  };

  // const handleClick = () => {
  //   router.push('/dashboard');
  // };

  const loginAdminSubmit = async (data) => {
    // console.log(data);
    setLoading(true);

    try {
      const session = await postReq('admin/login', data);
      if (session.statusCode) {
        localStorage.setItem('items', JSON.stringify(session.data));
        localStorage.setItem('tokens', JSON.stringify(session.extra));
        // const cookieHeader = session.headers.get('Set-Cookie');
        // if (cookieHeader) {
        //   // Extract the cookie value from the header
        //   const cookie = cookieHeader.split(';')[0];

        //   // Set the cookie in the browser
        //   document.cookie = cookie;
        // }

        setUserDetails(session.data);
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

  const renderAdminForm = (
    <form onSubmit={handleSubmit(loginAdminSubmit)}>
      <Stack spacing={3} marginBottom="2rem">
        <TextField
          name="email"
          label="Email address"
          type="email"
          required
          {...register('email', {
            required: 'Email is required',
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

          <Box display="flex" justifyContent="space-between">
            {renderForm === 'vendor' ? (
              <Button fullWidth variant="contained" sx={{ mr: 1 }}>
                Vendor
              </Button>
            ) : (
              <Button fullWidth sx={{ mr: 1 }} onClick={handleFormVendor}>
                Vendor
              </Button>
            )}
            {renderForm === 'admin' ? (
              <Button fullWidth variant="contained">
                Admin
              </Button>
            ) : (
              <Button fullWidth onClick={handleFormAdmin}>
                Admin
              </Button>
            )}
          </Box>

          <Divider sx={{ my: 3 }} />
          {renderForm === 'admin' ? (
            <>{!loading ? <>{!sendOTP ? renderAdminForm : null}</> : 'Verifying...'}</>
          ) : (
            <>
              {!loading ? (
                <>
                  {!sendOTP ? (
                    <RevnderVendorForm
                      setUserDetails={setUserDetails}
                      setLoading={setLoading}
                      setSendOTP={setSendOTP}
                      setError={setError}
                      error={error}
                    />
                  ) : null}
                </>
              ) : (
                'Verifying...'
              )}
            </>
          )}
          {sendOTP ? (
            <RenderVendorOTPForm
              userDetails={userDetails}
              setLoading={setLoading}
              setSendOTP={setSendOTP}
              setError={setError}
              error={error}
            />
          ) : null}
        </Card>
      </Stack>
    </Box>
  );
}

function RevnderVendorForm({ setLoading, setUserDetails, setSendOTP, setError, error }) {
  const { register, handleSubmit } = useForm();
  // const [error, setError] = useState(null);
  const loginVendor = async (data) => {
    // console.log('hello', data);
    setLoading(true);
    try {
      const session = await postReq('vendor/sendOTP', data);
      if (session.statusCode && (session.statusCode === 200 || session.statusCode === 201)) {
        localStorage.setItem('items', JSON.stringify(session.data));
        localStorage.setItem('tokens', JSON.stringify(session.extra));
        // const cookieHeader = session.headers.get('Set-Cookie');
        // if (cookieHeader) {
        //   // Extract the cookie value from the header
        //   const cookie = cookieHeader.split(';')[0];

        //   // Set the cookie in the browser
        //   document.cookie = cookie;
        // }
        setUserDetails(session.data);
        setSendOTP(true);
        setLoading(false);
      } else {
        setLoading(false);
        setError(session.message);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(loginVendor)}>
      <Stack spacing={3} marginBottom="2rem">
        <TextField
          type="number"
          name="phone"
          label="Enter Mobile Number"
          {...register('mobile')}
          // {...register('phone', {
          //   required: 'Phone number is required',
          // })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography>+91</Typography>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Get OTP
      </LoadingButton>

      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
}

RevnderVendorForm.propTypes = {
  setLoading: PropTypes.func,
  setUserDetails: PropTypes.func,
  setSendOTP: PropTypes.func,
  setError: PropTypes.func,
  error: PropTypes.string,
};

function RenderVendorOTPForm({ setLoading, userDetails, setSendOTP, setError, error }) {
  const { register, handleSubmit } = useForm();
  // const [error, setError] = useState('');
  const router = useRouter();
  const loginVendorOtp = async (data) => {
    data.mobile = userDetails.mobile;
    setLoading(true);
    // console.log(data);
    try {
      const session = await postReq('vendor/verifyOTP', data);
      // console.log(session);
      if (session.statusCode) {
        router.push('/');
        setSendOTP(false);
      } else {
        setSendOTP(false);
        setLoading(false);
        setError(session.message);
      }
    } catch (err) {
      setSendOTP(false);
      setLoading(false);
      setError(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(loginVendorOtp)}>
      <Stack spacing={3} marginBottom="2rem">
        <TextField type="number" name="otp" label="Enter OTP " {...register('otp')} />
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
        Verify OTP
      </LoadingButton>

      {error && <Typography color="error">{error}</Typography>}
    </form>
  );
}

// const renderVendorForm = (
//   <form onSubmit={handleSubmit(loginVendorSubmit)}>
//     <Stack spacing={3} marginBottom="2rem">
//       <TextField
//         type="number"
//         name="phone"
//         label="Enter Mobile Number"
//         {...register('phone', {
//           required: 'Phone number is required',
//         })}
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Typography>+91</Typography>
//             </InputAdornment>
//           ),
//         }}
//       />

//       {/* <TextField
//         name="password"
//         label="Password"
//         type={showPassword ? 'text' : 'password'}
//         {...register('password', { required: true, minLength: 6 })}
//         InputProps={{
//           endAdornment: (
//             <InputAdornment position="end">
//               <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
//                 <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
//               </IconButton>
//             </InputAdornment>
//           ),
//         }}
//       /> */}
//     </Stack>

//     <LoadingButton fullWidth size="large" type="submit" variant="contained" color="inherit">
//       Get OTP
//     </LoadingButton>

//     {error && <Typography color="error">{error}</Typography>}
//   </form>
// );
RenderVendorOTPForm.propTypes = {
  setLoading: PropTypes.func,
  userDetails: PropTypes.object,
  setSendOTP: PropTypes.func,
  setError: PropTypes.func,
  error: PropTypes.string,
  // error: PropTypes.string,
};
