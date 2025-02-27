import React, { useState } from 'react';
import { NavigationItem } from './NavigationItem.component';
import { NAVIGATION_ITEMS } from '../../constants/Navigation.constant';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='flex-1 flex justify-center'>
      {/* Mobile Menu Button */}
      <button className='md:hidden p-2 text-primary' onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5'}
          />
        </svg>
      </button>

      {/* Desktop Navigation */}
      <div className='hidden md:flex bg-secondary rounded-lg'>
        {NAVIGATION_ITEMS.map((item, index) => (
          <NavigationItem key={item.path} {...item} isFirst={index === 0} />
        ))}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className='absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden z-50'>
          <div className='flex flex-col p-4 space-y-2'>
            {NAVIGATION_ITEMS.map((item, index) => (
              <NavigationItem key={item.path} {...item} isFirst={index === 0} isMobile={true} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
