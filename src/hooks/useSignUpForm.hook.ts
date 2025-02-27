import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './redux.hook';
import { signUp, clearError } from '../features/authSlice.feature';
import { useFormManager } from '../utils/FormManager';
import { SignUpFormData, SignUpFormErrors } from '../types/auth.types';

export const useSignUpForm = () => {
  const initialFormData: SignUpFormData = {
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const initialFormErrors: SignUpFormErrors = {
    name: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  const { formData, formErrors, formManager } = useFormManager<SignUpFormData, SignUpFormErrors>(
    initialFormData,
    initialFormErrors
  );
  
  // Add validators
  useEffect(() => {
    formManager.addValidator('name', (value) => {
      if (!value.trim()) return 'Full name is required';
      return '';
    });
    
    formManager.addValidator('email', (value) => {
      if (!value.trim()) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
      return '';
    });
    
    formManager.addValidator('password', (value) => {
      if (!value) return 'Password is required';
      if (value.length < 6) return 'Password must be at least 6 characters';
      return '';
    });
    
    formManager.addValidator('confirmPassword', (value) => {
      if (value !== formManager.getState().password) return 'Passwords do not match';
      return '';
    });
  }, [formManager]);

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
    formManager.handleChange(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formManager.validate()) {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...signUpData } = formManager.getState();
      dispatch(signUp(signUpData));
    }
  };

  return {
    formData,
    formErrors,
    loading,
    error,
    handleChange,
    handleSubmit
  };
}; 