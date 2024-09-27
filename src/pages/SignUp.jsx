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
import { singUp } from "../api/functions/auth";
import { doc } from "firebase/firestore";




const SignInContainer = styled(Stack)(({ theme }) => ({
  padding: 20,
  width: '40%',
  borderRadius: 4,
  borderColor: 'primary.main',
  marginTop: '10vh',
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

const roles = [
    {
        value: 'employee',
        label: 'employee',
    },
    {
        value: 'admin',
        label: 'admin',
    },
]

export default function SignUp() {

  //hooks
  const [emailError, setEmailError] = React.useState(false);

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');

    let isValid = true;
    // correo electronico valido
    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
     ;
      isValid = false;
      toast.error('Please enter a valid email address.')
      return isValid
    } else {
      setEmailError(false);
      return isValid;
    }
    // contraseñas iguales
    if (!password.value || password.value !== confirmPassword.value) {
      toast.error('Passwords do not match');
      isValid = false;
    }

    return isValid;
  };


  //Maneja el envio del formulario
  const handleSubmit = async (e) => {

    
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }
    const data = new FormData(e.currentTarget);
    const userData = {'role': document.getElementById('role').value}
    const response = await singUp(data.get('email'), data.get('password'), userData);
    if (response === 'User created successfully') {
      toast.success(response);
    } else {
      toast.error(response);
    }
    

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
                <FormControl>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  </Box>
                  <TextField
                    name="password"
                    placeholder="••••••"
                    type="password"
                    id="confirmPassword"
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={ 'primary'}
                  />
                </FormControl>
                <FormControl>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel htmlFor="role">role</FormLabel>
                  </Box>
                  <TextField
                      id="role"
                      select
                      defaultValue="employee"
                      slotProps={{
                          select: {
                          native: true,
                          },
                      }}
                      helperText="Select your role"
                      >
                        {roles.map((option) => (
                          <option key={option.value} value={option.value}>
                          {option.label}
                          </option>
                      ))}      
                  </TextField>
                </FormControl>
                

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={(e) => {}}
                >
                  Sign Up
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                Already have an account?{' '}
                  <span>
                    <Link
                      href="/sign-in/"
                      variant="body2"
                      sx={{ alignSelf: 'center' }}
                    >
                      Sign In
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
