import { Request, Response } from "express";
import { UpdateCategoryService } from "../../services/Category/UpdateCategoryService";

class UpdateCategoryController{

    async handle(req: Request, res: Response){

        const { idCategory, newName } = req.body

        const updateCategoryService = new UpdateCategoryService()

        const category = await updateCategoryService.execute({
            idCategory,
            newName
        })

        return res.json(category)

    }

}

export { UpdateCategoryController }