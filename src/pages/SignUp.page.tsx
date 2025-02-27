import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import { signUp, clearError } from '../features/authSlice.feature';
import { FormInput } from '../components/auth.components/FormInput.component';
import { AuthButton } from '../components/auth.components/AuthButton.component';
import { AuthCard } from '../components/auth.components/AuthCard.component';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, successMessage } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated && successMessage) {
      navigate('/');
    }
  }, [isAuthenticated, successMessage, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    // Clear field error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      valid = false;
    } else {
      newErrors.name = '';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    } else {
      newErrors.email = '';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    } else {
      newErrors.password = '';
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      valid = false;
    } else {
      newErrors.confirmPassword = '';
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signUpData } = formData;
      dispatch(signUp(signUpData));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4'>
      <div className='absolute top-0 right-0 w-full h-64 bg-gradient-to-l from-primary/20 to-purple-500/20 -z-10'></div>

      <AuthCard title='Create Account' subtitle='Join us today and start your journey'>
        {error && (
          <div className='mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded'>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
          <FormInput
            id='name'
            label='Full Name'
            type='text'
            value={formData.name}
            onChange={handleChange}
            placeholder='John Doe'
            error={formErrors.name}
            required
            autoComplete='name'
          />

          <div className='grid grid-cols-2 gap-4'>
            <FormInput
              id='firstName'
              label='First Name'
              type='text'
              value={formData.firstName}
              onChange={handleChange}
              placeholder='John'
              error={formErrors.firstName}
              autoComplete='given-name'
            />

            <FormInput
              id='lastName'
              label='Last Name'
              type='text'
              value={formData.lastName}
              onChange={handleChange}
              placeholder='Doe'
              error={formErrors.lastName}
              autoComplete='family-name'
            />
          </div>

          <FormInput
            id='email'
            label='Email Address'
            type='email'
            value={formData.email}
            onChange={handleChange}
            placeholder='your@email.com'
            error={formErrors.email}
            required
            autoComplete='email'
          />

          <FormInput
            id='password'
            label='Password'
            type='password'
            value={formData.password}
            onChange={handleChange}
            placeholder='••••••••'
            error={formErrors.password}
            required
            autoComplete='new-password'
          />

          <FormInput
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder='••••••••'
            error={formErrors.confirmPassword}
            required
            autoComplete='new-password'
          />

          <div className='flex items-center mt-4'>
            <input id='terms' name='terms' type='checkbox' className='h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded' required />
            <label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
              I agree to the{' '}
              <a href='#' className='text-primary hover:text-primary-light'>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href='#' className='text-primary hover:text-primary-light'>
                Privacy Policy
              </a>
            </label>
          </div>

          <AuthButton text='Create Account' type='submit' isLoading={loading} fullWidth />
        </form>

        <div className='mt-6 text-center'>
          <p className='text-sm text-gray-600'>
            Already have an account?{' '}
            <Link to='/signin' className='text-primary font-medium hover:text-primary-light'>
              Sign in
            </Link>
          </p>
        </div>
      </AuthCard>
    </div>
  );
};

export default SignUp;
