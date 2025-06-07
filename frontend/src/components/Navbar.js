import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './navbar.css';

function Navbar() {
  const [tokenValido, setTokenValido] = useState(false);
  const [rol, setRol] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    try {
      if (token) {
        const decoded = jwtDecode(token);
        setRol(decoded.rol);
        setTokenValido(true);
      }
    } catch {
      setTokenValido(false);
    }
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">ServiAuto</div>
      <div className="navbar-links">
        {!tokenValido ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Registro</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>
            {rol === 'admin' && <Link to="/vehiculos">Vehículos</Link>}
            <button onClick={cerrarSesion} className="navbar-button">Cerrar sesión</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
