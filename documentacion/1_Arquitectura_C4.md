# Arquitectura del Sistema (Modelo C4)

## Contexto del Sistema
El "Sistema de Gestión de Canchas (CourtManager)" es una aplicación web destinada a que el administrador (Facility Admin) de un complejo deportivo pueda llevar el control total de sus instalaciones.
El administrador gestiona:
- **Canchas**: Su precio por hora, estado y disponibilidad.
- **Clientes**: Información de contacto y registros de jugadores.
- **Reservas**: Agendamiento en horarios definidos, previniendo choques y duplicidades.
- **Pagos**: Cobros en efectivo, transferencia o tarjeta sobre reservas existentes.

## Contenedores (Containers)

El sistema está dividido en dos componentes (contenedores) principales, que se conectan a una única base de datos relacional:

### 1. Frontend Web App (React + Vite)
- **Tecnologías**: React 18, Vite, Tailwind CSS, Axios, React Router, React Hot Toast.
- **Función**: Proporciona la Interfaz de Usuario (UI) para el administrador. Se comunica con el backend mediante una API REST sobre HTTP/JSON.
- **Componentes Visuales**: Dashboard principal con KPIs y menús laterales, pantallas para gestionar los CRUDs y validaciones visuales.

### 2. Backend API Application (Spring Boot)
- **Tecnologías**: Java 24, Spring Boot 3.4.1, Spring Data JPA, Hibernate, JDBC SQL Server.
- **Función**: Contiene toda la lógica y reglas de negocio, procesa las transacciones, gestiona solapamiento de horarios y asegura la integridad de la base de datos.
- **Arquitectura Interna**: Estructurado en capas lógicas:
  - `Controllers`: Exposición de endpoints `/api/...` para consumo REST.
  - `Services`: Lógica de negocio pura (validación de pagos, cancelación de reservas, control de ocupación).
  - `Repositories`: Interfaces de Spring Data para abstracción de las consultas SQL a la base de datos.
  - `Models`: Entidades JPA que se mapean de manera bidireccional con las tablas de SQL Server.

### 3. Base de Datos (SQL Server)
- **Tecnologías**: Microsoft SQL Server.
- **Función**: Persistencia permanente y consistente de todos los datos transaccionales, relacionales y reglas de negocio.
