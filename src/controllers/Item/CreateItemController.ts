import { Request, Response } from "express";
import { CreateItemService } from "../../services/Item/CreateItemService";

class CreateItemController{

    async handle(req: Request, res: Response){

        const { name, description, price, avaliable, vegan, idCategory} = req.body

        const { file } = req

        if(!file){
            throw new Error("Erro no upload do arquivo.");
        } else{

            const createItemService = new CreateItemService()
        
            const item = await createItemService.execute({
                name,
                description,
                price,
                avaliable,
                vegan,
                idCategory,
                file
            })

            return res.json(item)
        }

    }

}

export { CreateItemController }