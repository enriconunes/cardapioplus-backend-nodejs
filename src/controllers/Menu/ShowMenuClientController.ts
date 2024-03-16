import { Request, Response } from "express";
import { ShowMenuClientService } from "../../services/Menu/ShowMenuClientService";

class ShowMenuClientController{

    async handle(req: Request, res: Response){

        const idMenu = req.query.id as string

        const showMenuClientService = new ShowMenuClientService()

        const menu = await showMenuClientService.execute(idMenu)

        return res.json(menu)
    }

}

export { ShowMenuClientController }