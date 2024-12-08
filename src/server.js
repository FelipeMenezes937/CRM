import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middlewares globais
app.use(express.json());

// Rotas
app.use("/users", userRoutes);

export default app;
