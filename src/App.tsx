import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from './routers/Router';
import { MainLayout } from './layouts/MainLayout.layout';
import { Provider } from 'react-redux';
import { store } from './stores/store.store';
import { UserProvider } from './contexts/UserProvider';

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <MainLayout>
            <Router />
          </MainLayout>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
}

export default App;
