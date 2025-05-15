# To-Do Technical Test

Version en ingles: [To-Do Prueba técnica en español](./README.md)

Este repositorio contiene una aplicación _full-stack_ de tareas desarrollada como parte de una prueba técnica. El proyecto está compuesto por un **backend en Django**, completamente containerizado con Docker, y un **frontend construido con Vite**. El backend debe ejecutarse obligatoriamente con Docker para asegurar consistencia y facilitar la configuración del entorno.

## 📦 Requisitos

-   [Docker y Docker Compose](https://docs.docker.com/engine/install/)
-   [pnpm](https://pnpm.io/) (opcional, pero recomendado)
-   Alternativamente, [Node.js y npm](https://nodejs.org/)

> **Nota:** El uso de Docker es obligatorio para ejecutar el backend. Esto evita configuraciones manuales y garantiza un entorno de desarrollo reproducible.

## 🗂 Estructura del Proyecto

```
to_do_technical_test/
├── backend/                 # API en Django (Dockerizado)
├── frontend/                 # Frontend basado en Vite
├── docker-compose.dev.yaml  # Configuración de Docker Compose para desarrollo
```

## ⚙️ Puesta en Marcha

### Backend (Django con Docker)

1. Clona el repositorio:

    > git clone [https://github.com/marceb1296/to_do_technical_test.git](https://github.com/marceb1296/to_do_technical_test.git)

    > cd to_do_technical_test

2. Entra en la carpeta del backend:

    > cd backend

3. Ejecuta el backend con Docker Compose:
    > docker compose -f docker-compose.dev.yaml up

El servicio del backend estará disponible automáticamente, con todas sus dependencias configuradas a través de Docker en el puerto 8000.

### Frontend (Vite)

1. Entra en la carpeta del frontend:

    - Si estás en la carpeta `backend`:
        > cd ../frontend
    - De lo contrario:
        > cd frontend

2. Instala las dependencias con el gestor de tu preferencia:

    > pnpm install
    > o
    > npm install

3. Inicia el servidor de desarrollo:
    > pnpm dev
    > o
    > npm run dev

La aplicación se abrirá automáticamente en tu navegador por defecto. Desde ahí podrás comenzar a interactuar con la interfaz.

## 📝 Notas

-   Este entorno está optimizado para desarrollo local.
-   Docker garantiza que todas las dependencias del backend estén correctamente encapsuladas y configuradas.
-   Aunque se recomienda `pnpm` por su eficiencia, `npm` también es totalmente compatible.

## 👤 Autor

**Marcelino Huerta**
[Portfolio](https://mhcode.dev)

> [!WARNING]  
> Este proyecto está automatizado únicamente para entornos de desarrollo, utilizando servidor y cliente por separado; no está configurado para funcionar como una SPA servida desde Django.
