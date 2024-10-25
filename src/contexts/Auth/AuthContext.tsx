import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
//import { useNavigate } from 'react-router-dom';
import { 
    login as loginService, 
    logout as logoutService, 
    register as registerService 
} from '../../services/authService';
import { LoginRequest } from '../../types/LoginRequest';
import { RegisterUserRequest } from '../../types/RegisterUserRequest';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterUserRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!localStorage.getItem('token'));
  //const navigate = useNavigate();

  useEffect(() => {
    // Verifica se existe um token para definir o estado inicial de autenticação
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      await loginService(data);
      setIsAuthenticated(true);
      //navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      throw error;
    }
  };

  const register = async (data: RegisterUserRequest) => {
    try {
      await registerService(data);
      //navigate('/login'); // Redireciona para login após o registro
    } catch (error) {
      console.error('Erro ao registrar:', error);
      throw error;
    }
  };

  const logout = () => {
    logoutService();
    setIsAuthenticated(false);
    //navigate('/login'); // Redireciona para a página de login após logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
