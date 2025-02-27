import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Router } from './routers/Router';
import { MainLayout } from './layouts/MainLayout.layout';
import { Provider } from 'react-redux';
import { store } from './stores/store.store';
import { UserProvider } from './contexts/UserProvider';
import SignIn from './pages/SignIn.page';
import SignUp from './pages/SignUp.page';

// Component to conditionally render layout based on route
const AppLayout = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return (
    <>
      {isAuthPage ? (
        <Routes>
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      ) : (
        <MainLayout>
          <Router />
        </MainLayout>
      )}
    </>
  );
};

function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <AppLayout />
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
}

export default App;
