import { useState, ReactNode, createContext, useContext } from 'react';
import { Login } from '../../types/Login';
import { RegisterUser } from '../../types/RegisterUser';
import axios, { AxiosResponse } from 'axios';

const API_URL = 'https://localhost:7114';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (loginData: Login) => Promise<void>;
    logout: () => Promise<void>;
    register: (registerUser: RegisterUser) => Promise<AxiosResponse<any, any>>;
    getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children } : { children: ReactNode }) => {
    
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = async (loginData: Login) => {

        try {
            const response = await axios.post(`${API_URL}/HubbleAuth/login`, loginData);

            if (response.data.token) {
                setIsAuthenticated(true);
                localStorage.setItem('token', response.data.token);
                console.log(response.data.token);
            }

            return response.data;

        }catch(error){
            console.log(error);
        }
        
    }
    
    const logout = async () => {

        localStorage.removeItem('token');
        setIsAuthenticated(false);

    }

    const register = async (registerUser: RegisterUser) => {

        const response = await axios.post(`${API_URL}/HubbleAuth/register`, registerUser);
        console.log(response);
        return response;
        
    }

    const getToken = () => localStorage.getItem('token');

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout, register, getToken }}>
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