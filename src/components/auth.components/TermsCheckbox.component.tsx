import React from 'react';

export const TermsCheckbox: React.FC = () => {
  return (
    <div className="flex items-center mt-4">
      <input 
        id="terms" 
        name="terms" 
        type="checkbox" 
        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" 
        required 
      />
      <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
        I agree to the{' '}
        <a href="#" className="text-primary hover:text-primary-light">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="#" className="text-primary hover:text-primary-light">
          Privacy Policy
        </a>
      </label>
    </div>
  );
}; 