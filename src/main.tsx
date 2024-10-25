import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  RouterProvider
 } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import { Dashboard } from './routes/Dashboard';
import { AuthProvider } from './contexts/Auth/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import { ProtectedRoute } from './routes/ProtectedRoute';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>
);
