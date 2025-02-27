import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  maxWidth?: string;
  maxHeight?: string;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl', maxHeight = 'max-h-[80vh]' }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
      <div className={`bg-background-primary rounded-lg shadow-xl w-full ${maxWidth} ${maxHeight} flex flex-col`}>
        {/* Header */}
        <div className='flex justify-between items-center border-b border-secondary p-4'>
          <h2 className='text-lg font-bold text-primary'>{title}</h2>
          <button onClick={onClose} className='p-1 rounded-full hover:bg-secondary transition-colors'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};
