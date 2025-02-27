import React from 'react';

interface AuthButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  fullWidth?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

export const AuthButton: React.FC<AuthButtonProps> = ({
  text,
  onClick,
  type = 'button',
  isLoading = false,
  fullWidth = false,
  variant = 'primary'
}) => {
  const baseClasses = 'px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary to-purple-600 text-white hover:from-primary-light hover:to-purple-500',
    secondary: 'bg-secondary text-primary hover:bg-secondary-dark',
    outline: 'border border-primary text-primary hover:bg-primary/10'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}>
      {isLoading ? (
        <div className='flex items-center'>
          <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
            <path
              className='opacity-75'
              fill='currentColor'
              d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
          </svg>
          Processing...
        </div>
      ) : (
        text
      )}
    </button>
  );
};
