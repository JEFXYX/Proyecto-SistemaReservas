import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [reportes, setReportes] = useState({
    totalReservas: 0,
    totalIngresos: 0,
    canchasMasUtilizadas: {}
  });

  useEffect(() => {
    // Fetch data from backend API
    axios.get('http://localhost:8080/api/reportes')
      .then(response => {
        setReportes(response.data);
      })
      .catch(error => console.error("Error fetching reportes", error));
  }, []);

  const handleDescargarReporte = () => {
    window.open('http://localhost:8080/api/reportes/descargar', '_blank');
  };

  return (
    <>
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="font-display text-display text-on-surface mb-1">Panel de Estadísticas</h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">Resumen de rendimiento de la instalación</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-outline-variant rounded-lg text-label-md text-on-surface hover:bg-surface-container-low transition-colors">
            Últimos 30 días
          </button>
          <button onClick={handleDescargarReporte} className="px-4 py-2 bg-brand-emerald text-white rounded-lg text-label-md font-bold hover:brightness-95 transition-colors">
            Descargar Reporte
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter mb-gutter">
        <div className="bg-white p-gutter rounded-[24px] border border-outline-variant custom-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">event_available</span>
          </div>
          <p className="text-on-surface-variant font-label-md text-label-md mb-2">Total de Reservas</p>
          <h3 className="font-display text-display text-on-surface">{reportes.totalReservas}</h3>
        </div>

        <div className="bg-white p-gutter rounded-[24px] border border-outline-variant custom-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">payments</span>
          </div>
          <p className="text-on-surface-variant font-label-md text-label-md mb-2">Total de Ingresos</p>
          <h3 className="font-display text-display text-on-surface">${reportes.totalIngresos}</h3>
        </div>

        <div className="bg-white p-gutter rounded-[24px] border border-outline-variant custom-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <span className="material-symbols-outlined text-6xl">leaderboard</span>
          </div>
          <p className="text-on-surface-variant font-label-md text-label-md mb-2">Ocupación Actual</p>
          <h3 className="font-display text-display text-on-surface">{reportes.ocupacionActual || 0}%</h3>
          <div className="mt-4 w-full bg-surface-container-highest h-2 rounded-full overflow-hidden">
            <div className="brand-green-bg h-full rounded-full transition-all duration-500 ease-in-out" style={{ width: `${reportes.ocupacionActual || 0}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <div className="lg:col-span-4 bg-white p-gutter rounded-[24px] border border-outline-variant custom-shadow">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-headline-md text-headline-md text-on-surface">Top Canchas</h4>
            <span className="material-symbols-outlined text-on-surface-variant">more_vert</span>
          </div>
          <div className="space-y-6">
            {Object.keys(reportes.canchasMasUtilizadas).length === 0 ? (
                <p className="text-on-surface-variant text-sm">Sin datos aún.</p>
            ) : (
                Object.entries(reportes.canchasMasUtilizadas).map(([nombre, count], index) => (
                <div key={index} className="flex items-center gap-4 group cursor-pointer">
                    <div className="flex-1">
                    <p className="font-label-md text-label-md text-on-surface group-hover:text-brand-emerald transition-colors">{nombre}</p>
                    <p className="text-sm text-on-surface-variant">{count} Reservas</p>
                    </div>
                </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
