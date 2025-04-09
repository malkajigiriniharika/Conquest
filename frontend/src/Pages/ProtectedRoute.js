import { Outlet, Navigate } from "react-router-dom";

export const ProtectedRoute =()=>{
    const token= localStorage.getItem("token");
    console.log("Token in Protected "+token);
    return token ? <Outlet/> : <Navigate to="/"/>;
};