import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  RouterProvider
 } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import { PrivateRoute } from './components/PrivateRoute';
import { Dashboard } from './routes/Dashboard';
import { Login } from './routes/Login';
import { AuthProvider } from './contexts/Auth/AuthContext';

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
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        )
      }
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
