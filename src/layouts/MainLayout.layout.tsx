import React from 'react';
import { Header } from '../components/header.components/Header.component';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex overflow-hidden">{children}</main>
    </div>
  );
}; 