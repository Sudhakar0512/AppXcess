import React, { createContext, useState, useContext } from 'react';
import { login as apiLogin, logout as apiLogout, getUser } from '../components/utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getUser());

    const login = async (username, password) => {
        await apiLogin(username, password);
        setUser(getUser());
    };

    const logout = () => {
        apiLogout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
