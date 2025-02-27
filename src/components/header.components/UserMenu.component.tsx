import React, { useState } from 'react';
import { useAppSelector } from '../../hooks/redux.hook';

export const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAppSelector(state => state.user);
  
  // Default values if user is not available
  const userInitial = currentUser?.avatar || 'G';
  const userName = currentUser?.name || 'Guest';

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-secondary transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
          <span className="text-sm">{userInitial}</span>
        </div>
        <p className="text-sm font-bold text-text-primary">{userName}</p>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
          </div>
        </div>
      )}
    </div>
  );
}; 