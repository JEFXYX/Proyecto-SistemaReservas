import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Pagos = () => {
  const [pagos, setPagos] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    reservaId: '',
    monto: '',
    metodoPago: 'Efectivo',
    estado: 'completado'
  });

  const fetchData = () => {
    axios.get('http://localhost:8080/api/pagos').then(res => setPagos(res.data)).catch(err => console.error(err));
    axios.get('http://localhost:8080/api/reservas').then(res => setReservas(res.data.filter(r => r.estado !== 'cancelada'))).catch(err => console.error(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      reserva: { id: formData.reservaId },
      monto: formData.monto,
      metodo: formData.metodoPago,
      estado: formData.estado
    };

    axios.post('http://localhost:8080/api/pagos', payload)
      .then(() => {
        fetchData();
        setShowModal(false);
        setFormData({ reservaId: '', monto: '', metodo: 'Efectivo', estado: 'completado' });
        toast.success('Pago registrado exitosamente');
      })
      .catch(err => {
        console.error("Error creating pago", err);
        const errorMsg = err.response?.data || 'Error al registrar el pago.';
        toast.error(errorMsg);
      });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="font-display text-display text-on-surface mb-1">Módulo de Pagos</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Facturación y control de ingresos</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-brand-emerald text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2"
        >
          <span className="material-symbols-outlined">payments</span> Registrar Pago
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-outline-variant custom-shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-low border-b border-outline-variant">
            <tr>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Reserva / Cliente</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Monto</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Método</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Fecha de Pago</th>
              <th className="p-4 font-label-md text-on-surface-variant uppercase">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {pagos.map(p => (
              <tr key={p.id} className="hover:bg-surface-container-lowest">
                <td className="p-4">
                  <div className="font-bold">Reserva #{p.reserva?.id}</div>
                  <div className="text-sm text-on-surface-variant">{p.reserva?.cliente?.nombre} {p.reserva?.cliente?.apellido}</div>
                </td>
                <td className="p-4 font-bold text-brand-emerald">${p.monto}</td>
                <td className="p-4">{p.metodoPago}</td>
                <td className="p-4">{p.fechaPago?.split('T')[0]}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 uppercase">{p.estado}</span>
                </td>
              </tr>
            ))}
            {pagos.length === 0 && (
              <tr>
                <td colSpan="5" className="p-8 text-center text-on-surface-variant">No hay pagos registrados.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md">
            <h3 className="font-headline-md font-bold mb-4">Registrar Nuevo Pago</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Reserva a Pagar</label>
                <select required className="w-full border rounded p-2" value={formData.reservaId} onChange={e => {
                  setFormData({...formData, reservaId: e.target.value});
                  const reservaSelect = reservas.find(r => r.id === parseInt(e.target.value));
                  if(reservaSelect && reservaSelect.cancha) {
                    setFormData(prev => ({...prev, monto: reservaSelect.cancha.precioHora}));
                  }
                }}>
                  <option value="">Seleccione una reserva...</option>
                  {reservas.map(r => (
                    <option key={r.id} value={r.id}>
                      #{r.id} - {r.cliente?.nombre} ({r.fechaReserva})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Monto ($)</label>
                <input required type="number" step="0.01" min="0" className="w-full border rounded p-2" value={formData.monto} onChange={e => setFormData({...formData, monto: e.target.value})} />
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Método de Pago</label>
                <select className="w-full border rounded p-2" value={formData.metodoPago} onChange={e => setFormData({...formData, metodoPago: e.target.value})}>
                  <option value="Efectivo">Efectivo</option>
                  <option value="Transferencia">Transferencia</option>
                  <option value="Tarjeta de Crédito">Tarjeta de Crédito</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 border rounded">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-brand-emerald text-white font-bold rounded">Guardar Pago</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pagos;
