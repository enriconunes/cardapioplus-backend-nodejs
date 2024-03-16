import { Category } from "../../sequelize/sequelize";

interface categoryProps{
    idCategory: number,
    newName: string
}

class UpdateCategoryService{

    async execute({idCategory, newName}: categoryProps){
        const category = await Category.update({
            name: newName,
        },
        {
            where: {
                idCategory: idCategory
            }
        });

        return(category)
    }

}

export { UpdateCategoryService }