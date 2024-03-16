import { Request, Response } from "express";
import { UpdateItemService } from "../../services/Item/UpdateItemService";

class UpdateItemController{

    async handle(req:Request, res:Response){
        const { name,
                description,
                price,
                imageURL,
                avaliable,
                vegan,
                idItem } = req.body
        
        const updateItemService = new UpdateItemService()

        const item = updateItemService.execute({
            name,
            description,
            price,
            imageURL,
            avaliable,
            vegan,
            idItem
        })

        return res.json(item)
    }

}

export { UpdateItemController }