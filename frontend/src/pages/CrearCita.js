import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/crearCita.css';

function CrearCita() {
  const [fecha, setFecha] = useState('');
  const [vehiculoId, setVehiculoId] = useState('');
  const [vehiculos, setVehiculos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/vehiculos', {
      headers: { Authorization: token }
    })
    .then(res => setVehiculos(res.data))
    .catch(() => setVehiculos([]));
  }, []);

  const manejarCita = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/citas', {
        fecha,
        vehiculo_id: vehiculoId
      }, {
        headers: { Authorization: token }
      });
      setMensaje('✅ Cita registrada exitosamente');
      setFecha('');
      setVehiculoId('');
    } catch {
      setMensaje('❌ Error al registrar la cita');
    }
  };

  return (
    <div className="crear-cita-container">
      <h2 className="crear-cita-title">Crear Nueva Cita</h2>
      <form className="crear-cita-form" onSubmit={manejarCita}>
        <input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} required />

        <select value={vehiculoId} onChange={(e) => setVehiculoId(e.target.value)} required>
          <option value="">Selecciona un vehículo</option>
          {vehiculos.map(v => (
            <option key={v.id} value={v.id}>{v.placa} - {v.marca} {v.modelo}</option>
          ))}
        </select>

        <button type="submit">Registrar Cita</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}

export default CrearCita;

