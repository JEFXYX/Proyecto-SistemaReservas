import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });

  const fetchClientes = () => {
    axios.get('http://localhost:8080/api/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/clientes', formData)
      .then(() => {
        fetchClientes();
        setShowModal(false);
        setFormData({ nombre: '', apellido: '', email: '', telefono: '' });
        toast.success('Cliente guardado exitosamente');
      })
      .catch(err => {
        console.error("Error creating cliente", err);
        const errorMsg = err.response?.data || 'Error al guardar el cliente.';
        toast.error(errorMsg);
      });
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Seguro que deseas eliminar este cliente?')) {
      axios.delete(`http://localhost:8080/api/clientes/${id}`)
        .then(() => fetchClientes())
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-display text-on-surface mb-1">Gestión de Clientes</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Directorio y perfiles</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-brand-emerald text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-95"
        >
          <span className="material-symbols-outlined">add</span> Nuevo Cliente
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant custom-shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Nombre</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Email</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Teléfono</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Estado</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {clientes.map(c => (
              <tr key={c.id} className="hover:bg-surface-container-lowest transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center text-on-surface-variant font-bold text-xs">
                      {c.nombre.charAt(0)}{c.apellido.charAt(0)}
                    </div>
                    <span className="font-bold">{c.nombre} {c.apellido}</span>
                  </div>
                </td>
                <td className="p-4 text-on-surface-variant">{c.email}</td>
                <td className="p-4 text-on-surface-variant">{c.telefono}</td>
                <td className="p-4">
                  {c.activo ? (
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100">Activo</span>
                  ) : (
                    <span className="px-2 py-1 bg-error-container text-on-error-container rounded-full text-xs font-bold">Inactivo</span>
                  )}
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(c.id)} className="text-error hover:opacity-80">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {clientes.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-on-surface-variant">No hay clientes registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h3 className="font-headline-md font-bold mb-4">Nuevo Cliente</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Nombre</label>
                <input required type="text" className="w-full border rounded p-2" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Apellido</label>
                <input required type="text" className="w-full border rounded p-2" value={formData.apellido} onChange={e => setFormData({...formData, apellido: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Email</label>
                <input required type="email" className="w-full border rounded p-2" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Teléfono</label>
                <input type="text" className="w-full border rounded p-2" value={formData.telefono} onChange={e => setFormData({...formData, telefono: e.target.value})} />
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-brand-emerald text-white font-bold rounded">Guardar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes;
