# CRM System

Customer Relationship Management system with fullstack architecture.

## About

Web application for managing clients and tasks. Features include full CRUD operations, dashboard with statistics, and PostgreSQL database.

## Features

- Client management (CRUD)
- Task management linked to clients
- Dashboard with statistics
- Data persistence with PostgreSQL
- REST API backend
- React frontend with Vite

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

1. Clone the repository:
```bash
git clone https://github.com/FelipeMenezes937/CRM.git
cd CRM
```

2. Install dependencies:
```bash
npm install
cd front && npm install
```

3. Start PostgreSQL:
```bash
docker-compose up -d
```

## Running

```bash
# Run both backend and frontend
npm run dev:all
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## API Endpoints

### Clients

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /clients | List all clients |
| GET | /clients/:id | Get client by ID |
| POST | /clients | Create new client |
| PUT | /clients/:id | Update client |
| DELETE | /clients/:id | Delete client |

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | List all tasks |
| POST | /api/tasks | Create new task |
| PUT | /api/tasks/:id | Update task |
| DELETE | /api/tasks/:id | Delete task |

## Project Structure

```
CRM/
├── src/
│   ├── server.js           # Server entry point
│   ├── models/             # Database models
│   ├── repositories/       # Data access layer
│   ├── controllers/        # Request handlers
│   ├── services/          # Business logic
│   └── routes/            # API routes
├── front/                 # React frontend
│   ├── src/
│   │   ├── App.jsx        # Main component
│   │   ├── App.css        # Styles
│   │   └── main.jsx       # Entry point
│   └── package.json
├── docker-compose.yml     # PostgreSQL container
└── package.json
```

## Database Schema

```sql
CREATE TABLE clients (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  company VARCHAR(100),
  status VARCHAR(20) DEFAULT 'lead',
  value DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  client_id INTEGER REFERENCES clients(id),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  due_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Client Status

- lead
- contacted
- proposal
- customer

## License

MIT