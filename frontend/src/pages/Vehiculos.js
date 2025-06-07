import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/vehiculos.css';

function Vehiculos() {
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [vehiculos, setVehiculos] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const cargarVehiculos = () => {
    axios.get('http://localhost:5000/api/vehiculos', {
      headers: { Authorization: token }
    })
    .then(res => setVehiculos(res.data))
    .catch(() => setMensaje('❌ Error al cargar los vehículos'));
  };

  const registrarVehiculo = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/vehiculos', {
      placa, marca, modelo
    }, {
      headers: { Authorization: token }
    })
    .then(() => {
      setMensaje('✅ Vehículo registrado');
      setPlaca('');
      setMarca('');
      setModelo('');
      cargarVehiculos();
    })
    .catch(() => setMensaje('❌ Error al registrar vehículo'));
  };

  const eliminarVehiculo = (id) => {
    if (!window.confirm('¿Eliminar este vehículo?')) return;

    axios.delete(`http://localhost:5000/api/vehiculos/${id}`, {
      headers: { Authorization: token }
    })
    .then(() => {
      setMensaje('🗑️ Vehículo eliminado');
      cargarVehiculos();
    })
    .catch(() => setMensaje('❌ Error al eliminar vehículo'));
  };

  return (
    <div className="vehiculos-container">
      <h2 className="vehiculos-title">Gestión de Vehículos</h2>

      <form className="vehiculos-form" onSubmit={registrarVehiculo}>
        <input type="text" placeholder="Placa" value={placa} onChange={(e) => setPlaca(e.target.value)} required />
        <input type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)} required />
        <input type="text" placeholder="Modelo" value={modelo} onChange={(e) => setModelo(e.target.value)} required />
        <button type="submit">Registrar Vehículo</button>
      </form>

      <p>{mensaje}</p>

      <h3>Vehículos registrados</h3>
      {vehiculos.length === 0 ? (
        <p>No hay vehículos</p>
      ) : (
        <table className="vehiculos-table">
          <thead>
            <tr>
              <th>Placa</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {vehiculos.map((v) => (
              <tr key={v.id}>
                <td>{v.placa}</td>
                <td>{v.marca}</td>
                <td>{v.modelo}</td>
                <td>
                  <button className="eliminar-btn" onClick={() => eliminarVehiculo(v.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Vehiculos;
