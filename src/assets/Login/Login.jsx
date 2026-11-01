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
import { loginSchema } from '../../validations/authSchema';

export default function Login() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setServerError(null);

    try {
      const response = await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/Login',
        data
      );

      const token = response.data.accessToken;

      if (!token) {
        setServerError('Login failed: no access token received.');
        return;
      }

      localStorage.setItem('token', token);
      navigate('/home');
    } catch (err) {
      console.log(err.response?.data);
      setServerError('Login Failed');
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
          Login
        </Typography>

        {serverError && <Alert severity="error">{serverError}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
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
            {isSubmitting ? 'Loading...' : 'Login'}
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/sendCode">Forgot password?</Link>
          </Typography>

          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2 }}>
            Don't have an account? <Link to="/register">Register</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}