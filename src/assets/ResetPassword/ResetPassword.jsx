import { useState } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { resetPasswordSchema } from '../../validations/authSchema';

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [serverError, setServerError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onBlur',
    defaultValues: {
      email: location.state?.email || '',
      code: '',
      newPassword: '',
    },
  });

  const onSubmit = async (data) => {
    setServerError(null);

    try {
      await axios.patch(
        'https://knowledgeshop.runasp.net/api/auth/Account/ResetPassword',
        data
      );

      navigate('/login');
    } catch (err) {
      console.log(err.response?.data);
      setServerError('Failed to reset password. Please try again.');
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
          Reset Password
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
            label="Code"
            fullWidth
            margin="normal"
            {...register('code')}
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('newPassword')}
            error={!!errors.newPassword}
            helperText={errors.newPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Loading...' : 'Reset Password'}
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/sendCode">Send code again</Link>
          </Typography>

          <Typography sx={{ textAlign: 'center', mt: 2 }}>
            <Link to="/login">Back to Login</Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}