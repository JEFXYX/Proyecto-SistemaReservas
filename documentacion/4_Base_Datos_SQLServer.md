# Documentación de la Base de Datos

## Motor de Base de Datos
- **Tipo**: Relacional
- **Motor**: SQL Server
- **Autenticación**: SQL Server Authentication (usuario / contraseña)
- **Base de Datos**: `reserva_canchas`

## Esquema Creado

```sql
-- 1. Tabla de Clientes
CREATE TABLE Clientes (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Email VARCHAR(150) UNIQUE NOT NULL,
    Telefono VARCHAR(20),
    FechaRegistro DATETIME DEFAULT GETDATE() NOT NULL,
    Activo BIT DEFAULT 1 NOT NULL
);

-- 2. Tabla de Canchas
CREATE TABLE Canchas (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Tipo VARCHAR(50) NOT NULL, 
    PrecioHora DECIMAL(10, 2) NOT NULL CHECK (PrecioHora >= 0),
    Estado VARCHAR(20) DEFAULT 'activa' NOT NULL 
        CHECK (Estado IN ('activa', 'mantenimiento', 'deshabilitada')),
    Descripcion TEXT
);

-- 3. Tabla de Reservas
CREATE TABLE Reservas (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ClienteId INT NOT NULL,
    CanchaId INT NOT NULL,
    FechaReserva DATE NOT NULL,
    HoraInicio TIME NOT NULL,
    HoraFin TIME NOT NULL,
    Estado VARCHAR(20) DEFAULT 'pendiente' NOT NULL 
        CHECK (Estado IN ('pendiente', 'confirmada', 'cancelada')),
    Total DECIMAL(10, 2) NOT NULL CHECK (Total >= 0),
    FechaCreacion DATETIME DEFAULT GETDATE() NOT NULL,
    FOREIGN KEY (ClienteId) REFERENCES Clientes(Id),
    FOREIGN KEY (CanchaId) REFERENCES Canchas(Id)
);

-- 4. Tabla de Pagos
CREATE TABLE Pagos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    ReservaId INT UNIQUE NOT NULL, 
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto >= 0),
    FechaPago DATETIME DEFAULT GETDATE() NOT NULL,
    Metodo VARCHAR(20) NOT NULL 
        CHECK (Metodo IN ('Efectivo', 'Tarjeta de Crédito', 'Transferencia')),
    Estado VARCHAR(20) DEFAULT 'completado' NOT NULL,
    FOREIGN KEY (ReservaId) REFERENCES Reservas(Id)
);
```

## Relaciones

1. **Clientes (1) -> (N) Reservas**: Un cliente puede tener múltiples reservas.
2. **Canchas (1) -> (N) Reservas**: Una cancha puede tener múltiples reservas.
3. **Reservas (1) -> (1) Pagos**: Una reserva sólo puede tener un único pago asociado.

## Reglas de Negocio en SQL
- Validaciones en tipos de estados mediante cláusulas `CHECK`.
- Integridad referencial con `FOREIGN KEY`.
- El esquema es estricto en el mapeo entre Java y SQL Server, especialmente con el tratamiento de horas (`TIME` vs `DATETIME`) para evitar choques de reservas.
