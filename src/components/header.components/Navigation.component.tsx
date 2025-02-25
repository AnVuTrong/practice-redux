import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants/routes.constant';

export const Navigation = () => {
  const location = useLocation();

  return (
    <div className="flex-1 flex justify-center">
      <div className="bg-[#e5e7eb] rounded-lg flex">
        <Link 
          to={ROUTES.HOME} 
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ${
            location.pathname === ROUTES.HOME ? 'bg-[#005f69] text-white' : 'bg-[#e5e7eb] text-black'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className={`w-5 h-5 ${location.pathname === ROUTES.HOME ? 'stroke-white' : 'stroke-[#005f69]'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Home
        </Link>
        
        <Link 
          to={ROUTES.ABOUT} 
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ml-1 ${
            location.pathname === ROUTES.ABOUT ? 'bg-[#005f69] text-white' : 'bg-[#e5e7eb] text-black'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className={`w-5 h-5 ${location.pathname === ROUTES.ABOUT ? 'stroke-white' : 'stroke-[#005f69]'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
          About
        </Link>
        
        <Link 
          to={ROUTES.REDUX_TEST} 
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ml-1 ${
            location.pathname === ROUTES.REDUX_TEST ? 'bg-[#005f69] text-white' : 'bg-[#e5e7eb] text-black'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className={`w-5 h-5 ${location.pathname === ROUTES.REDUX_TEST ? 'stroke-white' : 'stroke-[#005f69]'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
          </svg>
          Redux Test
        </Link>
        
        <Link 
          to={ROUTES.TODO_TEST} 
          className={`flex items-center gap-2 px-3 py-1.5 rounded transition-colors ml-1 ${
            location.pathname === ROUTES.TODO_TEST ? 'bg-[#005f69] text-white' : 'bg-[#e5e7eb] text-black'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" 
            className={`w-5 h-5 ${location.pathname === ROUTES.TODO_TEST ? 'stroke-white' : 'stroke-[#005f69]'}`}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
          Todo Test
        </Link>
      </div>
    </div>
  );
}; 