import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const SettingsSidebar: React.FC = () => {
  const location = useLocation();
  const isPersonalInfoActive = location.pathname === '/settings';

  return (
    <div className='w-64 border-r border-secondary h-full'>
      <div className='py-4'>
        <Link to='/settings' className={`flex items-center w-full ${isPersonalInfoActive ? 'bg-primary text-white' : 'hover:bg-secondary'}`}>
          <div className='flex items-center py-3 px-4 w-full'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-5 h-5 mr-3'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
              />
            </svg>
            <span>Thông tin cá nhân</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
