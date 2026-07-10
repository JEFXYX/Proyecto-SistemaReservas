import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Canchas = () => {
  const [canchas, setCanchas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: 'Fútbol 7',
    precioHora: '',
    estado: 'activa',
    descripcion: ''
  });

  const [editingId, setEditingId] = useState(null);

  const fetchCanchas = () => {
    axios.get('http://localhost:8080/api/canchas')
      .then(res => setCanchas(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCanchas();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      axios.put(`http://localhost:8080/api/canchas/${editingId}`, formData)
        .then(() => {
          fetchCanchas();
          closeModal();
          toast.success('Cancha actualizada exitosamente');
        })
        .catch(err => {
          console.error("Error updating cancha", err);
          const errorMsg = err.response?.data || 'Error al actualizar la cancha.';
          toast.error(errorMsg);
        });
    } else {
      axios.post('http://localhost:8080/api/canchas', formData)
        .then(() => {
          fetchCanchas();
          closeModal();
          toast.success('Cancha guardada exitosamente');
        })
        .catch(err => {
          console.error("Error creating cancha", err);
          const errorMsg = err.response?.data || 'Error al guardar la cancha.';
          toast.error(errorMsg);
        });
    }
  };

  const handleEdit = (c) => {
    setEditingId(c.id);
    setFormData({ nombre: c.nombre, tipo: c.tipo, precioHora: c.precioHora, estado: c.estado, descripcion: c.descripcion || '' });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ nombre: '', tipo: 'Fútbol 7', precioHora: '', estado: 'activa', descripcion: '' });
  };

  const handleDelete = (id) => {
    if(window.confirm('¿Seguro que deseas eliminar esta cancha?')) {
      axios.delete(`http://localhost:8080/api/canchas/${id}`)
        .then(() => fetchCanchas())
        .catch(err => console.error(err));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-display text-on-surface mb-1">Gestión de Canchas</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Inventario y estado de las instalaciones</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-brand-emerald text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:brightness-95"
        >
          <span className="material-symbols-outlined">add</span> Nueva Cancha
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {canchas.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-outline-variant custom-shadow overflow-hidden flex flex-col">
            <div className="h-32 bg-surface-container flex items-center justify-center relative">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant opacity-20">sports_tennis</span>
              <div className="absolute top-2 right-2 flex gap-1">
                <button onClick={() => handleEdit(c)} className="w-8 h-8 rounded-full bg-white text-brand-emerald flex items-center justify-center custom-shadow hover:bg-emerald-50">
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button onClick={() => handleDelete(c.id)} className="w-8 h-8 rounded-full bg-white text-error flex items-center justify-center custom-shadow hover:bg-error-container">
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-headline-md font-bold text-on-surface">{c.nombre}</h3>
                {c.estado === 'activa' && <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-bold border border-emerald-100 uppercase tracking-wider">Activa</span>}
                {c.estado === 'mantenimiento' && <span className="px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-[10px] font-bold border border-orange-100 uppercase tracking-wider">Mantenimiento</span>}
                {c.estado === 'deshabilitada' && <span className="px-2 py-1 bg-error-container text-on-error-container rounded-full text-[10px] font-bold uppercase tracking-wider">Inactiva</span>}
              </div>
              <p className="text-on-surface-variant text-sm mb-4 flex-1">{c.descripcion || "Sin descripción"}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-outline-variant">
                <span className="text-sm font-bold bg-surface-container-high px-3 py-1 rounded-lg text-on-surface-variant">{c.tipo}</span>
                <span className="font-display font-bold text-lg text-brand-emerald">${c.precioHora}<span className="text-sm text-on-surface-variant font-normal">/hr</span></span>
              </div>
            </div>
          </div>
        ))}
        {canchas.length === 0 && (
          <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-outline-variant text-on-surface-variant">
            No hay canchas registradas.
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h3 className="font-headline-md font-bold mb-4">{editingId ? 'Editar Cancha' : 'Nueva Cancha'}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Nombre</label>
                <input required type="text" className="w-full border rounded p-2" value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Tipo de Cancha</label>
                  <select className="w-full border rounded p-2" value={formData.tipo} onChange={e => setFormData({...formData, tipo: e.target.value})}>
                    <option value="Fútbol 7">Fútbol 7</option>
                    <option value="Fútbol 11">Fútbol 11</option>
                    <option value="Fútbol Sala">Fútbol Sala</option>
                    <option value="Baloncesto">Baloncesto</option>
                    <option value="Ecuaboli">Ecuaboli</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Precio por Hora ($)</label>
                  <input required type="number" step="0.01" min="0" className="w-full border rounded p-2" value={formData.precioHora} onChange={e => setFormData({...formData, precioHora: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Estado</label>
                <select className="w-full border rounded p-2 bg-white" value={formData.estado} onChange={e => setFormData({...formData, estado: e.target.value})}>
                  <option value="activa">Activa</option>
                  <option value="mantenimiento">Mantenimiento</option>
                  <option value="deshabilitada">Deshabilitada</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Descripción</label>
                <textarea className="w-full border rounded p-2" rows="3" value={formData.descripcion} onChange={e => setFormData({...formData, descripcion: e.target.value})}></textarea>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={closeModal} className="px-4 py-2 border rounded font-bold hover:bg-surface-container transition-colors">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-brand-emerald text-white font-bold rounded hover:brightness-95 transition-colors">{editingId ? 'Guardar Cambios' : 'Guardar Cancha'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canchas;
