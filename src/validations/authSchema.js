import * as yup from 'yup';

export const registerSchema = yup.object({
  fullName: yup
    .string()
    .required('Full Name is required')
    .min(3, 'Full Name must be at least 3 characters'),

  userName: yup
    .string()
    .required('User Name is required')
    .min(3, 'User Name must be at least 3 characters'),

  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),

  phoneNumber: yup
    .string()
    .required('Phone Number is required')
    .matches(/^05\d{8}$/, 'Phone Number must start with 05 and be 10 digits'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number'),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),

  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number'),
});

export const sendCodeSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
});

export const resetPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),

  code: yup.string().required('Code is required'),

  newPassword: yup
    .string()
    .required('New Password is required')
    .min(6, 'Password must be at least 6 characters')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[0-9]/, 'Password must contain a number'),
});