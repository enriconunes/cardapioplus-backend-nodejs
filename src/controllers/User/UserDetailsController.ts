import { Request, Response } from "express";
import { UserDetailsService } from "../../services/User/UserDetailsService";

class UserDetailsController{
    async handle(req: Request, res: Response){

        // idUser passou a ser um atributo da requisicao que é injetado ao passar pelo middleware isAuthenticated
        // todas as rotas que passarem por esse middleware tem acesso à essa variavel
        const idUser = req.idUser

        const userDetailsService = new UserDetailsService()

        const user = await userDetailsService.execute(idUser)

        return res.json(user)
    }
}

export { UserDetailsController }