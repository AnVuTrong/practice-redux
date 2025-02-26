import React from 'react';
import { Header } from '../components/header.components/Header.component';
import { Footer } from '../components/footer.components/Footer.component';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-hidden">{children}</main>
      <Footer />
    </div>
  );
}; 