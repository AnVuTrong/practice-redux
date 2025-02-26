import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/Routes.constant';
import { Logo } from './Logo.component';
import { Navigation } from './Navigation.component';

export const Header = () => {
  // #005f69
  return (
    <header className='bg-background-primary text-primary font-bold p-4 shadow-lg z-10 relative'>
      <nav className='container mx-auto flex items-center justify-between'>
        <Logo />
        <p className='pl-2'>UEH Chatbot</p>
        <Navigation />
      </nav>
    </header>
  );
};
