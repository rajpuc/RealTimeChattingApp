import React, { useEffect, useState } from 'react'
import useThemeStore from './store/useThemeStore.js';
import SidebarBtn from './components/SidebarBtn';
import { Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication.jsx';
import Login from './components/Login.jsx';
import Registration from './components/Registration.jsx';
import toast, { Toaster } from 'react-hot-toast';


const App = () => {
  const { darkMode } = useThemeStore();
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.removeItem("theme");
    }
  }, [darkMode])
  const notify = () => toast.success('Here is your toast.');
  return (
    <>
      <Routes>
        <Route path='/' element={<Authentication />}>
          <Route index element={<Login />} />
          <Route path='register' element={<Registration />} />
        </Route>
      </Routes>
      <Toaster/>
      {/* <SidebarBtn/> */}
    </>
  )
}

export default App
