import { pool } from "../server.js";

export const findAll = async () => {
  const result = await pool.query('SELECT * FROM clients ORDER BY created_at DESC');
  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
  return result.rows[0];
};

export const save = async (clientData) => {
  const { name, email, phone, company, status, value, notes } = clientData;
  const result = await pool.query(
    'INSERT INTO clients (name, email, phone, company, status, value, notes) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    [name, email, phone, company, status || 'lead', value || 0, notes || '']
  );
  return result.rows[0];
};

export const update = async (id, clientData) => {
  const { name, email, phone, company, status, value, notes } = clientData;
  await pool.query(
    'UPDATE clients SET name = $1, email = $2, phone = $3, company = $4, status = $5, value = $6, notes = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8',
    [name, email, phone, company, status, value, notes, id]
  );
  return { id, ...clientData };
};

export const remove = async (id) => {
  await pool.query('DELETE FROM clients WHERE id = $1', [id]);
  return { success: true };
};