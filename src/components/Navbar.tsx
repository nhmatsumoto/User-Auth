import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/Auth/AuthContext';


const Navbar = () => {

  const { isAuthenticated, logout, login } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/">Gerenciador de usuários</Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </>
            ) : (
              <li>
                <button onClick={login}>Login</button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;