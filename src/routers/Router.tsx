import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, ReactNode } from 'react';
import { useAppSelector } from '../hooks/redux.hook';

// Lazy load components
const Home = lazy(() => import('../pages/Home.page'));
const About = lazy(() => import('../pages/About.page'));
const ReduxTest = lazy(() => import('../pages/ReduxTest.page'));
const NotFound = lazy(() => import('../pages/NotFound.page'));
const TodoTest = lazy(() => import('../pages/TodoTest.page'));
const Chat = lazy(() => import('../pages/Chat.page'));
const Agents = lazy(() => import('../pages/Agents.page'));
const FileManager = lazy(() => import('../pages/FileManager.page'));
const Settings = lazy(() => import('../pages/Settings.page'));
const GraphQL = lazy(() => import('../pages/GraphQL.page'));

// Protected route component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to='/signin' replace />;
  }

  return <>{children}</>;
};

export const Router = () => {
  return (
    <Suspense fallback={<div className='flex items-center justify-center h-full'>Loading...</div>}>
      <Routes>
        {/* Protected routes */}
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/about'
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path='/redux-test'
          element={
            <ProtectedRoute>
              <ReduxTest />
            </ProtectedRoute>
          }
        />
        <Route
          path='/todo-test'
          element={
            <ProtectedRoute>
              <TodoTest />
            </ProtectedRoute>
          }
        />
        <Route
          path='/chat'
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        />
        <Route
          path='/agents'
          element={
            <ProtectedRoute>
              <Agents />
            </ProtectedRoute>
          }
        />
        <Route
          path='/file-manager'
          element={
            <ProtectedRoute>
              <FileManager />
            </ProtectedRoute>
          }
        />
        <Route
          path='/settings'
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path='/graphql'
          element={
            <ProtectedRoute>
              <GraphQL />
            </ProtectedRoute>
          }
        />

        {/* 404 route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
