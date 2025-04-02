import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const ProtectedRoute = ({ loggedInUser }) => {
  useEffect(() => {
    if (!loggedInUser) {
      toast.error("Please login first");
    }
  }, [loggedInUser]); 

  return loggedInUser ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
