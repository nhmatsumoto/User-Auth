import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_HUBBLE_API_URL, // Puxa a URL da API do .env
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar o token JWT nas requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Se o token expirar ou o usuário não estiver autenticado
      localStorage.removeItem('token'); // Remove o token inválido
      window.location.href = '/login'; // Redireciona para a página de login
    }
    return Promise.reject(error);
  }
);

export default api;
