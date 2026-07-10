import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === '0105937148' && password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      setAuth(true);
      navigate('/');
    } else {
      setError('Credenciales incorrectas. Intente nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl border border-outline-variant custom-shadow max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="font-display text-headline-lg text-primary font-bold">CourtManager</h1>
          <p className="text-on-surface-variant font-body-md mt-2">Acceso a reservas de canchas</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-label-md font-bold text-on-surface mb-2">Usuario (Cédula)</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-brand-emerald text-body-md"
              placeholder="0105937148"
              required
            />
          </div>

          <div>
            <label className="block text-label-md font-bold text-on-surface mb-2">Contraseña</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant focus:outline-none focus:ring-2 focus:ring-brand-emerald text-body-md"
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="text-error text-sm font-bold bg-error-container p-3 rounded-lg">{error}</p>}

          <button 
            type="submit"
            className="w-full bg-brand-emerald text-white font-bold py-3 px-4 rounded-lg hover:brightness-95 transition-all mt-4"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
