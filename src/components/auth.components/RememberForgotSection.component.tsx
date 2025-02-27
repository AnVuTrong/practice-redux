import React from 'react';
import { Link } from 'react-router-dom';

export const RememberForgotSection: React.FC = () => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center">
        <input
          id="remember-me"
          name="remember-me"
          type="checkbox"
          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
        />
        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
          Remember me
        </label>
      </div>

      <div className="text-sm">
        <Link to="/forgot-password" className="text-primary hover:text-primary-light">
          Forgot password?
        </Link>
      </div>
    </div>
  );
}; 