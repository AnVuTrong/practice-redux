import React from 'react';
import { FormInput } from '../components/auth.components/FormInput.component';
import { AuthButton } from '../components/auth.components/AuthButton.component';
import { AuthCard } from '../components/auth.components/AuthCard.component';
import { TermsCheckbox } from '../components/auth.components/TermsCheckbox.component';
import { SignInLink } from '../components/auth.components/SignInLink.component';
import { useSignUpForm } from '../hooks/useSignUpForm.hook';

const SignUp: React.FC = () => {
  const { formData, formErrors, loading, error, handleChange, handleSubmit } = useSignUpForm();

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

          <TermsCheckbox />

          <AuthButton text='Create Account' type='submit' isLoading={loading} fullWidth />
        </form>

        <SignInLink />
      </AuthCard>
    </div>
  );
};

export default SignUp;
