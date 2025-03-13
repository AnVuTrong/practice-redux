import React from 'react';
import { FormInput } from '../components/auth.components/FormInput.component';
import { AuthButton } from '../components/auth.components/AuthButton.component';
import { AuthCard } from '../components/auth.components/AuthCard.component';
import { SocialLoginButtons } from '../components/auth.components/SocialLoginButtons.component';
import { RememberForgotSection } from '../components/auth.components/RememberForgotSection.component';
import { SignUpLink } from '../components/auth.components/SignUpLink.component';
import { useSignInForm } from '../hooks/UseSignInForm.hook';
import { AuthLayout } from '../layouts/AuthLayout.layout';

const SignIn: React.FC = () => {
  const { formData, formErrors, loading, error, handleChange, handleSubmit } = useSignInForm();

  return (
    <AuthLayout>
      <AuthCard title='Welcome Back' subtitle='Sign in to your account to continue'>
        {error && (
          <div className='mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded'>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
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
            autoComplete='current-password'
          />

          <RememberForgotSection />

          <AuthButton text='Sign In' type='submit' isLoading={loading} fullWidth />
        </form>

        <SignUpLink />
        <SocialLoginButtons />
      </AuthCard>
    </AuthLayout>
  );
};

export default SignIn;
