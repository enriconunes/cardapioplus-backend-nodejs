import express, { Request, Response, NextFunction } from "express";
import "express-async-errors"
import cors from "cors";
import { router } from "./routes";
import { sequelize, User } from "./sequelize/sequelize";

const app = express()
app.use(express.json())
const port = 3000

// liberar acesso para qualquer ip/url conseguir fazer requisicao às rotas
app.use(cors())
// variavel de rota criado em ./routes.ts
app.use(router)

// Sincroniza os modelos com o banco de dados
// sequelize.sync({ force: false })
//   .then(() => {
//     console.log('Modelos sincronizados com sucesso com o banco de dados.');
//   })
//   .catch((err: Error) => {
//     console.error('Erro ao sincronizar modelos com o banco de dados:', err);
//   });

// todas as rotas vao passar por esse middleware
// rota para tratamento de erro
// com isso, o app nao vai quebrar, apenas vai retornar um json com a msg de erro
app.use((err:Error, req:Request, res:Response, next:NextFunction)=>{
    if(err instanceof Error){
        //Se o que passar pela rota for do tipo Error
        return res.status(400).json({
            error: err.message
        })
    }

    //Se nao for do tipo Error e for "Internal server error."
    return res.status(500).json({
        status: "error",
        message: "Internal server error."
    })
})

app.listen(port, ()=> console.log("Servidor rodando na porta ", port))