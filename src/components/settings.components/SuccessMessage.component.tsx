import React from 'react';

interface SuccessMessageProps {
  message: string;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => {
  return <div className='mt-4 p-2 bg-green-100 text-green-800 rounded-md text-center'>{message}</div>;
};
