import { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerSchema } from '../../validations/authSchema';

export default function Register() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setServerError(null);

    try {
      await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Register',
        data
      );

      navigate('/login');
    } catch (err) {
      console.log(err.response?.data);
      setServerError('Registration Failed');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: 'white', boxShadow: 3, p: 4, borderRadius: 2 }}>
        <Typography
          component="h1"
          variant="h4"
          sx={{ textAlign: 'center', mb: 3 }}
        >
          Create Account
        </Typography>

        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Full Name"
            fullWidth
            margin="normal"
            {...register('fullName')}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
          />

          <TextField
            label="User Name"
            fullWidth
            margin="normal"
            {...register('userName')}
            error={!!errors.userName}
            helperText={errors.userName?.message}
          />

          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            {...register('phoneNumber')}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Register'}
          </Button>

          <Typography
            variant="body2"
            sx={{ textAlign: 'center', mt: 2 }}
          >
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}