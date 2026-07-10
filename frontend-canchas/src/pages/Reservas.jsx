import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [canchas, setCanchas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    clienteId: '',
    canchaId: '',
    fechaReserva: '',
    horaInicio: '',
    horaFin: '',
    estado: 'pendiente'
  });

  const fetchData = () => {
    axios.get('http://localhost:8080/api/reservas').then(res => setReservas(res.data)).catch(err => console.error(err));
    axios.get('http://localhost:8080/api/clientes').then(res => setClientes(res.data)).catch(err => console.error(err));
    axios.get('http://localhost:8080/api/canchas').then(res => setCanchas(res.data)).catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const payload = {
      cliente: { id: formData.clienteId },
      cancha: { id: formData.canchaId },
      fechaReserva: formData.fechaReserva,
      horaInicio: formData.horaInicio + ":00",
      horaFin: formData.horaFin + ":00",
      estado: formData.estado
    };

    axios.post('http://localhost:8080/api/reservas', payload)
      .then(() => {
        fetchData();
        setShowModal(false);
        setFormData({ clienteId: '', canchaId: '', fechaReserva: '', horaInicio: '', horaFin: '' });
        toast.success('Reserva creada exitosamente');
      })
      .catch(err => {
        console.error("Error creating reserva", err);
        const errorMsg = err.response?.data || 'Error al guardar la reserva. Verifique conexión a DB o posibles cruces de horarios.';
        toast.error(errorMsg);
      });
  };

  const handleCancel = (id) => {
    if(window.confirm('¿Seguro que deseas cancelar esta reserva?')) {
      axios.patch(`http://localhost:8080/api/reservas/${id}/cancelar`)
        .then(() => {
          fetchData();
          toast.success('Reserva cancelada exitosamente');
        })
        .catch(err => {
          console.error("Error cancelling reserva", err);
          const errorMsg = err.response?.data || 'Error al cancelar la reserva.';
          toast.error(errorMsg);
        });
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-display text-on-surface mb-1">Gestión de Reservas</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Calendario y asignación de canchas</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-brand-emerald text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <span className="material-symbols-outlined">event</span> Nueva Reserva
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant custom-shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Cliente</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Cancha</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Fecha</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Horario</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Estado</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {reservas.map(r => (
              <tr key={r.id} className="hover:bg-surface-container-lowest">
                <td className="p-4 font-bold">{r.cliente?.nombre} {r.cliente?.apellido}</td>
                <td className="p-4">{r.cancha?.nombre}</td>
                <td className="p-4">{r.fechaReserva}</td>
                <td className="p-4">{r.horaInicio} - {r.horaFin}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider ${r.estado === 'cancelada' ? 'bg-error-container text-on-error-container border-error' : r.estado === 'confirmada' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-orange-50 text-orange-700 border-orange-100'}`}>
                    {r.estado}
                  </span>
                </td>
                <td className="p-4">
                  {r.estado !== 'cancelada' && (
                    <button onClick={() => handleCancel(r.id)} className="text-error font-bold text-sm hover:underline">
                      Cancelar
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {reservas.length === 0 && (
              <tr>
                <td colSpan="6" className="p-8 text-center text-on-surface-variant">No hay reservas.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-lg">
            <h3 className="font-headline-md font-bold mb-4">Nueva Reserva</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Cliente</label>
                  <select required className="w-full border rounded p-2" value={formData.clienteId} onChange={e => setFormData({...formData, clienteId: e.target.value})}>
                    <option value="">Seleccione...</option>
                    {clientes.map(c => <option key={c.id} value={c.id}>{c.nombre} {c.apellido}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Cancha</label>
                  <select required className="w-full border rounded p-2" value={formData.canchaId} onChange={e => setFormData({...formData, canchaId: e.target.value})}>
                    <option value="">Seleccione...</option>
                    {canchas.filter(c => c.estado === 'activa').map(c => <option key={c.id} value={c.id}>{c.nombre} - ${c.precioHora}/hr</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Fecha de la Reserva</label>
                <input required type="date" className="w-full border rounded p-2" value={formData.fechaReserva} onChange={e => setFormData({...formData, fechaReserva: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Hora Inicio</label>
                  <input required type="time" className="w-full border rounded p-2" value={formData.horaInicio} onChange={e => setFormData({...formData, horaInicio: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Hora Fin</label>
                  <input required type="time" className="w-full border rounded p-2" value={formData.horaFin} onChange={e => setFormData({...formData, horaFin: e.target.value})} />
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-brand-emerald text-white font-bold rounded">Confirmar Reserva</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservas;
