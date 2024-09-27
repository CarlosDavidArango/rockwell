import React from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Toaster, toast } from 'sonner'
import { singIn } from "../api/functions/auth";
import SingUp from "./SignUp";





const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  marginTop: '10vh',
  width: '40%',
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Login() {

  //hooks
  const [emailError, setEmailError] = React.useState(false);

  const validateInputs = () => {
    const email = document.getElementById('email');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
     ;
      isValid = false;
    } else {
      setEmailError(false);
    }

    return isValid;
  };


  //Maneja el envio del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      toast.error('Please enter a valid email address.');
      return;
    }
    const data = new FormData(e.currentTarget);
    console.log({ email: data.get('email'), password: data.get('password') })
    console.log(singIn(data.get('email'), data.get('password')))

  }

  



  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',  backgroundColor: "#BCCCDC" }}>
    <SignInContainer>
      <Card  sx={{ display: 'flex', flexDirection: 'column', alignSelf:'center', width: "100%", padding: 4, gap: 2, margin: 2}}>
        <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel htmlFor="email">Email</FormLabel>
                <TextField
                  error={emailError}
                  id="email"
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  autoComplete="email"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={emailError ? 'error' : 'primary'}
                  sx={{ ariaLabel: 'email' }}
                />
              </FormControl>
              <FormControl>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <FormLabel htmlFor="password">Password</FormLabel>
                </Box>
                <TextField
                  name="password"
                  placeholder="••••••"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  variant="outlined"
                  color={ 'primary'}
                />
              </FormControl>
              

              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(e) => {}}
              >
                Sign in
              </Button>
              <Typography sx={{ textAlign: 'center' }}>
                Don&apos;t have an account?{' '}
                <span>
                  <Link
                    href="/SignUp/"
                    variant="body2"
                    sx={{ alignSelf: 'center' }}
                  >
                    Sign up
                  </Link>
                </span>
              </Typography>
          </Box>
      </Card>
      <Toaster />
    </SignInContainer>
    </Box>
  );
}
