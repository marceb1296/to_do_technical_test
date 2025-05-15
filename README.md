# To-Do Technical Test

Spanish version: [To-Do Technical Test Spanish](./README.es.md)

This repository contains a full-stack to-do application developed as part of a technical assessment. The project consists of a **Django backend** containerized with Docker, and a **frontend built with Vite**. The backend must be run using Docker to ensure consistency and streamline the setup process.

## 📦 Requirements

-   [Docker & Docker Compose](https://docs.docker.com/engine/install/)
-   [pnpm](https://pnpm.io/) (optional, but recommended)
-   Alternatively, [Node.js and npm](https://nodejs.org/)

> **Note:** Docker is required to run the backend. This eliminates manual setup and guarantees a consistent development environment.

## 🗂 Project Structure

```
to_do_technical_test/
├── backend/                # Django API (Dockerized)
├── frontend/                # Vite-based frontend
├── docker-compose.dev.yaml  # Docker Compose configuration for development
```

## ⚙️ Getting Started

### Backend (Django via Docker)

1. Clone the repository:

    > git clone [https://github.com/marceb1296/to_do_technical_test.git](https://github.com/marceb1296/to_do_technical_test.git)

    > cd to_do_technical_test

2. Navigate to the backend directory:

    > cd backend

3. Launch the backend using Docker Compose:
    > docker compose -f docker-compose.dev.yaml up

The backend service will be up and running, with all dependencies handled automatically by Docker over port 8000.

### Frontend (Vite)

1. Navigate to the frontend directory:

    - If you're in the `backend` folder:
        > cd ../frontend
    - Otherwise:
        > cd frontend

2. Install dependencies using your preferred package manager:

    > pnpm install
    > or
    > npm install

3. Start the development server:
   pnpm dev
   or
   npm run dev

The application should automatically open in your default browser. You can now interact with the to-do interface.

## 📝 Notes

-   This setup is optimized for local development.
-   Docker ensures all backend dependencies are encapsulated and reproducible.
-   While `pnpm` is recommended for speed and efficiency, `npm` is fully supported.

## 👤 Author

**Marcelino Huerta**
[Portfolio](https://mhcode.dev)

> [!WARNING]  
> This project is automated solely for development purposes, using the server and client as separate services; it is not configured to run as a Django-served SPA.
