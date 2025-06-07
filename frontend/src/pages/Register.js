import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/register.css';

function Register() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('cliente');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setMensaje('');
    setCargando(true);

    try {
      await axios.post('http://localhost:5000/api/register', {
        nombre,
        correo,
        password,
        rol
      });

      setMensaje('✅ Registro exitoso. Redirigiendo al login...');
      setNombre('');
      setCorreo('');
      setPassword('');
      setRol('cliente');

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Error al registrar. Intenta de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Registro de Usuario</h2>
      <form className="auth-form" onSubmit={manejarRegistro}>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={rol} onChange={(e) => setRol(e.target.value)}>
          <option value="cliente">Cliente</option>
          <option value="empleado">Empleado</option>
          <option value="admin">Administrador</option>
        </select>
        <button type="submit" disabled={cargando}>
          {cargando ? 'Registrando...' : 'Registrar'}
        </button>
      </form>

      <p className="auth-message">{mensaje}</p>

      <div style={{ marginTop: '15px' }}>
        <p>¿Ya tienes cuenta?</p>
        <Link to="/login" className="auth-register-link">Iniciar sesión</Link>
      </div>
    </div>
  );
}

export default Register;
