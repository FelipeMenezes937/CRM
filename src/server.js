import express from "express";
import pkg from 'pg';
const { Pool } = pkg;
import userRoutes from "./routes/userRoutes.js";

const app = express();
import * as homeController from './controllers/homeController.js'

const pool = new Pool({
  user: 'crm',
  host: 'localhost',
  database: 'crm_db',
  password: 'crm123',
  port: 5432,
});

async function initDB() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clients (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100),
      phone VARCHAR(20),
      company VARCHAR(100),
      status VARCHAR(20) DEFAULT 'lead',
      value DECIMAL(10,2) DEFAULT 0,
      notes TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      client_id INTEGER REFERENCES clients(id),
      title VARCHAR(200) NOT NULL,
      description TEXT,
      status VARCHAR(20) DEFAULT 'pending',
      due_date DATE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  console.log('Database initialized - PostgreSQL connected!');
}

app.use(express.json());

app.use("/", homeController.paginainicial)
app.use("/clients", userRoutes);

// Tasks endpoints
app.get('/api/tasks', async (req, res) => {
  const result = await pool.query(`
    SELECT t.*, c.name as client_name 
    FROM tasks t 
    LEFT JOIN clients c ON t.client_id = c.id 
    ORDER BY t.created_at DESC
  `);
  res.json(result.rows);
});

app.post('/api/tasks', async (req, res) => {
  const { client_id, title, description, status, due_date } = req.body;
  const result = await pool.query(
    'INSERT INTO tasks (client_id, title, description, status, due_date) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [client_id, title, description, status || 'pending', due_date]
  );
  res.json(result.rows[0]);
});

app.put('/api/tasks/:id', async (req, res) => {
  const { title, description, status, due_date } = req.body;
  await pool.query(
    'UPDATE tasks SET title = $1, description = $2, status = $3, due_date = $4 WHERE id = $5',
    [title, description, status, due_date, req.params.id]
  );
  res.json({ success: true });
});

app.delete('/api/tasks/:id', async (req, res) => {
  await pool.query('DELETE FROM tasks WHERE id = $1', [req.params.id]);
  res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000')
})

export { pool };
initDB();