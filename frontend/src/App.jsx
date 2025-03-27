import React from 'react'
import './App.css'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import HeroSection from './pages/student/HeroSection'

const App = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Login />

    </div>
  )
}

export default App
