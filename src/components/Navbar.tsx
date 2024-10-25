import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext';


const Navbar = () => {

  const { isAuthenticated, logout, login } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Hubble</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {isAuthenticated ? (
            <>
              <li>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <a className="nav-link" onClick={logout}>Logout</a>
              </li>
            </>
            ) : (
              <li>
                
                <a className="nav-link" onClick={async () => await login({username:'admin@hubble.com', password:'Admin@123'})}>Login</a>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;