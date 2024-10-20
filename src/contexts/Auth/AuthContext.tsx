import { useState, ReactNode, createContext, useContext, useEffect } from 'react';
import kc from '../../../keycloak';

interface AuthContextType {
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async () => {

        kc.init({ 
            onLoad: 'check-sso', //login-required
            checkLoginIframe: true,
            pkceMethod: 'S256' 
        }).then(authenticated => {
            setIsAuthenticated(authenticated);
        }).catch(() => {
            setIsAuthenticated(false);
        });

        await kc.login();
    }
    
    const logout = async () => {
        await kc.logout(
            // {
            //     //URL base da aplicação react;
            //     //Mudar para .env
            //     redirectUri: 'http://localhost:5173/home'
            // }
        );
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {

    const context = useContext(AuthContext);
    
    if (!context) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }

    return context;
};