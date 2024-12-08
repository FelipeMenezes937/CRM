// Lidar com requisição e resposta HTTP
import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
} from "../services/userService.js";

// Controlador para obter todos os usuários
export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.json(users);
};

// Controlador para obter um usuário pelo ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserByIdService(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

// Controlador para criar um novo usuário
export const createUser = async (req, res) => {
  const newUser = await createUserService(req.body);
  res.status(201).json(newUser);
};
