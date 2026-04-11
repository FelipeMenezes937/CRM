import { findAll, findById, save, update, remove } from "../repositories/userRepository.js";

export const getAllUsersService = async () => {
  return await findAll();
};

export const getUserByIdService = async (id) => {
  return await findById(id);
};

export const createUserService = async (clientData) => {
  if (clientData.email && clientData.email.length < 3) {
    throw new Error("Email muito curto");
  }
  return await save(clientData);
};

export const updateUserService = async (id, clientData) => {
  return await update(id, clientData);
};

export const deleteUserService = async (id) => {
  return await remove(id);
};