import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavigationItem as NavigationItemType } from '../../types/navigation.types';

interface NavigationItemProps extends NavigationItemType {
  isFirst?: boolean;
}

export const NavigationItem: React.FC<NavigationItemProps> = ({ path, label, icon, isFirst = false }) => {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link 
      to={path} 
      className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-sm ${
        !isFirst ? 'ml-1' : ''
      } ${
        isActive ? 'bg-[#005f69] text-white' : 'bg-[#e5e7eb] text-[#1b1b1b]'
      }`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        strokeWidth="1.5" 
        stroke="currentColor" 
        className={`w-4 h-4 ${isActive ? 'stroke-white' : 'stroke-[#005f69]'}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
      </svg>
      {label}
    </Link>
  );
}; 