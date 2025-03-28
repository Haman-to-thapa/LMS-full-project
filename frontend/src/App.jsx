import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Login from './pages/Login';
import LayoutUi from './Layout/HomeLayoutroutes';
import MyLearning from './pages/student/MyLearning';
import Profile from './pages/student/Profile';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Wrap pages that need layout inside MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<LayoutUi />} />
          <Route path="login" element={<Login />} />
          <Route path="my-learning" element={<MyLearning />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
