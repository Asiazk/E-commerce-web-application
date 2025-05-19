import React, { useContext } from "react";
import { useState } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

const AdminRoute = ({children}) => {
    const { user, logout } = useContext(AuthContext);
    const [jwt, setJwt] = useState(user.token);
    const [loading, setLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);
    const BASE_ADMIN_AUTH_URL = "http://localhost:8080/admin"
    const navigate = useNavigate();

    function out() {
        logout();
        navigate("/login");
    }
    // console.log("admin user:" + JSON.stringify(user))
    // console.log(user);
    // console.log("role: " + user.role)

    if (user && jwt && user.role==='ADMIN') {
        AuthService(BASE_ADMIN_AUTH_URL + `/validate?token=${jwt}`, 'post', jwt, user).then((isValid) => {
        setIsValid(isValid);
        setLoading(false)});
    }
    else {
        return <Navigate to="/admin/signIn" />;
    }

    return loading ? (<div className="left-5">Loading...</div>) : 
           isValid === true ? ( children ) : ( out() );
       
};

export default AdminRoute;