import e, { Request, Response } from "express";
import { DeleteCategoryService } from "../../services/Category/DeleteCategoryService";

class DeleteCategoryController{

    async handle(req: Request, res: Response){

        const { idCategory } = req.body

        const deleteCategoryService = new DeleteCategoryService()

        const category = await deleteCategoryService.execute(idCategory)

        return res.json(category)

    }

}

export { DeleteCategoryController }