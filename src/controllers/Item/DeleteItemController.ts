import { Request, Response } from "express";
import { DeleteItemService } from "../../services/Item/DeleteItemService";

class DeleteItemController{

    async handle(req: Request, res: Response){

        const { idItem } = req.body

        const deleteItemService = new DeleteItemService()

        const item = await deleteItemService.execute(idItem)

        return res.json(item)
    }

}

export { DeleteItemController }