import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/verCitas.css';

function ListaCitas() {
  const [citas, setCitas] = useState([]);
  const [mensaje, setMensaje] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/citas', {
      headers: { Authorization: token }
    })
    .then(res => {
      setCitas(res.data);
    })
    .catch(() => {
      setMensaje('❌ No se pudieron cargar las citas');
    });
  }, []);

  const cancelarCita = (id) => {
    if (!window.confirm('¿Estás seguro de cancelar esta cita?')) return;

    axios.put(`http://localhost:5000/api/citas/${id}/cancelar`, {}, {
      headers: { Authorization: token }
    })
    .then(() => {
      setMensaje('🗑️ Cita cancelada');
      setCitas(citas.map(c => c.id === id ? { ...c, estado: 'cancelada' } : c));
    })
    .catch(() => {
      setMensaje('❌ Error al cancelar la cita');
    });
  };

  return (
    <div className="citas-container">
      <h2 className="citas-title">Listado de Citas</h2>
      {mensaje && <p>{mensaje}</p>}

      {citas.length === 0 ? (
        <p>No hay citas registradas</p>
      ) : (
        <table className="citas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Fecha</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {citas.map((cita) => (
              <tr key={cita.id}>
                <td>{cita.id}</td>
                <td>{new Date(cita.fecha).toLocaleString()}</td>
                <td>{cita.estado}</td>
                <td>
                  {cita.estado === 'activa' && (
                    <button className="cancelar-btn" onClick={() => cancelarCita(cita.id)}>
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ListaCitas;
