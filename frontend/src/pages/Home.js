import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

function Home() {
  return (
    <div
      className="home-container"
      style={{
        backgroundImage: "url('/assets/IMAGEN SERVI-AUTO HOME.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="home-overlay">
        <div className="home-logo">🛠️ ServiAuto</div>
        <div className="home-subtitle">Sistema de Gestión de Taller Automotriz</div>

        <div className="home-buttons">
          <Link to="/login" className="home-button">Iniciar Sesión</Link>
          <Link to="/register" className="home-button">Registrarse</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
