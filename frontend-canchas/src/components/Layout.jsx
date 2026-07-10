import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="bg-surface text-on-surface min-h-screen">
      {/* Sidebar */}
      <aside className="h-screen w-64 fixed left-0 top-0 bg-surface border-r border-outline-variant flex flex-col py-base px-gutter z-50">
        <div className="mb-10 px-2">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">CourtManager</h1>
          <p className="font-body-md text-body-md text-on-surface-variant opacity-70">reservas de canchas</p>
        </div>
        <nav className="flex-1 space-y-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors active:scale-95 transition-transform ${
                isActive
                  ? 'text-primary border-r-2 border-primary bg-surface-container'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-body-md text-body-md">Dashboard</span>
          </NavLink>
          <NavLink
            to="/clientes"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors active:scale-95 transition-transform ${
                isActive
                  ? 'text-primary border-r-2 border-primary bg-surface-container'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <span className="material-symbols-outlined">group</span>
            <span className="font-body-md text-body-md">Clientes</span>
          </NavLink>
          <NavLink
            to="/canchas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors active:scale-95 transition-transform ${
                isActive
                  ? 'text-primary border-r-2 border-primary bg-surface-container'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <span className="material-symbols-outlined">sports_tennis</span>
            <span className="font-body-md text-body-md">Canchas</span>
          </NavLink>
          <NavLink
            to="/reservas"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors active:scale-95 transition-transform ${
                isActive
                  ? 'text-primary border-r-2 border-primary bg-surface-container'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <span className="material-symbols-outlined">event_available</span>
            <span className="font-body-md text-body-md">Reservas</span>
          </NavLink>
          <NavLink
            to="/pagos"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-colors active:scale-95 transition-transform ${
                isActive
                  ? 'text-primary border-r-2 border-primary bg-surface-container'
                  : 'text-on-surface-variant hover:bg-surface-container'
              }`
            }
          >
            <span className="material-symbols-outlined">payments</span>
            <span className="font-body-md text-body-md">Pagos</span>
          </NavLink>
        </nav>
        <div className="mt-auto pt-4 border-t border-outline-variant">
          <button className="w-full bg-brand-emerald text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 hover:brightness-90 transition-all">
            <span className="material-symbols-outlined">add_circle</span>
            New Reservation
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex flex-col min-h-screen">
        {/* Top Navigation */}
        <header className="h-16 px-margin-desktop sticky top-0 bg-surface border-b border-outline-variant flex justify-between items-center z-40 shadow-sm">
          <div className="flex items-center bg-surface-container rounded-full px-4 py-1.5 w-96 border border-outline-variant">
            <span className="material-symbols-outlined text-on-surface-variant text-body-md">search</span>
            <input className="bg-transparent border-none focus:outline-none focus:ring-0 text-body-md w-full ml-2" placeholder="Buscar reservas, clientes..." type="text" />
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors opacity-80 active:opacity-80">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <button className="p-2 text-on-surface-variant hover:text-primary transition-colors opacity-80 active:opacity-80">
                <span className="material-symbols-outlined">help_outline</span>
              </button>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-outline-variant">
              <div className="text-right">
                <p className="font-label-md text-label-md text-on-surface">Admin User</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wider">Superadmin</p>
              </div>
              <img className="w-10 h-10 rounded-full border border-outline-variant object-cover" alt="User portrait" src="https://lh3.googleusercontent.com/aida-public/AB6AXuChRzDDdTWaPAMm3diEwhoWH7UuV01sEXwWMNEbmof4w70Cm9M4Rtf3Db9siW0g25WxoNWHftmI9pQhsuu9ltyN4NwQ8VbvNu9269ewX_pcvZiPmJSzyFttg7WaznwZjDl8HJjJGjBUS8qB_mehMNLbNtFeP6w5WV3wCIEk3yAOTwCiJmSbHI_AslQzXljnUkxQPonczkKBA0xtPcMQJjuzLvikgRSpjbORGgamtzg2Z9dM_1Fr8F0t6dcbmGAPuUG9Z5Tpxtql3W8g" />
            </div>
          </div>
        </header>

        {/* Dynamic Canvas */}
        <main className="flex-1 p-margin-desktop max-w-container-max mx-auto w-full">
          <Outlet />

          {/* Footer Stats Hint */}
          <footer className="mt-12 flex justify-between items-center text-on-surface-variant pb-8">
            <div className="text-sm">
              © 2024 CourtManager Systems. All rights reserved.
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full brand-green-bg"></span>
                <span className="text-xs">Sistema Online</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-primary opacity-50"></span>
                <span className="text-xs">v2.4.0-stable</span>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;
