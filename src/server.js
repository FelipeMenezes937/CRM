import express from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
import * as homeController from './controllers/homeController.js'


// Middlewares globais
app.use(express.json());



// Rotas
app.use("/",homeController.paginainicial)
app.use("/users", userRoutes);

export default app;


  


app.listen(3000, () => {
    console.log('acessar http://localhost:3000 ')
    console.log('servidor executando na porta 3000 ')

})