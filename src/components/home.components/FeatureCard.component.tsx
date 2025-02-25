import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-background-secondary p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-6 h-6 text-primary"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-primary mb-2">{title}</h2>
      <p className="text-text-secondary">{description}</p>
    </div>
  );
}; 