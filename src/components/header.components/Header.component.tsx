import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes.constant';
import { Logo } from './Logo.component';
import { Navigation } from './Navigation.component';
import { UserMenu } from './UserMenu.component';

export const Header = () => {
  // #005f69
  return (
    <header className='sticky top-0 bg-background-primary text-primary font-bold p-4 shadow-lg z-50'>
      <nav className='container mx-auto flex items-center justify-between'>
        <div className="flex items-center gap-2">
          <Logo />
          <p className='pl-2'>UEH Chatbot</p>
        </div>
        <Navigation />
        <UserMenu />
      </nav>
    </header>
  );
};
