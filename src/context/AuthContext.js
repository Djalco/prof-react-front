import { createContext, useState, useContext, useEffect } from 'react';
import { authUtils } from '../utils/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(authUtils.isAuthenticated());

    const login = (token) => {
        authUtils.setToken(token);
        setIsAuthenticated(true);
    };

    const logout = () => {
        authUtils.removeToken();
        setIsAuthenticated(false);
    };

    useEffect(() => {
        setIsAuthenticated(authUtils.isAuthenticated());
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider');
    }
    return context;
};
