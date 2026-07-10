# Documentación del Backend (Spring Boot)

## Estructura del Proyecto
- **Carpeta Base**: `Sistema_Cancha\src\main\java\com\api\Sistema_Cancha`
- **Puerto de Ejecución**: `8080`
- **Configuración Principal**: `application.properties`

## Capas de Aplicación

### Models (`/models`)
Contiene las entidades que representan las tablas de la base de datos usando decoradores de `jakarta.persistence.*`.
- `Cliente.java`
- `Cancha.java`
- `Reserva.java`
- `Pago.java`

### Repositories (`/repositories`)
Interfaces que heredan de `JpaRepository` para proveer métodos de acceso a la base de datos sin escribir SQL manual.
- **Ejemplo**: `ReservaRepository` incluye la consulta nativa mediante `@Query` para detectar superposición de horarios.

### Services (`/services`)
Reglas de negocio.
- `ReservaService`: Evita superposiciones, controla estados, y gestiona la cancelación lógica (cambio a "cancelada").
- `PagoService`: Evita pagar reservas canceladas o reservas inexistentes, inyecta la hora del pago automáticamente.
- `ReporteService`: Calcula el Dashboard con estadísticas reales como Ingresos Totales, Ocupación y Cantidad de Reservas Activas.

### Controllers (`/controllers`)
Expone la API REST que consume el frontend. Se definieron las anotaciones `@CrossOrigin` para permitir solicitudes de `localhost:5173`.
- Rutas:
  - `GET /api/clientes`
  - `GET /api/canchas`
  - `GET /api/reservas`
  - `PATCH /api/reservas/{id}/cancelar`
  - `POST /api/pagos`
  - `GET /api/reportes/dashboard`

## Configuración Crítica (application.properties)
El archivo contiene la conexión JDBC a SQL Server, donde fue crítico configurar `sendTimeAsDatetime=false` para evitar un conflicto de validación (Issue HHH000247) entre los tipos `java.time.LocalTime` y el tipo `TIME` de SQL Server al hacer consultas con el operador `<` o `>`.
