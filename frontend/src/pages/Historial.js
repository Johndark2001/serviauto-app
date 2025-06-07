import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/historial.css';

function Historial() {
  const [vehiculos, setVehiculos] = useState([]);
  const [vehiculoId, setVehiculoId] = useState('');
  const [historial, setHistorial] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/vehiculos', {
      headers: { Authorization: token }
    })
    .then(res => setVehiculos(res.data))
    .catch(() => setMensaje('❌ Error al cargar vehículos'));
  }, []);

  const cargarHistorial = () => {
    if (!vehiculoId) return;

    axios.get(`http://localhost:5000/api/historial/vehiculo/${vehiculoId}`, {
      headers: { Authorization: token }
    })
    .then(res => setHistorial(res.data))
    .catch(() => setMensaje('❌ Error al cargar historial'));
  };

  return (
    <div className="historial-container">
      <h2 className="historial-title">Historial de Servicio</h2>

      <select className="historial-select" value={vehiculoId} onChange={(e) => setVehiculoId(e.target.value)}>
        <option value="">-- Selecciona un vehículo --</option>
        {vehiculos.map((v) => (
          <option key={v.id} value={v.id}>
            {v.placa} - {v.marca} {v.modelo}
          </option>
        ))}
      </select>

      <button className="historial-btn" onClick={cargarHistorial} disabled={!vehiculoId}>Consultar</button>

      <p>{mensaje}</p>

      {historial.length > 0 && (
        <table className="historial-table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Descripción</th>
            </tr>
          </thead>
          <tbody>
            {historial.map((h, index) => (
              <tr key={index}>
                <td>{new Date(h.fecha).toLocaleString()}</td>
                <td>{h.descripcion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {historial.length === 0 && vehiculoId && <p>🚫 No hay historial para este vehículo</p>}
    </div>
  );
}

export default Historial;

