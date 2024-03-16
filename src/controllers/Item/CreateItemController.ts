import { Request, Response } from "express";
import { CreateItemService } from "../../services/Item/CreateItemService";

class CreateItemController{

    async handle(req: Request, res: Response){

        const { name, description, price, imageURL, avaliable, vegan, idCategory} = req.body

        const createItemService = new CreateItemService()
        
        const item = await createItemService.execute({
            name,
            description,
            price,
            imageURL,
            avaliable,
            vegan,
            idCategory
        })

        return res.json(item)

    }

}

export { CreateItemController }