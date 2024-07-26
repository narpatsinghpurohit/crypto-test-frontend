import React from 'react';
// Custom Imports Start
import useLogin from './useLogin';
import { Typography, Button, Box } from '@mui/material'
import withLayout from '../../utils/withLayout';
import GuestLayout from '../../Layouts/GuestLayout';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
// Custom Imports End

// UI
const Login = () => {
  const {
    inputFields,
    onInputChange,
    handleLogin,
  } = useLogin();

  return (
    <div>
      <Typography variant="h4" textAlign="center">Login</Typography>
      <form>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Box sx={{ marginTop: 2, marginBottom:2 }}>
            {Object.keys(inputFields).map((name) => (
              <Box key={name} sx={{ marginTop: 1, marginBottom:1 }}>
                <Input field={inputFields[name]} onChangeInput={onInputChange} />
              </Box>
            ))}
          </Box>
          <Button variant="contained" color="primary" onClick={handleLogin}>
            Login
          </Button>
          <Link to={'/register'} style={{textDecoration:'none', marginTop:8}}>
              Register
          </Link>
        </Box>

      </form>
    </div>
  );
};

export default withLayout(GuestLayout)(Login)