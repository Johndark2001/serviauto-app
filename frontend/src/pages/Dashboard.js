import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import '../styles/dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [rol, setRol] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRol(decoded.rol);
      } catch {
        localStorage.removeItem('token');
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Panel de Control - ServiAuto</h2>

      <div className="dashboard-grid">
        {rol === 'cliente' && (
          <>
            <button className="dashboard-button" onClick={() => navigate('/crear-cita')}>📅 Crear Cita</button>
            <button className="dashboard-button" onClick={() => navigate('/citas')}>📄 Ver Citas</button>
            <button className="dashboard-button" onClick={() => navigate('/vehiculos')}>🚗 Gestionar Vehículos</button>
            <button className="dashboard-button" onClick={() => navigate('/historial')}>🧾 Historial</button>
          </>
        )}

        {rol === 'empleado' && (
          <>
            <button className="dashboard-button" onClick={() => navigate('/citas')}>📄 Ver Citas de Todos</button>
            <button className="dashboard-button" onClick={() => navigate('/historial')}>🧾 Ver Historial</button>
          </>
        )}

        {rol === 'admin' && (
          <>
            <button className="dashboard-button" onClick={() => navigate('/citas')}>📄 Todas las Citas</button>
            <button className="dashboard-button" onClick={() => navigate('/vehiculos')}>🚗 Todos los Vehículos</button>
            <button className="dashboard-button" onClick={() => navigate('/historial')}>🧾 Historial General</button>
          </>
        )}

        <button className="dashboard-button logout-button" onClick={cerrarSesion}>🔓 Cerrar Sesión</button>
      </div>
    </div>
  );
}

export default Dashboard;
