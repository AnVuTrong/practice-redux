import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPrevious, onNext }) => {
  return (
    <div className='border-t border-secondary p-3 flex justify-between items-center'>
      <button
        onClick={onPrevious}
        disabled={currentPage === 0}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
          currentPage === 0
            ? 'text-text-secondary bg-secondary/30 cursor-not-allowed'
            : 'bg-secondary hover:bg-secondary-dark text-primary transition-colors'
        }`}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
        </svg>
        Trước
      </button>

      <div className='text-sm font-medium'>
        {currentPage + 1}/{totalPages}
      </div>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages - 1}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-md ${
          currentPage === totalPages - 1
            ? 'text-text-secondary bg-secondary/30 cursor-not-allowed'
            : 'bg-secondary hover:bg-secondary-dark text-primary transition-colors'
        }`}>
        Sau
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-4 h-4'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
        </svg>
      </button>
    </div>
  );
};
