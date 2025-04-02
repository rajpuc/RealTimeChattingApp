import React, { lazy, Suspense, useEffect } from "react";
import useThemeStore from "./store/useThemeStore.js";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Authentication from "./pages/Authentication.jsx";
import useAuthStore from "./store/useAuthStore.js";
import { Loader } from "lucide-react";



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

  const {loggedInUser, isCheckingAuth, checkAuth} = useAuthStore();

  useEffect(()=>{
    checkAuth();
  },[loggedInUser])

  if(isCheckingAuth && !loggedInUser) return <div className="w-full h-screen flex items-center justify-center">
    <Loader size={28} className="animate-spin text-cm-green-deep"/>
  </div>

  return (
    <>
      <Routes>
        <Route path="/" element={loggedInUser?<Navigate to="/chat"/>:<Authentication />}>
          <Route index element={<Login />} />
          <Route path="register" element={<Registration />} />
        </Route>
        <Route path="/chat" element={loggedInUser?<AppPage/>:<Navigate to="/"/>} />
      </Routes>
      <Toaster />
    
    </>
  );
};

export default App;
