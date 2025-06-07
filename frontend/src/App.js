import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CrearCita from './pages/CrearCita';
import ListaCitas from './pages/ListaCitas';
import Vehiculos from './pages/Vehiculos';
import Historial from './pages/Historial';
import Navbar from './components/Navbar';

function AppContent() {
  const location = useLocation();
  const esInicio = location.pathname === '/';

  return (
    <>
      {!esInicio && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crear-cita" element={<CrearCita />} />
        <Route path="/citas" element={<ListaCitas />} />
        <Route path="/vehiculos" element={<Vehiculos />} />
        <Route path="/historial" element={<Historial />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

