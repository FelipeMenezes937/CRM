import {
  getAllUsersService,
  getUserByIdService,
  createUserService,
  updateUserService,
  deleteUserService,
} from "../services/userService.js";

export const getAllUsers = async (req, res) => {
  const users = await getAllUsersService();
  res.json(users);
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await getUserByIdService(id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

export const createUser = async (req, res) => {
  const newUser = await createUserService(req.body);
  res.status(201).json(newUser);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await updateUserService(id, req.body);
  res.json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  await deleteUserService(id);
  res.json({ message: "User deleted" });
};