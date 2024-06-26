import { Request, Response } from "express";
import { UpdateItemService } from "../../services/Item/UpdateItemService";

class UpdateItemController{

    async handle(req:Request, res:Response){
        const { name,
                description,
                price,
                avaliable,
                vegan,
                idItem } = req.body

        const { file } = req


            const updateItemService = new UpdateItemService()

            const item = await updateItemService.execute({
                name,
                description,
                price,
                avaliable,
                vegan,
                idItem,
                file
            })

            return res.json(item)
        }
    
}

export { UpdateItemController }