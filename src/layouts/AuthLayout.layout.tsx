import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  imageSrc = 'https://www.ueh.edu.vn/images/ueh.jpg',
  imageAlt = 'UEH Campus'
}) => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Image section - only visible on md screens and above */}
      <div className="hidden md:flex md:w-1/2 bg-primary relative">
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="object-cover w-full h-full"
        />
        {/* Colored overlay */}
        <div className="absolute inset-0 bg-primary/20 mix-blend-multiply"></div>
      </div>
      
      {/* Auth form section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8">
        {/* Background decorative element */}
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-r from-primary/20 to-purple-500/20 -z-10 md:hidden"></div>
        
        {children}
      </div>
    </div>
  );
}; 