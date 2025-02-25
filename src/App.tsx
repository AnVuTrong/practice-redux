import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routers/Router';
import { MainLayout } from './layouts/MainLayout.layout';
import { Provider } from 'react-redux';
import { store } from './stores/store.store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <Router />
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
