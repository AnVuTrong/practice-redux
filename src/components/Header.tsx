import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes';

export const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <nav className="container mx-auto flex gap-4">
        <Link to={ROUTES.HOME}>Home</Link>
        <Link to={ROUTES.ABOUT}>About</Link>
      </nav>
    </header>
  );
}; 