import React from 'react';
// Custom Imports Start
import useRegister from './useRegister';
import { Typography, Button, Box } from '@mui/material'
import withLayout from '../../utils/withLayout';
import GuestLayout from '../../Layouts/GuestLayout';
import Input from '../../components/Input';
import { Link } from 'react-router-dom';
// Custom Imports End

// UI
const Register = () => {
  const {
    inputFields,
    onInputChange,
    handleRegister,
  } = useRegister();

  return (
    <div>
      <Typography variant="h4" textAlign="center">Register</Typography>
      <form>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Box sx={{ marginTop: 2, marginBottom: 2 }}>
            {Object.keys(inputFields).map((name) => (
              <Box key={name} sx={{ marginTop: 1, marginBottom: 1 }}>
                <Input field={inputFields[name]} onChangeInput={onInputChange} />
              </Box>
            ))}
          </Box>
          <Button variant="contained" color="primary" onClick={handleRegister}>
            Register
          </Button>
          <Link to={'/login'} style={{ textDecoration: 'none', marginTop: 8 }}>
            Login
          </Link>
        </Box>

      </form>
    </div>
  );
};

export default withLayout(GuestLayout)(Register)