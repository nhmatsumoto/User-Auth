import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  Navigate,
  RouterProvider
 } from 'react-router-dom';
import App from './App';
import Home from './routes/Home';
import Dashboard from './routes/Dashboard';
import { useAuth } from './Hooks/useAuth';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const PrivateRoute = ({ children } : { children : JSX.Element }) => {

  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

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
        path: '/private',
        element:  <PrivateRoute children={<Dashboard />}/>,
      }
    ]
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
