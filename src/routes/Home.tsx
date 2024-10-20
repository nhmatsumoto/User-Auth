import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => (
  <div>
    {/* <h1>Página Pública</h1>
    <Link to="/private">Ir para a Página Privada</Link> */}
    <button className="btn btn-success button-rodela" onClick={() => {

      alert('Rodela na área');
    }}>Clica aqui</button>
  </div>
);

export default Home;
