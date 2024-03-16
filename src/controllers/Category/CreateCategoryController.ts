import { Request, Response } from "express";
import { CreateCategoryService } from "../../services/Category/CreateCategoryService";

class CreateCategoryController{

    async handle(req: Request, res: Response){

        const idUser = req.idUser
        const { name } = req.body

        const createCategoryService = new CreateCategoryService()
        
        const category = await createCategoryService.execute({
            idUser,
            name
        })

        return res.json(category)

    }

}

export { CreateCategoryController }