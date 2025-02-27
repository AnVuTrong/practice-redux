import React from 'react';
import { Link } from 'react-router-dom';

export const SignInLink: React.FC = () => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/signin" className="text-primary font-medium hover:text-primary-light">
          Sign in
        </Link>
      </p>
    </div>
  );
}; 