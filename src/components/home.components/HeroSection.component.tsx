import React from 'react';
import { Link } from 'react-router-dom';

export const HeroSection: React.FC = () => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-5xl font-bold text-primary mb-6">
        Welcome to UEH Chatbot
      </h1>
      <p className="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
        Your intelligent assistant for all UEH-related questions. Get instant answers about courses, 
        campus life, and academic information.
      </p>
      <Link 
        to="/chat" 
        className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-lg 
                   transition-colors duration-300 inline-flex items-center gap-2"
      >
        Start Chatting
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={2} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      </Link>
    </div>
  );
}; 