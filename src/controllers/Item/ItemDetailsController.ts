import { Request, Response } from "express";
import { ItemDetailsService } from "../../services/Item/ItemDetailsService";

class ItemDetailsController{

    async handle(req: Request, res: Response){

        const { idItem } = req.body

        const itemDetailsService = new ItemDetailsService()

        const item = await itemDetailsService.execute(idItem)

        return res.json(item)

    }

}

export { ItemDetailsController }