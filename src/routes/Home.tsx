import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div>
    <h1>Página Pública</h1>
    <Link to="/private">Ir para a Página Privada</Link>
  </div>
);

export default Home;
