import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './Layout/MainLayout';
import Login from './pages/Login';
import LayoutUi from './Layout/HomeLayoutroutes';
import MyLearning from './pages/student/MyLearning';
import Profile from './pages/student/Profile';
import Sidebar from './pages/admin/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import CourseTable from './pages/admin/course/CourseTable';
import AddCourse from './pages/admin/course/AddCourse';
import EditCourse from './pages/admin/course/EditCourse';
import NoPage from './pages/NoPage';


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
          <Route path='*' element={<NoPage />} />

          {/* Admin */}
          <Route path='admin' element={<Sidebar />} >
            <Route path='dashboard' element={<Dashboard />} />
            <Route path='course' element={<CourseTable />} />
            <Route path='course/create' element={<AddCourse />} />
            <Route path='course/:courseId' element={<EditCourse />} />

          </Route>
        </Route>


      </Routes>
    </Router>
  );
};

export default App;
