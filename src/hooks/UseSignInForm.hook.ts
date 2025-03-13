import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './Redux.hook';
import { signIn, clearError } from '../features/AuthSlice.feature';
import { useFormManager } from '../utils/FormManager';
import { SignInFormData, SignInFormErrors } from '../types/Auth.types';

export const useSignInForm = () => {
  const initialFormData: SignInFormData = {
    email: '',
    password: ''
  };

  const initialFormErrors: SignInFormErrors = {
    email: '',
    password: ''
  };

  const { formData, formErrors, formManager } = useFormManager<SignInFormData, SignInFormErrors>(
    initialFormData,
    initialFormErrors
  );
  
  // Add validators
  useEffect(() => {
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
  }, [formManager]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    // Redirect if already authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formManager.handleChange(e);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formManager.validate()) {
      dispatch(signIn(formManager.getState()));
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