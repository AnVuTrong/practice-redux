import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

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

export const Router = () => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-full">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/redux-test" element={<ReduxTest />} />
        <Route path="/todo-test" element={<TodoTest />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/file-manager" element={<FileManager />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
