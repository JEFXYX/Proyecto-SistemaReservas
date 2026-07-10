# Documentación del Frontend (React)

## Entorno y Herramientas
- **Carpeta Base**: `frontend-canchas`
- **Framework**: React.js (v18)
- **Bundler**: Vite
- **Estilos**: Tailwind CSS
- **Routing**: React Router DOM
- **Notificaciones**: React Hot Toast

## Estructura de Páginas (`/src/pages`)
La aplicación cuenta con las siguientes vistas principales protegidas por una pantalla de login:

- **Dashboard.jsx**: Panel visual que se conecta al `/api/reportes/dashboard`. Muestra métricas financieras, de ocupación y gráficas informativas.
- **Clientes.jsx**: Tabla y formulario (Modal) para el registro de nuevos usuarios en el sistema.
- **Canchas.jsx**: Tarjetas visuales de las canchas. Permite crear y **editar** canchas (Ej. Cambiar tipos como Ecuaboli, Fútbol Sala, etc.). Muestra de manera visual el estado (Activa, Inactiva, Mantenimiento).
- **Reservas.jsx**: Interfaz principal del agendamiento. Oculta las canchas inactivas, permite registrar nuevos eventos y posee el botón de **Cancelar** que despacha el PATCH correspondiente al servidor.
- **Pagos.jsx**: Módulo transaccional que enlaza reservas con dinero real. Sólo lista las reservas confirmadas/pendientes que no hayan sido pagadas o canceladas previamente.

## Decisiones de Diseño y UI/UX
- **Sistema de Alertas (Toasts)**: Se reemplazó el obsoleto sistema de alertas nativo del navegador por notificaciones elegantes y no intrusivas en la esquina superior derecha que renderizan de manera dinámica los mensajes de error arrojados por las capas de seguridad del Backend.
- **Tipografía**: Inter (Estilo limpio e institucional).
- **Iconografía**: Google Material Symbols Outlined.
