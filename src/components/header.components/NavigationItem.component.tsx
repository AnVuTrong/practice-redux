import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationItem as NavigationItemType } from '../../types/navigation.types';

interface NavigationItemProps extends NavigationItemType {
  isFirst?: boolean;
  isMobile?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ 
  path, 
  label, 
  icon, 
  isFirst = false,
  isMobile = false 
}) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link 
      to={path} 
      className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-sm font-regular
        ${!isFirst && !isMobile ? 'ml-1' : ''}
        ${isMobile ? 'w-full' : ''}
        ${isActive 
          ? 'bg-[#005f69] text-white hover:bg-[#004a54]' 
          : 'bg-[#e5e7eb] text-black hover:bg-[#d7dadf] hover:text-[#005f69]'
        }`}
      onClick={() => {
        if (isMobile && window.innerWidth < 768) {
          // Close menu on mobile after clicking (you'll need to lift this state up)
          // setIsMenuOpen(false);
        }
      }}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.75" 
        stroke="currentColor" 
        className={`w-5 h-5 ${isActive ? 'stroke-white' : 'stroke-[#005f69]'}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {label}
    </Link>
  );
}; 