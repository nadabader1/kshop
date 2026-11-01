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
import { sendCodeSchema } from '../../validations/authSchema';

export default function SendCode() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(sendCodeSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data) => {
    setServerError(null);

    try {
      await axios.post(
        'https://knowledgeshop.runasp.net/api/auth/Account/SendCode',
        data
      );

      navigate('/resetPassword', {
        state: { email: data.email },
      });
    } catch (err) {
      console.log(err.response?.data);
      setServerError('Failed to send code. Please try again.');
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
          Forgot Password
        </Typography>

        <Typography sx={{ textAlign: 'center', mb: 2 }}>
          Enter your email to receive a reset code.
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

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Send Code'}
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/login">Back to Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}