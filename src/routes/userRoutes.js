// Mapear rotas
import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers); // Rota para obter todos os usuários
router.get("/:id", getUserById); // Rota para obter um usuário por ID
router.post("/", createUser); // Rota para criar um novo usuário



export default router;
