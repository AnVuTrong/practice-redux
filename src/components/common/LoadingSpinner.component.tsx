import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'medium', 
  color = 'border-blue-500' 
}) => {
  const sizeClasses = {
    small: 'h-6 w-6',
    medium: 'h-12 w-12',
    large: 'h-16 w-16'
  };

  return (
    <div className="flex justify-center items-center p-4">
      <div className={`animate-spin rounded-full ${sizeClasses[size]} border-t-2 border-b-2 ${color}`}></div>
    </div>
  );
};

export default LoadingSpinner; 