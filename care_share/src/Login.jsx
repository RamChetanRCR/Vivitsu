// src/Login.jsx
import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CssBaseline,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Link,
  Stack,
  TextField,
  Typography,
  Card as MuiCard
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase'; // Make sure this is correctly configured
import { Google as GoogleIcon } from '@mui/icons-material'; // You can use your custom icon too

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: '100vh',
  padding: theme.spacing(2),
  justifyContent: 'center',
  alignItems: 'center',
}));

const Login = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const validate = () => {
    let valid = true;

    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const loginWithEmail = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <CssBaseline />
      <SignInContainer>
        <Card>
          <Typography variant="h4" textAlign="center">
            Sign In
          </Typography>
          <Box component="form" onSubmit={loginWithEmail} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <TextField
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!emailError}
                helperText={emailError}
                fullWidth
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <TextField
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!passwordError}
                helperText={passwordError}
                fullWidth
              />
            </FormControl>
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button type="submit" variant="contained" fullWidth>
              Sign In
            </Button>
          </Box>
          <Link component="button" variant="body2" sx={{ textAlign: 'center', mt: 1 }}>
            Forgot password?
          </Link>
          <Divider>or</Divider>
          <Button
            variant="outlined"
            fullWidth
            onClick={loginWithGoogle}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            Don’t have an account?{' '}
            <Link href="/signup" variant="body2">
              Sign up
            </Link>
          </Typography>
        </Card>
      </SignInContainer>
    </>
  );
};

export default Login;
