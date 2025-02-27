import React from 'react';
import { Link } from 'react-router-dom';

export const SignUpLink: React.FC = () => {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/signup" className="text-primary font-medium hover:text-primary-light">
          Sign up now
        </Link>
      </p>
    </div>
  );
}; 