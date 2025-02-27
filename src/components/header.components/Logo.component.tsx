import React from 'react';
import { Link } from 'react-router-dom';

export const Logo = () => {
  return (
    <Link to='/'>
      <img src='https://upload.wikimedia.org/wikipedia/commons/7/71/Logo_UEH_xanh.png' alt='UEH Logo' className='h-8' />
    </Link>
  );
};
