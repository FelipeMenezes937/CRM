// Lidar com regras de negócio e chamar a camada de persistencia
import { findAll, findById, save } from "../repositories/userRepository.js";

// Serviço para obter todos os usuários
export const getAllUsersService = async () => {
  return await findAll();
};

// Serviço para obter um usuário pelo ID
export const getUserByIdService = async (id) => {
  return await findById(id);
};

// Serviço para criar um novo usuário
export const createUserService = async (userData) => {
  if (userData.email.length < 3) {
    throw new Error("Email muito curto");
  }
  return await save(userData);
};
