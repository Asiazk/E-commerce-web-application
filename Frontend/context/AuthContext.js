import { createContext, useState, useEffect } from "react";


export const AuthContext = createContext({});

function load(key) {
    const item = sessionStorage.getItem(key);
    return item != null ? JSON.parse(item) : {};
}

const initialUserTypeState = {
        admin: false,
        regUser: false
}

export const AuthProvider = ({ children }) => {
    
    const [user, setUser] = useState(load('user'));
    const [userType, setUserType] = useState(load('userType'));
   
    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
        }, [user]);
    
    useEffect(() => {
        sessionStorage.setItem('userType', JSON.stringify(userType));
        }, [userType]);


    const handleLogin = () => {
        const user = getCurrentUser();
        console.log(user)
        
        if (user) {
            console.log("inside if handle login: " + user.role.includes('USER') + "," + user.role.includes('ADMIN'))
            setUserType({
                admin: user.role.includes('ADMIN'),
                regUser: user.role.includes('USER')
            });
        console.log(sessionStorage.getItem('userType'))
        }

    };


    const getCurrentUser = () => {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    const getUserType = () => {
        return JSON.parse(sessionStorage.getItem('userType'))
    }

    const logout = () => {
        sessionStorage.clear();
        setUserType(initialUserTypeState);
        window.location.reload();
    }

    const values = {
        user, setUser,
        userType,
        setUserType,
        handleLogin,
        getCurrentUser,
        logout,
        getUserType,
    }

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;