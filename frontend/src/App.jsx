import React, { lazy, Suspense, useEffect } from "react";
import useThemeStore from "./store/useThemeStore.js";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Authentication from "./pages/Authentication.jsx";


const Login = lazy(() => import("./components/Login.jsx"));
const Registration = lazy(() => import("./components/Registration.jsx"));
const AppPage = lazy(()=>import("./pages/AppPage.jsx"));

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
  }, [darkMode]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Authentication />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>
        <Route path="/chat" element={<AppPage/>} />
      </Routes>
      <Toaster />
    
    </>
  );
};

export default App;
