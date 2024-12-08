// Canal de comunicação com o banco de dados
import users from "../models/userModel.js";

// Função para encontrar todos os usuários
export const findAll = async () => {
  return users;
};

// Função para encontrar um usuário pelo ID
export const findById = async (id) => {
  return users.find((user) => user.id === parseInt(id));
};

// Função para salvar um novo usuário
export const save = async (userData) => {
  const newUser = { id: users.length + 1, ...userData };
  users.push(newUser);
  return newUser;
};
