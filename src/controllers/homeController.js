import express from 'express'
import { fileURLToPath } from 'url'; // converte url em caminho
import path, { dirname } from 'path';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const paginainicial = app.get('/', (req, res, next) => {
    res.send(req.body)
    next();
})