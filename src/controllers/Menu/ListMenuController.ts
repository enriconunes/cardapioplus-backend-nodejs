import { Request, Response } from "express";
import { ListMenuService } from "../../services/Menu/ListMenuService";

class ListMenuController{

    async handle(req: Request, res: Response){

        const idUser = req.idUser

        const listMenuService = new ListMenuService()

        const menu = await listMenuService.execute(idUser)

        return res.json(menu)
        
    }

}

export { ListMenuController }