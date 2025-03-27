import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import HeroSection from './pages/student/HeroSection';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Wrap pages that need layout inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HeroSection />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
