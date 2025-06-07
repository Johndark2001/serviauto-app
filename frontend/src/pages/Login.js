import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/login.css';

function Login() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const manejarLogin = async (e) => {
    e.preventDefault();
    setMensaje('');
    setCargando(true);

    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        correo,
        password
      });

      localStorage.setItem('token', res.data.token);
      setMensaje('✅ Bienvenido, redirigiendo...');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error(error);
      setMensaje('❌ Credenciales inválidas o usuario no registrado.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Iniciar Sesión</h2>
      <form className="auth-form" onSubmit={manejarLogin}>
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
        <button type="submit" disabled={cargando}>
          {cargando ? 'Ingresando...' : 'Ingresar'}
        </button>
      </form>

      <p className="auth-message">{mensaje}</p>

      {mensaje.includes('❌') && (
        <div style={{ marginTop: '15px' }}>
          <p>¿No tienes cuenta?</p>
          <Link to="/register" className="auth-register-link">Registrarse</Link>
        </div>
      )}
    </div>
  );
}

export default Login;
