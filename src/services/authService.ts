import api from './api';
import { LoginRequest } from '../types/LoginRequest';
import { LoginResponse } from '../types/LoginResponse';
import { RegisterUserRequest } from '../types/RegisterUserRequest';

export const register = async (data: RegisterUserRequest) => {
  try {
    const response = await api.post('HubbleAuth/register', data);
    return response.data;
  } catch (error) {
    console.error('Erro ao tentar registrar:', error);
    throw error;
  }
};

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('HubbleAuth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token); 
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao tentar fazer login:', error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem('token'); 
};
