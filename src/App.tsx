import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routers/Router';
import { MainLayout } from './layouts/MainLayout.layout';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Router />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
