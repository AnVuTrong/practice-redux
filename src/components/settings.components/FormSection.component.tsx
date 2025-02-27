import React from 'react';

interface FormSectionProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ title = '', children, className = '' }) => {
  return (
    <div className={`mb-6 ${className}`}>
      {title && <h2 className='text-xl font-semibold text-gray-800 mb-4'>{title}</h2>}
      {children}
    </div>
  );
};
