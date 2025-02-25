import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Lazy load components
const Home = lazy(() => import('../pages/Home.page'));
const About = lazy(() => import('../pages/About.page'));
const NotFound = lazy(() => import('../pages/NotFound.page'));

export const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
