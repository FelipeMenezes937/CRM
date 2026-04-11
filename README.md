# CRM System

Customer Relationship Management system with fullstack architecture.

## About

Web application for managing customer relationships. Features include full CRUD operations (Create, Read, Update, Delete) for client management with PostgreSQL database.

## Features

- Client management (CRUD)
- Data persistence with PostgreSQL
- REST API backend
- React frontend with Vite
- Clean Architecture (Controllers, Services, Repositories)

## Tech Stack

**Backend**
- Node.js
- Express
- PostgreSQL
- Docker

**Frontend**
- React 18
- Vite

## Prerequisites

- Node.js 18+
- Docker

## Installation

1. Install backend dependencies:
```bash
npm install
```

2. Install frontend dependencies:
```bash
cd front && npm install
```

3. Start PostgreSQL:
```bash
docker-compose up -d
```

## Running

```bash
# Run backend
npm run dev

# Run frontend (in another terminal)
cd front && npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /users | List all clients |
| GET | /users/:id | Get client by ID |
| POST | /users | Create new client |
| PUT | /users/:id | Update client |
| DELETE | /users/:id | Delete client |

## Project Structure

```
src/
├── server.js           # Server entry point
├── models/             # Database models
├── repositories/       # Data access layer
├── controllers/        # Request handlers
├── services/          # Business logic
└── routes/            # API routes

front/                 # React frontend
├── src/
│   ├── App.jsx        # Main component
│   ├── App.css        # Styles
│   └── main.jsx       # Entry point
└── package.json

docker-compose.yml     # PostgreSQL container
```

## Database Schema

```sql
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  company VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## License

MIT