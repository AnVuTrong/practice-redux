import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constant';
import { Logo } from './Logo.component';
import { Navigation } from './Navigation.component';

export const Header = () => {
  // #005f69
  return (
    <header className='bg-[#ffffff] text-[#005f69] font-bold p-4 shadow-lg relative'>
      <nav className='container mx-auto flex items-center justify-between'>
        <Logo />
        <p className='pl-2'>UEH Chatbot</p>
        <Navigation />
      </nav>
    </header>
  );
};
