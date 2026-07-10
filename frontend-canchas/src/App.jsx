import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Canchas from './pages/Canchas'
import Reservas from './pages/Reservas'
import Pagos from './pages/Pagos'
import Login from './pages/Login'

import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 4000, style: { background: '#363636', color: '#fff', fontWeight: 'bold' } }} />
      <Routes>
        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        
        <Route path="/" element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="canchas" element={<Canchas />} />
          <Route path="reservas" element={<Reservas />} />
          <Route path="pagos" element={<Pagos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
