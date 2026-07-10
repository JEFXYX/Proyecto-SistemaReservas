# CourtManager (Sistema de Gestión de Canchas)

Bienvenido a la documentación oficial del proyecto CourtManager, desarrollado como práctica de la materia Arquitectura de Software bajo el Modelo C4.

Este proyecto tiene como objetivo modelar, diseñar e implementar un sistema de software robusto, mantenible y escalable para la administración integral de un complejo deportivo.

## Estructura de la Documentación

Esta carpeta (`/documentacion`) contiene los siguientes documentos donde se detalla el comportamiento e implementación de las distintas capas del sistema:

1. [**1_Arquitectura_C4.md**](1_Arquitectura_C4.md): Descripción de alto nivel del sistema, los contenedores y el stack tecnológico seleccionado.
2. [**2_Backend_SpringBoot.md**](2_Backend_SpringBoot.md): Explicación del funcionamiento de la API, controladores, repositorios y reglas de negocio protegidas desde el servidor.
3. [**3_Frontend_React.md**](3_Frontend_React.md): Información sobre las interfaces visuales, la experiencia de usuario (UX/UI) y la validación de consumo de API.
4. [**4_Base_Datos_SQLServer.md**](4_Base_Datos_SQLServer.md): Detalles del esquema relacional, scripts de creación y modelado de datos utilizado para el almacenamiento persistente.

## Ejecución del Proyecto

1. Levantar el motor de SQL Server (Verifique que el usuario/contraseña coincidan con el archivo `application.properties` en el backend).
2. Ejecutar el Backend en Spring Boot utilizando Maven o su IDE de preferencia. (Servicio activo en `localhost:8080`).
3. Acceder a la carpeta `frontend-canchas` y ejecutar `npm run dev` para prender el servidor web de React. (Servicio activo en `localhost:5173`).
